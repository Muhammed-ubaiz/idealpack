import { products } from './products'

// Every article maps to a real Ideal Pack product category. Cover images and
// related products are pulled straight from the store product data so nothing
// is invented. Shop links point at the matching Ideal Pack Store collection or
// product page.
const STORE = 'https://idealpackstore.com'

const findProduct = (slug) => products.find((x) => x.slug === slug)

/** A trimmed product reference for the "Related Products" grid. */
const rel = (...slugs) =>
  slugs
    .map(findProduct)
    .filter(Boolean)
    .map((x) => ({ name: x.name, image: x.image, url: x.storeUrl }))

/** Use a secondary catalogue image where available so blog covers stay distinct. */
const cover = (slug) => {
  const x = findProduct(slug)
  if (!x) return ''
  return (x.images && x.images[1]) || x.image
}

const shopOf = (slug) => findProduct(slug)?.storeUrl || STORE

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Product-journal articles. One BlogDetails component renders every article
 * from these structured fields:
 *   intro          - what the product / category is
 *   benefits[]     - main benefits
 *   uses[]         - recommended uses
 *   businesses[]   - suitable businesses
 *   practical      - why it is practical
 *   tip            - useful tip callout
 *   relatedOptions - related Ideal Pack packaging options (prose)
 *   relatedProducts[] - {name, image, url} from the store
 *   shopUrl        - "Shop Now" destination on idealpackstore.com
 */
