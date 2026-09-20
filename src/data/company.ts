/**
 * Company facts, contact routes and service definitions.
 *
 * Every string here is real copy from the export. Nothing is marketing filler,
 * and no response time is promised that operations has not confirmed.
 */

export const COMPANY = {
  name: "Perficient Logistics Limited",
  shortName: "Perficient Logistics",
  tagline: "Chauffeur-driven car hire for events, business and personal movement in Lagos, Abuja and beyond.",
  /** Footer positioning statement. */
  blurb:
    "Defining transportation in Nigeria and beyond. Premium chauffeur, protocol, and logistics services engineered around safety, comfort and reliability.",
  motto: "Ahead · and · ready",
  yearsActive: "About 5 years",
  cities: "Lagos · Abuja",
  concierge: "Open 24 hours",
  office: "Onaolapo Soleye Close, Katampe Extension, Abuja, Nigeria",
  email: "perficientlogisticsltd@gmail.com",
  phones: {
    bookings: ["+234 805 270 2261", "+234 810 663 6311"],
    enquiries: ["+234 807 598 1590"],
  },
} as const;

/** Strips spaces so a displayed number can also be a tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/**
 * International form to the local form Nigerian customers read fastest:
 * "+234 805 270 2261" → "080 5270 2261". The tel: href keeps the +234 form so
 * the number still dials from abroad.
 */
export function localPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^234/, "");
  const local = `0${digits}`;
  return `${local.slice(0, 3)} ${local.slice(3, 7)} ${local.slice(7)}`.trim();
}

/**
 * Social profiles.
 *
 * `href` is intentionally empty until the real handles are supplied — the
 * footer renders the icon either way, but only links it once a URL exists, so
 * nothing ever points at a fabricated or dead profile.
 */
export const SOCIALS = [
  { id: "instagram", label: "Instagram", href: "" },
  { id: "facebook", label: "Facebook", href: "" },
  { id: "x", label: "X", href: "" },
] as const;

export const SERVICES = [
  {
    id: "chauffeur",
    label: "Chauffeur hire",
    /** Value used by the booking form's service field. */
    value: "Full-day chauffeur",
    tab: "Full-day",
    view: "chauffeur",
    copy: "Professional, discreet movement for airport arrivals, executive schedules and important guests.",
  },
  {
    id: "interstate",
    label: "Interstate travel",
    value: "Interstate travel",
    tab: "Interstate",
    view: "journey",
    copy: "Chauffeured travel beyond Lagos and Abuja, planned around the route, vehicle and schedule.",
  },
  {
    id: "events",
    label: "Events & occasions",
    value: "Event or occasion",
    tab: "Event",
    view: "event",
    copy: "Presentation-ready transport for weddings, ceremonies, corporate events and photoshoots.",
  },
  {
    id: "airport",
    label: "Airport transfers",
    value: "Airport transfer",
    tab: "Airport",
    view: "chauffeur",
    copy: "Coordinated pickups and drop-offs in Lagos and Abuja, handled around your itinerary.",
  },
  {
    id: "corporate",
    label: "Corporate & long-term",
    value: "Corporate / long-term",
    tab: "Corporate",
    view: "journey",
    copy: "Ongoing or multi-day vehicle arrangements shaped around the needs of your business.",
  },
] as const;

export type Service = (typeof SERVICES)[number];
export type ServiceValue = Service["value"];

export const SERVICE_VALUES = SERVICES.map((service) => service.value);
export const DEFAULT_SERVICE: ServiceValue = "Full-day chauffeur";

export const COVERAGE = ["Lagos", "Abuja", "Interstate"] as const;
export const CITIES = ["Lagos", "Abuja"] as const;

export const HIRE_WINDOWS = [
  "Confirm with the team",
  "10 hours",
  "12 hours",
  "Night hire",
] as const;

/** Service rate table — each service starts at its least expensive vehicle. */
export const SERVICE_RATES = [
  { service: "Airport Shuttle Transfers", from: 80000 },
  { service: "Full-Day Personal Chauffeur", from: 80000 },
  { service: "Luxury Fleet Car Rentals", from: 80000 },
  { service: "Escort & Protocol Convoy", from: 100000 },
  { service: "Inter-State Travel", from: 100000 },
  { service: "VIP Event & Special Rides", from: 350000 },
] as const;

export const ADD_ONS = [
  {
    label: "Airport pickup or drop-off, depending on model and year",
    price: "From ₦35,000",
  },
  {
    label: "MOPOL or security personnel escort, within the state",
    price: "₦40,000 / officer",
  },
  {
    label: "MOPOL or security personnel escort, interstate",
    price: "₦55,000 / officer",
  },
] as const;

export const HIRE_TERMS = [
  {
    id: "hire-duration",
    title: "Hire duration & extensions",
    items: [
      "A day’s hire runs for **10 or 12 hours**, depending on the vehicle booked.",
      "Movement beyond that window is charged **per hour** at a rate that varies by vehicle.",
      "**Day hire expires at 9:00 pm.** Movement after 9pm is treated as night hire.",
      "Night hire is available; the rate depends on the closing time and vehicle.",
      "**Driver and fuel are included** in every hire.",
    ],
  },
  {
    id: "conditions-of-hire",
    title: "Conditions of hire",
    items: [
      "**No smoking** inside any vehicle.",
      "Please be polite to your driver. Abusive language is not accepted.",
      "**No self-driving.** All vehicles are supplied with a Perficient chauffeur.",
      "Every vehicle is fully insured and documented before dispatch.",
      "Rates are subject to change. The rate confirmed at booking is the rate that applies.",
    ],
  },
] as const;

export const CANCELLATION = [
  {
    percent: "100%",
    copy: "Charged for a no-show or cancellation made less than 24 hours before the booking.",
  },
  {
    percent: "50%",
    copy: "Charged when a cancellation is made at least 24 hours before the booking.",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: "obinna-nweke",
    name: "Obinna Nweke",
    role: "Client",
    quote:
      "Reliable and professional company! They picked me from the airport and the entire experience was smooth from start to finish. The driver arrived early, was courteous, and helped with my luggage without hesitation.",
  },
  {
    id: "maybel-oluchi",
    name: "Maybel Oluchi",
    role: "Client",
    quote:
      "I recently rented from them and had an amazing experience. The booking process was super easy, and the staff were really helpful. The car was in top condition, clean and well-maintained, exactly as described.",
  },
  {
    id: "victor-kalu",
    name: "Victor Kalu",
    role: "Client",
    quote:
      "Excellent service. I enjoyed my ride from the airport and the vehicle was really comfortable.",
  },
] as const;

export const SERVICE_STANDARDS = [
  {
    id: "prepared",
    title: "Prepared before arrival",
    copy: "Vehicles are cleaned, checked, insured and documented before dispatch.",
  },
  {
    id: "chauffeur",
    title: "Professional chauffeur",
    copy: "Every hire includes a Perficient driver who understands punctual, courteous service.",
  },
  {
    id: "pricing",
    title: "Rates you can plan around",
    copy: "Published day rates make budgeting easier, with additions confirmed before booking.",
  },
  {
    id: "concierge",
    title: "Direct human follow-up",
    copy: "A 24-hour concierge team confirms the vehicle, timing and journey requirements.",
  },
] as const;
