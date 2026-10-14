/* Fitzroy & Co. — site settings
   Fill these in as each service comes online. Empty values fall back gracefully:
   Maven links jump to the email signup, and the booking link opens a pre-filled email. */
window.FITZROY_CONFIG = {
  // Address shown on the site and used for session requests (set up in Google Workspace)
  contactEmail: "brian@fitzroyadvisory.com",

  // Booking page for the 30-minute decision session (Calendly, Cal.com, etc.)
  bookingUrl: "",

  // Maven pages
  mavenLightningUrl: "",   // the free Lightning Lesson page
  mavenCourseUrl: "",      // The Price of Money: the cohort page / waitlist

  // Waitlists for the two courses in development (Maven waitlist, or leave empty to use the email signup)
  valueWaitlistUrl: "",    // Value Before Valuation
  exitWaitlistUrl: "",     // The Last Term Sheet

  // Email signup (Kit, MailerLite, Buttondown...). Paste the form's POST address here.
  emailFormAction: "",
  emailFieldName: "email", // the field name your email service expects

  // Optional: lets one list be tagged by interest. If your email service accepts a hidden
  // field for tags or groups, put its field name here. Each signup form then sends one of:
  // general, price-of-money, value, exit. Leave empty to skip.
  emailInterestField: ""
};
