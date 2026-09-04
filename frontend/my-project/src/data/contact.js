// Official Ideal Pack contact details — single source of truth for the
// Contact page, Footer and the floating WhatsApp button.
const WHATSAPP_NUMBER = '971549910027'
const WHATSAPP_MESSAGE = 'Hello Ideal Pack, I would like to know more about your products.'

export const CONTACT = {
  phoneDisplay: '+971 6 564 2072',
  phoneHref: 'tel:+97165642072',

  whatsappDisplay: '+971 54 991 0027',
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappPrefilledHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,

  // Public-facing business email addresses only.
  emailInfo: 'info@idealpackuae.com',
  emailInfoHref: 'mailto:info@idealpackuae.com',
  emailSales: 'sales@idealpackuae.com',
  emailSalesHref: 'mailto:sales@idealpackuae.com',
  emailAccounts: 'accounts@idealpackuae.com',
  emailAccountsHref: 'mailto:accounts@idealpackuae.com',

  // Backwards-compatible aliases -> general enquiries.
  emailDisplay: 'info@idealpackuae.com',
  emailHref: 'mailto:info@idealpackuae.com',

  locationLine1: 'Industrial Area 12,',
  locationLine2: 'Sharjah, UAE',
  location: 'Industrial Area 12, Sharjah, UAE',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=Industrial+Area+12+Sharjah+UAE',
}
