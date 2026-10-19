/* ============================================================
   RICELINE — store settings
   Edit this file to change address, hours, phone and how orders
   are sent. No coding needed: change the text between quotes.
   ============================================================ */
window.RICELINE_CONFIG = {
  name: "Riceline",
  tagline: "Saigon-spirited rice bowls, ready in minutes.",

  // ---- Location (PLACEHOLDER — replace with your real address) ----
  address: {
    line1: "Huntington Ave",            // e.g. "360 Huntington Ave"
    area: "Near Northeastern & Longwood",
    city: "Boston",
    state: "MA",
    zip: "02115"
  },
  // Text used for the "Get directions" link (Google Maps search)
  mapsQuery: "Huntington Ave, Boston, MA 02115",

  // ---- Contact (PLACEHOLDER — replace with your real number, e.g. "(617) 123-4567") ----
  phone: "(617) xxx-xxxx",
  email: "orders@example.com",

  // ---- Opening hours (24h clock, Boston time) ----
  // One or more [open, close] ranges per day. Use [] for closed.
  timezone: "America/New_York",
  hours: {
    mon: [["10:30", "21:00"]],
    tue: [["10:30", "21:00"]],
    wed: [["10:30", "21:00"]],
    thu: [["10:30", "21:00"]],
    fri: [["10:30", "21:00"]],
    sat: [["11:00", "21:00"]],
    sun: [["11:00", "20:00"]]
  },
  lastOrderMinutesBeforeClose: 15,

  // ---- Money ----
  taxRate: 0.07,                 // Boston: 6.25% MA meals tax + 0.75% local option
  tipOptions: [0, 10, 15, 20],   // percent; 0 = "No tip"

  // ---- Pickup estimate (minutes) ----
  pickupMinutes: { express: 5, standard: 8, perExtraBowl: 1 },

  // ---- How "Place order" works ----
  //  "demo"  = shows a confirmation screen only. NOTHING is sent. (default until you connect ordering)
  //  "link"  = copies the order text, then opens your online-ordering page (Toast, Square, Clover...)
  //  "sms"   = opens the guest's text app with the order addressed to smsNumber
  //  "email" = opens the guest's email app with the order addressed to email above
  orderMode: "demo",
  orderLink: "",                 // e.g. "https://order.toasttab.com/online/riceline"
  smsNumber: "",                 // e.g. "+16171234567"

  // ---- Deals shown on the page ----
  groupOrder: { minBowls: 10, orderBy: "10:30", discount: "10% off" },
  studentDeal: "Show a student or work ID at pickup — every Meal Deal is priced for you.",

  social: { instagram: "", tiktok: "" }
};
