const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL
  ? `https://${process.env.RAILWAY_STATIC_URL}`
  : "";
const HEROKU_URL = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : "";
const RENDER_URL = process.env.RENDER_EXTERNAL_URL
  ? `https://${process.env.RENDER_EXTERNAL_URL}`
  : "";
export const WEBAPP_URL =
  process.env.NEXTAUTH_URL ||
  VERCEL_URL ||
  RAILWAY_STATIC_URL ||
  HEROKU_URL ||
  RENDER_URL ||
  "http://localhost:3000";

export const WEBSITE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://paypath.app";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Paypath";
export const SUPPORT_MAIL_ADDRESS =
  process.env.NEXT_PUBLIC_SUPPORT_MAIL_ADDRESS || "support@paypath.app";
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Paypath";
