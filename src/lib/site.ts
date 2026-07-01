// Central place for the site URL — change this once when you get a custom domain,
// everything else (metadata, sitemap, JSON-LD, canonical URLs) reads from here.
export const SITE_URL = 'https://realestate-srinagar-ber8.vercel.app'
export const SITE_NAME = 'Realestate Srinagar'

 
// --- Added for homepage SEO / JSON-LD (Organization schema) ---
// If you already have SITE_URL / SITE_NAME here, just append the block below
// to your existing lib/site.ts — do not duplicate the exports above.
 
export const BUSINESS_PHONE_PRIMARY = '+91-7889902696'
export const BUSINESS_PHONE_SECONDARY = '+91-7006064638'
export const BUSINESS_EMAIL = 'realestatessrinagar@gmail.com'
 
export const SOCIAL_LINKS = [
  'https://www.facebook.com/realestae.srinagar',
  'https://www.instagram.com/realestate_srinagar',
  'https://www.linkedin.com/company/realestate-srinagar',
  'https://www.youtube.com/@realestatesrinagar',
]
 
// Cities actively served — reused in JSON-LD areaServed and metadata keywords
export const CITIES_SERVED = ['Srinagar', 'Jammu', 'Delhi', 'Dholera', 'Dubai']
 