export const blogs = [
  {
    id: 1,
    slug: 'kraft-packaging-for-modern-takeaway-businesses',
    title: 'Kraft Packaging for Modern Takeaway Businesses',
    category: 'Kraft Products',
    date: '2026-09-02',
    image: cover('kraft-lunch-boxes-klb120-5-pcs-eco-friendly-paper-takeaway-boxes-without-window'),
    shopUrl: `${STORE}/collections/kraft-products`,
    featured: true,
    excerpt:
      'Kraft bowls, boxes, cups and bags give takeaway businesses a practical, natural-looking packaging range.',
    intro:
      'Ideal Pack’s kraft range covers salad bowls, lunch boxes, noodle bowls, ripple cups, boat trays and paper bags made from kraft paper and board. It gives food businesses a single, natural-looking material family for most takeaway needs.',
    benefits: [
      'Natural kraft finish that looks tidy with little or no printing',
      'Grease-resistant linings on bowls and boxes for warm, moderately saucy dishes',
      'Recyclable, paper-based material',
      'One material family across bowls, boxes, cups, trays and bags, which keeps stock simple',
    ],
    uses: [
      'Salads, grain bowls, noodles and rice dishes',
      'Burgers, wraps and hot mains in lunch boxes',
      'Sides and snacks in boat trays',
      'Hot and cold drinks in ripple cups',
    ],
    businesses: [
      'Takeaway restaurants and cloud kitchens',
      'Cafés and coffee shops',
      'Caterers and food trucks',
      'Delis and salad bars',
    ],
    practical:
      'Because the range shares one look and one material, a business can cover most of its menu with a handful of items, keep reordering simple and still present food consistently.',
    tip: 'For very wet or oily dishes, choose kraft with a reinforced inner coating, or serve the sauce in a separate pot.',
    relatedOptions:
      'For hot, oven-ready dishes, pair kraft with Ideal Pack aluminium containers. For cold grab-and-go items, a clear-lidded container shows the food. Cling film and paper napkins round out a full takeaway setup.',
    relatedProducts: rel(
      'kraft-paper-salad-bowl-20-oz-10-pcs',
      'ripple-paper-cup-with-lid-12oz-pack-of-10pcs-chocolate-black',
      'kraft-paper-noodle-bowl-with-lid',
      'kraft-paper-boat-trays-15-pcs',
    ),
  },
  {
    id: 2,
    slug: 'why-black-base-containers-are-popular-for-food-presentation',
    title: 'Why Black Base Containers Are Popular for Food Presentation',
    category: 'Black Base Containers',
    date: '2026-08-25',
    image: cover('black-base-3-compartment-food-containers-with-lids-pack-of-5'),
    shopUrl: `${STORE}/collections/black-base-containers`,
    excerpt:
      'A black base with a clear lid gives meals a clean, professional look for takeaway and meal prep.',
    intro:
      'Ideal Pack black base containers pair a solid black tray with a clear, leak-resistant lid. They come in round and rectangular shapes and in one, three and five-compartment layouts.',
    benefits: [
      'Black base makes food colours stand out for a professional look',
      'Clear lid lets customers see the meal without opening it',
      'Compartment options keep mains, sides and snacks separate',
      'Microwave, freezer and dishwasher friendly, and reusable',
    ],
    uses: [
      'Meal-prep and portioned meals',
      'Takeaway mains and combo meals',
      'Leftover and batch-cooking storage',
      'Ready-to-eat retail displays',
    ],
    businesses: [
      'Meal-prep and diet food services',
      'Restaurants and cloud kitchens',
      'Caterers',
      'Gyms and health food outlets',
    ],
    practical:
      'The consistent black-and-clear look means every order leaves the kitchen presented the same way, while the reusable build suits customers who keep the container.',
    tip: 'Choose one base size and stick to it so lids stay interchangeable across your menu.',
    relatedOptions:
      'For hot oven dishes, use aluminium containers. For lighter cold items, clear containers keep things simple. Kraft bowls suit a more natural presentation.',
    relatedProducts: rel(
      'black-base-rectangular-food-containers-with-lids-28-oz-5-pack',
      'black-base-round-food-containers-with-lids-16-oz-5-pack',
      '5-section-black-base-food-containers-with-lids-5-pcs',
      'black-base-round-microwavable-container-with-lid',
    ),
  },
  {
    id: 3,
    slug: 'clear-food-containers-for-fresh-salads-fruits-and-desserts',
    title: 'Clear Food Containers for Fresh Salads, Fruits and Desserts',
    category: 'Clear Containers',
    date: '2026-08-18',
    image: cover('kraft-salad-container-13-6x13-6x3-5-cm-10pieces'),
    shopUrl: shopOf('kraft-salad-container-13-6x13-6x3-5-cm-10pieces'),
    excerpt:
      'A clear lid turns fresh salads, fruit and desserts into a display that sells itself.',
    intro:
      'Clear-lidded containers from Ideal Pack — including kraft salad containers with clear lids and clear-topped food containers — let customers see fresh food before they buy it.',
    benefits: [
      'Full visibility of the food for grab-and-go display',
      'Secure lids that help prevent leaks in transit',
      'Keep layered dishes presentable',
      'Suit chilled counters and fridges',
    ],
    uses: [
      'Signature salads and poke bowls',
      'Cut fruit and fruit pots',
      'Layered desserts, trifles and parfaits',
      'Sandwiches, wraps and cold platters',
    ],
    businesses: [
      'Cafés and coffee shops',
      'Delis and salad bars',
      'Convenience and grab-and-go retail',
      'Caterers and event caterers',
    ],
    practical:
      'For chilled, cold food the clear lid does the merchandising, so staff spend less time describing dishes and customers can choose quickly.',
    tip: 'Clear lids show condensation, so keep them for cold items and use a solid lid for anything served warm.',
    relatedOptions:
      'Hot dishes are better in black base or aluminium containers, where a solid lid hides steam. Kraft bowls work when a natural look matters more than visibility.',
    relatedProducts: rel(
      'kraft-salad-container-13-6x13-6x3-5-cm-10pieces',
      'black-base-rectangular-food-containers-with-lids-28-oz-5-pack',
      'kraft-paper-salad-bowl-26-oz-10-pcs',
      '520-ml-golden-aluminium-round-food-containers-with-lids-5-pcs',
    ),
  },
  {
    id: 4,
    slug: 'aluminium-containers-for-catering-and-takeaway-meals',
    title: 'Aluminium Containers for Catering and Takeaway Meals',
    category: 'Aluminium Containers',
    date: '2026-08-11',
    image: cover('disposable-aluminium-foil-food-container-with-lid8389-50-pcs'),
    shopUrl: `${STORE}/collections/aluminium-products`,
    excerpt:
      'Aluminium containers, trays and pots handle hot, oven-ready food for catering and delivery.',
    intro:
      'Ideal Pack’s aluminium range includes foil food containers with lids, golden serving containers, cooking pots and foil rolls. Aluminium holds heat well and can go from oven to table.',
    benefits: [
      'Oven-safe and freezer-safe, so food can be prepared and reheated in one container',
      'Sturdy sidewalls that resist warping when full',
      'Leak-resistant with a rolled edge and fitted lid',
      'Recyclable metal',
    ],
    uses: [
      'Hot mains, bakes, biryani and roasts',
      'Bulk catering trays for events',
      'Reheating and holding food at temperature',
      'Festive and gift packaging in golden finishes',
    ],
    businesses: [
      'Catering companies and event caterers',
      'Restaurants and cloud kitchens',
      'Hotels and banquet kitchens',
      'Sweet shops and festive gifting',
    ],
    practical:
      'One container can cook, transport and reheat a dish, which cuts handling and keeps hot food hot from kitchen to customer.',
    tip: 'Match the container size to the portion so the lid seals flat and there is less movement in transit.',
    relatedOptions:
      'For cold or chilled items use clear or black base containers. Kraft boxes suit dry and moderately saucy dishes. Foil rolls and cling film cover wrapping and holding.',
    relatedProducts: rel(
      'heavy-duty-aluminium-foil-containers-with-lids-15-pack-73365-disposable-food-containers',
      '520-ml-golden-aluminium-round-food-containers-with-lids-5-pcs',
      '750-ml-golden-aluminium-rectangular-containers-with-lids-5-pcs',
      'ideal-pack-aluminium-foil-roll-450-mm-width-heavy-duty-kitchen-foil-for-wrapping-baking-grilling-freezing-food-storage-2-kg-gross-weight',
    ),
  },
  {
    id: 5,
    slug: 'choosing-the-right-cling-film-for-food-storage',
    title: 'Choosing the Right Cling Film for Food Storage',
    category: 'Plastic Roll & Bags',
    date: '2026-08-04',
    image: cover('eco-plastic-transparent-cling-film-wrap-100-feet'),
    shopUrl: `${STORE}/collections/plastic-roll-bags`,
    excerpt:
      'Cling film, table sheet rolls and covers keep prepped food fresh and surfaces clean.',
    intro:
      'Ideal Pack’s plastic roll range covers cling film in different widths and lengths, plastic table sheet rolls and disposable table covers for food service and events.',
    benefits: [
      'Clings firmly to form an airtight seal that keeps food fresh',
      'Transparent, so contents stay visible',
      'Wide-width rolls cover trays, platters and containers in one pass',
      'Cut-to-length rolls reduce waste',
    ],
    uses: [
      'Covering prepped ingredients and mise en place',
      'Sealing trays and containers for the fridge',
      'Wrapping platters for transport',
      'Protecting tables at events with sheet rolls',
    ],
    businesses: [
      'Restaurant and hotel kitchens',
      'Catering and banqueting',
      'Delis and food production',
      'Event and function venues',
    ],
    practical:
      'A single wide roll handles most covering and sealing jobs in a kitchen, which keeps prep quick and storage tidy.',
    tip: 'Choose a width that matches your largest tray so one pass covers it — narrow film wastes time and material.',
    relatedOptions:
      'For portioned storage, pair cling film with black base or clear containers. Aluminium foil suits wrapping hot food and oven use.',
    relatedProducts: rel(
      'cling-film-food-wrap-1-2kg-450mm',
      'eco-plastic-transparent-cling-film-wrap-100-feet',
      'plastic-table-sheet-roll-28l-x-35w-cm',
      'plastic-200-sheets-disposable-waterproof-table-cover-roll',
    ),
  },
  {
    id: 6,
    slug: 'paper-cups-for-coffee-shops-and-takeaway-beverages',
    title: 'Paper Cups for Coffee Shops and Takeaway Beverages',
    category: 'Paper Products',
    date: '2026-07-28',
    image: cover('ripple-paper-cup-with-lid-12oz-pack-of-10pcs-chocolate-black'),
    shopUrl: shopOf('ripple-paper-cup-with-lid-12oz-pack-of-10pcs-chocolate-black'),
    excerpt:
      'Ripple paper cups and carriers cover hot and cold drink service for cafés and takeaways.',
    intro:
      'Ideal Pack’s ripple paper cup has an insulating textured wall and a fitted lid, and pairs with a kraft coffee carrier box for multi-drink orders.',
    benefits: [
      'Ripple wall insulates, so no second sleeve is needed',
      'Fitted lid helps prevent spills',
      'Suitable for hot and cold drinks',
      'Natural kraft look with room for a simple stamp or sticker',
    ],
    uses: [
      'Filter coffee, lattes and cappuccinos',
      'Iced coffee, smoothies and milkshakes',
      'Tea and hot chocolate',
      'Four-cup office and group orders with a carrier',
    ],
    businesses: [
      'Coffee shops and cafés',
      'Bakeries and dessert shops',
      'Food trucks and kiosks',
      'Offices and event catering',
    ],
    practical:
      'One cup size with matching lids keeps the bar fast, and the carrier makes bulk orders easy to hand over without a tray.',
    tip: 'Standardise on one cup range and one lid system — mixed stock slows service more than most cafés expect.',
    relatedOptions:
      'Kraft bowls and boxes match the cups for a full takeaway range. Napkins and tissue products complete the counter setup.',
    relatedProducts: rel(
      'ripple-paper-cup-with-lid-12oz-pack-of-10pcs-chocolate-black',
      'eco-friendly-kraft-paper-coffee-carrier-box-durable-takeaway-drink-holder-for-4-cups',
      '30-cm-paper-folded-dining-napkin-everyday-premium-1-ply',
      'kraft-mini-rectangular-containers-150ml-10-pcs',
    ),
  },
  {
    id: 7,
    slug: 'eco-friendly-food-packaging-options-for-restaurants',
    title: 'Eco-Friendly Food Packaging Options for Restaurants',
    category: 'Eco-Friendly Products',
    date: '2026-07-21',
    image: cover('ideal-pack-kraft-gift-paper-bags-pack-of-10'),
    shopUrl: shopOf('ideal-pack-kraft-gift-paper-bags-pack-of-10'),
    excerpt:
      'Paper-based bowls, boxes, bags and trays give restaurants a lower-plastic packaging option.',
    intro:
      'Ideal Pack’s paper-based lines — kraft bowls, lunch boxes, boat trays, paper bags and moulded paper items — let restaurants move common packaging away from plastic.',
    benefits: [
      'Made from recyclable, paper-based material',
      'Biodegradable kraft options for dry and lightly sauced food',
      'Natural finish that reads as considered without heavy printing',
      'Covers most everyday formats in one material family',
    ],
    uses: [
      'Takeaway mains, sides and salads',
      'Bakery items and snacks',
      'Gift and retail packaging in kraft bags',
      'Market stalls and pop-ups',
    ],
    businesses: [
      'Restaurants and cafés moving away from plastic',
      'Bakeries and patisseries',
      'Caterers and market traders',
      'Hotels with grab-and-go outlets',
    ],
    practical:
      'Switching the highest-volume items first — the takeaway box, the salad bowl, the cup — covers most of the packaging a restaurant uses without changing how the kitchen works.',
    tip: 'Check what your local recycling actually accepts before switching a category, so the change holds up in practice.',
    relatedOptions:
      'Where paper will not perform — very wet, oily or oven-hot dishes — aluminium containers are the practical partner. Cling film handles storage.',
    relatedProducts: rel(
      'ideal-pack-kraft-gift-paper-bags-pack-of-10',
      'kraft-lunch-boxes-klb120-5-pcs-eco-friendly-paper-takeaway-boxes-without-window',
      'kraft-paper-boat-trays-15-pcs',
      'eco-plastic-transparent-cling-film-wrap-100-feet',
    ),
  },
  {
    id: 8,
    slug: 'food-containers-for-hot-and-cold-meals',
    title: 'Food Containers for Hot and Cold Meals',
    category: 'Plastic Products',
    date: '2026-07-14',
    image: cover('5-section-black-base-food-containers-with-lids-5-pcs'),
    shopUrl: `${STORE}/collections/black-base-containers`,
    excerpt:
      'BPA-free plastic containers cover portioned meals, takeaway and storage across hot and cold menus.',
    intro:
      'Ideal Pack’s plastic food containers include round and rectangular black base tubs and multi-compartment trays, made from BPA-free food-grade plastic with secure lids.',
    benefits: [
      'BPA-free, food-grade plastic',
      'Microwave, freezer and dishwasher friendly',
      'Secure lids that help prevent leaks in transit',
      'Reusable, which suits customers who keep them',
    ],
    uses: [
      'Portioned and meal-prep meals',
      'Takeaway mains, curries and rice dishes',
      'Leftover and batch-cooking storage',
      'Multi-item meals in compartment trays',
    ],
    businesses: [
      'Meal-prep services',
      'Restaurants and cloud kitchens',
      'Caterers',
      'Canteens and staff kitchens',
    ],
    practical:
      'The same container reheats, freezes and travels, so one format handles most of a mixed hot-and-cold menu.',
    tip: 'Keep hot and cold items in separate container types so lids and seals are matched to the job.',
    relatedOptions:
      'For oven-hot dishes, aluminium is better. For cold display, a clear lid helps sell the food. Kraft bowls suit a natural look.',
    relatedProducts: rel(
      'black-base-rectangular-food-containers-with-lids-28-oz-5-pack',
      'black-base-round-food-containers-with-lids-16-oz-5-pack',
      'black-base-3-compartment-food-containers-with-lids-pack-of-5',
      'black-base-round-microwavable-container-with-lid',
    ),
  },
  {
    id: 9,
    slug: 'tissue-products-for-restaurants-offices-and-hospitality',
    title: 'Tissue Products for Restaurants, Offices and Hospitality',
    category: 'Tissue Products',
    date: '2026-07-07',
    image: cover('premium-maxi-roll-twin-pack-2-rolls-800-embossed-sheets'),
    shopUrl: `${STORE}/collections/tissue-products`,
    excerpt:
      'Maxi rolls, facial tissue, napkins and toilet tissue cover front- and back-of-house hygiene.',
    intro:
      'Ideal Pack’s tissue range spans embossed maxi rolls, facial tissue, folded dining napkins, toilet tissue and multipurpose disposable tissues for commercial use.',
    benefits: [
      'Absorbent, lint-free 2-ply options for cleaning and wiping',
      'Formats for dispensers and for table or standalone use',
      'Hygienically packed for commercial environments',
      'One supplier across kitchen, washroom and table needs',
    ],
    uses: [
      'Kitchen and surface cleaning with maxi rolls',
      'Table service with folded napkins',
      'Washroom supply with toilet tissue',
      'Guest and desk supply with facial tissue',
    ],
    businesses: [
      'Restaurants, cafés and canteens',
      'Offices and coworking spaces',
      'Hotels and hospitality',
      'Salons and cleaning services',
    ],
    practical:
      'Sourcing kitchen, table and washroom tissue from one range keeps reordering simple and stock consistent across a site.',
    tip: 'Match roll and dispenser types before ordering in volume so refills fit the holders you already have.',
    relatedOptions:
      'Pair tissue supply with Ideal Care hand wash, dishwash liquid and gloves for a complete hygiene setup.',
    relatedProducts: rel(
      'premium-maxi-roll-twin-pack-2-rolls-800-embossed-sheets',
      'ideal-care-premium-facial-tissue-200-pulls-2-ply-soft-absorbent',
      '30-cm-paper-folded-dining-napkin-everyday-premium-1-ply',
      'prima-premium-tiolet-tissue-10-rolls-400-sheets-80-meters-2ply',
    ),
  },
  {
    id: 10,
    slug: 'cleaning-essentials-for-commercial-and-everyday-use',
    title: 'Cleaning Essentials for Commercial and Everyday Use',
    category: 'Ideal Care Products',
    date: '2026-06-30',
    image: cover('ideal-care-dishwash-liquid-powerful-grease-cutting-lemon-scent'),
    shopUrl: `${STORE}/collections/ideal-care-products`,
    excerpt:
      'Ideal Care dishwash liquid, hand wash, sponges and gloves cover daily cleaning for food businesses.',
    intro:
      'Ideal Pack’s Ideal Care range brings together dishwash liquid, hand wash, a produce sanitiser, heavy-duty scrub sponges and disposable gloves for kitchen and washroom routines.',
    benefits: [
      'Concentrated dishwash liquid that cuts grease with a small dose',
      'Hand wash formulated to be gentle with frequent use',
      'Heavy-duty sponges built for repeated commercial cleaning',
      'Powder-free gloves for food handling and light tasks',
    ],
    uses: [
      'Dishwashing and kitchen surface cleaning',
      'Handwashing at prep stations and washrooms',
      'Washing fruit, salad and vegetables',
      'Food handling and cleaning tasks with gloves',
    ],
    businesses: [
      'Restaurants, cafés and cloud kitchens',
      'Catering and food production',
      'Offices and schools',
      'Hotels and facilities teams',
    ],
    practical:
      'Buying cleaning consumables from one range keeps daily ordering simple and gives staff a consistent set of products to work with.',
    tip: 'Concentrated dishwash liquid goes further than it looks — start with a small dose and adjust rather than over-pouring.',
    relatedOptions:
      'Combine with Ideal Pack tissue products for wiping and drying, and cling film for covering cleaned, prepped food.',
    relatedProducts: rel(
      'ideal-care-dishwash-liquid-powerful-grease-cutting-lemon-scent',
      'ideal-care-rose-oud-hand-wash-liquid-soap',
      'ideal-care-heavy-duty-cellulosic-scrub-sponge-12-units-pack',
      'powder-free-glove-health-gloves-for-kitchen-cooking-food-handling-100pcs-box',
    ),
  },
]
