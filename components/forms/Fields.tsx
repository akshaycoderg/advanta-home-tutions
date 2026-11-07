import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Check, ChevronDown, FileText, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <label htmlFor={id} className="text-[0.82rem] font-semibold text-navy-900">
          {label}
          {required ? (
            <span className="ml-0.5 text-orange-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        {hint ? (
          <span id={`${id}-hint`} className="text-[0.7rem] text-muted">
            {hint}
          </span>
        ) : null}
      </div>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  const ids = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

export function Input({
  invalid,
  error,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  error?: string;
  hint?: string;
}) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy(props.id ?? "", error, hint)}
      className={cn("form-input", className)}
    />
  );
}

export function Select({
  invalid,
  error,
  hint,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
  error?: string;
  hint?: string;
}) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(props.id ?? "", error, hint)}
        className={cn("form-input appearance-none pr-10", className)}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-navy-400"
        aria-hidden="true"
      />
    </div>
  );
}

export function Textarea({
  invalid,
  error,
  hint,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
  error?: string;
  hint?: string;
}) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy(props.id ?? "", error, hint)}
      className={cn("form-input resize-y", className)}
    />
  );
}

export function OptionChips({
  name,
  legend,
  options,
  selected,
  onToggle,
  error,
  hint,
  required,
  columns = "sm:grid-cols-2",
}: {
  name: string;
  legend: string;
  options: readonly string[];
  selected: readonly string[];
  onToggle: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  columns?: string;
}) {
  return (
    <fieldset aria-describedby={describedBy(name, error, hint)}>
      <legend className="text-[0.82rem] font-semibold text-navy-900">
        {legend}
        {required ? (
          <span className="ml-0.5 text-orange-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      {hint ? (
        <p id={`${name}-hint`} className="mt-1 text-[0.7rem] text-muted">
          {hint}
        </p>
      ) : null}
      <div className={cn("mt-2 grid gap-2", columns)}>
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[0.82rem] font-medium transition-colors focus-within:ring-2 focus-within:ring-royal-500/30",
                checked
                  ? "border-royal-400 bg-royal-50 text-navy-900"
                  : "border-line bg-white text-navy-700 hover:border-navy-200 hover:bg-navy-50/60",
              )}
            >
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors",
                  checked ? "border-royal-600 bg-royal-600 text-white" : "border-navy-200 bg-white",
                )}
              >
                {checked ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
              </span>
              {option}
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function CheckboxField({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-[0.8rem] leading-relaxed transition-colors focus-within:ring-2 focus-within:ring-royal-500/30",
          error ? "border-danger/60 bg-danger-soft/40" : "border-line bg-white hover:bg-navy-50/40",
        )}
      >
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded border-navy-300 accent-orange-600"
        />
        <span className="text-muted">{children}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FileField({
  id,
  label,
  hint,
  error,
  files,
  onFiles,
  accept = ".pdf,.jpg,.jpeg,.png",
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  files: File[];
  onFiles: (files: File[]) => void;
  accept?: string;
}) {
  return (
    <div>
      <p className="text-[0.82rem] font-semibold text-navy-900">{label}</p>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[0.7rem] leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      <label
        htmlFor={id}
        className={cn(
          "mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors focus-within:ring-2 focus-within:ring-royal-500/30",
          error
            ? "border-danger/60 bg-danger-soft/30"
            : "border-navy-200 bg-navy-50/40 hover:border-royal-400 hover:bg-royal-50/50",
        )}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-600 shadow-sm">
          <Upload className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <span className="text-[0.82rem] font-semibold text-navy-800">
          Choose documents
        </span>
        <span className="text-[0.7rem] text-muted">
          PDF, JPG or PNG · up to 5 MB each · maximum 3 files
        </span>
        <input
          id={id}
          name={id}
          type="file"
          multiple
          accept={accept}
          onChange={(event) => onFiles(Array.from(event.target.files ?? []))}
          aria-describedby={hint ? `${id}-hint` : undefined}
          aria-invalid={error ? true : undefined}
          className="sr-only"
        />
      </label>

      {files.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5"
            >
              <FileText className="h-4 w-4 shrink-0 text-navy-500" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-navy-900">
                  {file.name}
                </span>
                <span className="block text-[0.68rem] text-muted">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </span>
              <button
                type="button"
                onClick={() => onFiles(files.filter((_, itemIndex) => itemIndex !== index))}
                className="rounded-full p-1.5 text-muted transition-colors hover:bg-danger-soft hover:text-danger"
                aria-label={`Remove ${file.name}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
