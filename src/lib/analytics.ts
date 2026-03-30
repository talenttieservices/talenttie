// GA4 event tracking helpers
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}

// Specific tracking events used across the site
export const GA = {
  jobView: (jobTitle: string, industry: string) =>
    trackEvent("view_job", "Jobs", `${jobTitle} - ${industry}`),

  jobApply: (jobTitle: string, industry: string) =>
    trackEvent("apply_job", "Conversions", `${jobTitle} - ${industry}`),

  applySuccess: (jobTitle: string) =>
    trackEvent("application_submitted", "Conversions", jobTitle),

  contactFormSubmit: () =>
    trackEvent("contact_form_submit", "Conversions", "Contact Page"),

  registerStart: (role: string) =>
    trackEvent("register_start", "Auth", role),

  loginSuccess: () =>
    trackEvent("login", "Auth"),

  jobSearch: (query: string) =>
    trackEvent("search", "Jobs", query),

  blogRead: (title: string, category: string) =>
    trackEvent("read_blog", "Blog", `${title} - ${category}`),
}
