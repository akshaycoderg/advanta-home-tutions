/**
 * Service-area landing pages.
 *
 * Add an entry only when there is genuine tutor coverage and enough unique,
 * useful local content to justify the page. Empty by default so the site never
 * publishes thin, auto-generated locality pages.
 *
 * Example (do not publish until it is true):
 * {
 *   slug: "lanka-varanasi",
 *   name: "Lanka, Varanasi",
 *   published: true,
 *   intro: "Home tuition enquiries from families in Lanka ...",
 *   landmarks: ["Near BHU gate", "Lanka crossing"],
 *   coverageNote: "Tutor availability is confirmed case by case.",
 * }
 */
export type ServiceArea = {
  slug: string;
  name: string;
  published: boolean;
  intro: string;
  landmarks?: string[];
  coverageNote?: string;
};

export const serviceAreas: ServiceArea[] = [];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug && area.published);
}

export const publishedAreas = serviceAreas.filter((area) => area.published);
