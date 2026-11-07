-- Advanta Home Tutions — Supabase schema
-- Run this once in the Supabase SQL editor for the production project.
--
-- Design notes:
--   * The website writes from the server using the service-role key only.
--   * Row Level Security is enabled and no public policies are created, so the
--     anon and authenticated API roles cannot read or write these tables.
--   * The storage bucket is private. Documents must never be made public.
--   * Do not put the service-role key in NEXT_PUBLIC_* variables or in the browser.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Parent enquiries
-- ---------------------------------------------------------------------------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  parent_name text not null,
  parent_phone text not null,
  parent_email text,
  student_name text not null,
  student_class text not null,
  board text not null,
  subjects text[] not null default '{}',
  locality text not null,
  address text not null,
  preferred_timing text not null,
  tutor_gender text not null default 'No preference',
  academic_challenges text,
  additional_requirements text,
  consent boolean not null default false,
  consent_at timestamptz,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'matched', 'demo_scheduled', 'placed', 'closed')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enquiries_consent_true check (consent = true),
  constraint enquiries_reference_format check (reference ~ '^AHT-P-[0-9]{6}-[A-Z0-9]{6}$')
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists enquiries_locality_idx on public.enquiries (locality);

alter table public.enquiries enable row level security;
-- No public policies are intentionally created. Service-role access only.

comment on table public.enquiries is
  'Private parent enquiries submitted through the website. Contains address data; service-role access only.';

-- ---------------------------------------------------------------------------
-- Tutor applications
-- ---------------------------------------------------------------------------
create table if not exists public.tutor_applications (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  full_name text not null,
  mobile text not null,
  whatsapp text not null,
  email text not null,
  gender text not null,
  qualification text not null,
  college text not null,
  experience_level text not null,
  experience_details text,
  subjects text[] not null default '{}',
  classes text[] not null default '{}',
  boards text[] not null default '{}',
  areas text not null,
  available_days text[] not null default '{}',
  preferred_timings text not null,
  expected_monthly_fee integer,
  documents jsonb not null default '[]'::jsonb,
  consent boolean not null default false,
  declaration boolean not null default false,
  consent_at timestamptz,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'interview', 'verified', 'rejected', 'placed')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tutor_applications_consent_true check (consent = true),
  constraint tutor_applications_declaration_true check (declaration = true),
  constraint tutor_applications_reference_format check (reference ~ '^AHT-T-[0-9]{6}-[A-Z0-9]{6}$'),
  constraint tutor_applications_expected_fee_positive
    check (expected_monthly_fee is null or expected_monthly_fee > 0)
);

create index if not exists tutor_applications_created_at_idx
  on public.tutor_applications (created_at desc);
create index if not exists tutor_applications_status_idx
  on public.tutor_applications (status);
create index if not exists tutor_applications_subjects_idx
  on public.tutor_applications using gin (subjects);
create index if not exists tutor_applications_classes_idx
  on public.tutor_applications using gin (classes);
create index if not exists tutor_applications_areas_idx
  on public.tutor_applications using gin (to_tsvector('simple', areas));

alter table public.tutor_applications enable row level security;
-- No public policies are intentionally created. Service-role access only.

comment on table public.tutor_applications is
  'Private tutor applications. The documents JSONB contains private storage object paths, not public URLs.';

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at
before update on public.enquiries
for each row execute function public.set_updated_at();

drop trigger if exists tutor_applications_set_updated_at on public.tutor_applications;
create trigger tutor_applications_set_updated_at
before update on public.tutor_applications
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Private storage bucket for verification documents
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tutor-documents',
  'tutor-documents',
  false,
  5242880,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Keep object access private. Supabase storage.objects has RLS enabled.
-- No anon/authenticated SELECT, INSERT, UPDATE or DELETE policies are created.
-- The server's service-role key performs uploads and is never exposed publicly.

-- If you later build a staff dashboard, prefer a server-side admin route that
-- verifies staff authentication and generates short-lived signed URLs. Do not
-- make the bucket public or create broad storage policies for the anon role.

-- ---------------------------------------------------------------------------
-- Verification queries (run manually after setup)
-- ---------------------------------------------------------------------------
-- select tablename, rowsecurity from pg_tables
--   where schemaname = 'public' and tablename in ('enquiries', 'tutor_applications');
-- select id, name, public, file_size_limit, allowed_mime_types
--   from storage.buckets where id = 'tutor-documents';
