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
  mavenCourseUrl: "",      // the cohort course page / waitlist

  // Email signup (Kit, MailerLite, Buttondown...). Paste the form's POST address here.
  emailFormAction: "",
  emailFieldName: "email"  // the field name your email service expects
};
