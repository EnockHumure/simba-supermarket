export type Language = 'en' | 'rw' | 'fr' | 'sw';
export type ThemeMode = 'light' | 'dark';

export const ADMIN_PHONE = '+250788695675';

export const normalizeRwandanPhone = (value: string) => {
  const trimmed = value.replace(/\s+/g, '');

  if (/^\+2507\d{8}$/.test(trimmed)) {
    return trimmed;
  }

  if (/^07\d{8}$/.test(trimmed)) {
    return `+25${trimmed}`;
  }

  return trimmed;
};

export const isValidRwandanPhone = (value: string) => {
  const normalized = normalizeRwandanPhone(value);
  return /^\+2507[8923]\d{7}$/.test(normalized);
};

export const translations = {
  en: {
    languageName: 'English',
    deliveringTo: 'Delivering to',
    searchPlaceholder: 'Search Simba products, categories, brands',
    guest: 'Shop as guest',
    newShopper: 'New shopper',
    loyalty: 'loyalty',
    cart: 'Cart',
    switchAccount: 'Switch account',
    lightMode: 'Light',
    darkMode: 'Dark',
    heroKicker: 'Simba Rwanda',
    heroTitle: 'Fast supermarket delivery for Kigali.',
    heroDescription: 'Shop Simba products quickly, with optional login and delivery by location.',
    startBasket: 'Start this basket',
    loginBadge: 'simba rwanda',
    loginTitle: 'Start with your Rwanda number',
    loginDescription:
      'We restore your Simba profile, visit history, and loyalty discounts using the same phone number.',
    simbaIntroTitle: 'About Simba',
    simbaIntroBody:
      'Simba is a Rwanda-based supermarket experience focused on fast shopping, trusted household products, and local loyalty.',
    fullName: 'Full name',
    phoneNumber: 'Phone number',
    enterSimba: 'Enter Simba',
    phoneHint: 'Supported prefixes: +25078, +25079, +25072, +25073 or 078..., 079..., 072..., 073...',
    phoneError: 'Use a valid Rwanda number starting with +25078, +25079, +25072, +25073, or local 07...',
    loyaltyTip: 'Returning shoppers keep admin-assigned discounts and purchase counts.',
    yourOrder: 'Your order',
    simbaCart: 'Simba cart',
    emptyCartTitle: 'Your cart is empty.',
    emptyCartBody: 'Add products from the Simba catalogue to start a Kigali delivery basket.',
    subtotal: 'Subtotal',
    discount: 'Loyalty discount',
    total: 'Total',
    confirmCheckout: 'Confirm checkout',
    clearBasket: 'Clear basket',
    adminAccess: 'Admin panel',
    adminTitle: 'Simba loyalty manager',
    adminBody: 'Manage shopper profiles, purchase counts, and manual loyalty discounts.',
    unauthorizedAdmin: 'Only the authorized Simba admin number can open the admin panel.',
  },
  rw: {
    languageName: 'Kinyarwanda',
    deliveringTo: 'Aho tubagezaho',
    searchPlaceholder: 'Shakisha ibicuruzwa, ibyiciro cyangwa brands za Simba',
    guest: 'Hahira nk umushyitsi',
    newShopper: 'Umukiriya mushya',
    loyalty: 'igabanywa',
    cart: 'Igitebo',
    switchAccount: 'Hindura konti',
    lightMode: 'Mucyo',
    darkMode: 'Umwijima',
    heroKicker: 'Simba Rwanda',
    heroTitle: 'Supermarket itanga vuba i Kigali.',
    heroDescription: 'Hahira ibicuruzwa bya Simba vuba, winjire igihe ubishaka kandi uhitemo aho bigera.',
    startBasket: 'Tangira iri tegeko',
    loginBadge: 'simba rwanda',
    loginTitle: 'Tangira ukoresheje nimero yo mu Rwanda',
    loginDescription:
      'Dusubiza amakuru yawe ya Simba, inshuro usuye n’igabanywa ryawe dukoresheje nimero imwe.',
    simbaIntroTitle: 'Amakuru ya Simba',
    simbaIntroBody:
      'Simba ni supermarket ikorera mu Rwanda yibanda ku guhaha byihuse, ibicuruzwa byizewe n’ibihembo ku bakiriya.',
    fullName: 'Amazina yawe',
    phoneNumber: 'Nimero ya telefoni',
    enterSimba: 'Injira muri Simba',
    phoneHint: 'Dushyigikira +25078, +25079, +25072, +25073 cyangwa 078..., 079..., 072..., 073...',
    phoneError: 'Andika nimero nyayo yo mu Rwanda itangirana na +25078, +25079, +25072, +25073 cyangwa 07...',
    loyaltyTip: 'Abakiriya bagaruka bagumana igabanywa n’amateka yo guhahira.',
    yourOrder: 'Ibyo watumije',
    simbaCart: 'Igitebo cya Simba',
    emptyCartTitle: 'Igitebo kirimo ubusa.',
    emptyCartBody: 'Ongeramo ibicuruzwa bya Simba kugira ngo utangire gutumiza i Kigali.',
    subtotal: 'Igiteranyo mbere',
    discount: 'Igabanywa',
    total: 'Igiteranyo',
    confirmCheckout: 'Emeza ubwishyu',
    clearBasket: 'Sukura igitebo',
    adminAccess: 'Urupapuro rwa admin',
    adminTitle: 'Ubuyobozi bwa Simba',
    adminBody: 'Genzura abakiriya, ibyo baguze n’igabanywa ry’ubudahemuka.',
    unauthorizedAdmin: 'Nimero yemerewe gusa ni yo ifungura urupapuro rwa admin rwa Simba.',
  },
  fr: {
    languageName: 'Francais',
    deliveringTo: 'Livraison a',
    searchPlaceholder: 'Rechercher des produits, categories ou marques Simba',
    guest: 'Acheter sans compte',
    newShopper: 'Nouveau client',
    loyalty: 'reduction',
    cart: 'Panier',
    switchAccount: 'Changer de compte',
    lightMode: 'Clair',
    darkMode: 'Sombre',
    heroKicker: 'Simba Rwanda',
    heroTitle: 'Livraison rapide de supermarche a Kigali.',
    heroDescription: 'Achetez rapidement les produits Simba avec connexion facultative et choix de zone.',
    startBasket: 'Commencer ce panier',
    loginBadge: 'simba rwanda',
    loginTitle: 'Commencez avec votre numero rwandais',
    loginDescription:
      'Nous restaurons votre profil Simba, votre historique et vos reductions avec le meme numero.',
    simbaIntroTitle: 'Information Simba',
    simbaIntroBody:
      'Simba est une experience de supermarche basee au Rwanda, orientee vers la rapidite et la fidelite client.',
    fullName: 'Nom complet',
    phoneNumber: 'Numero de telephone',
    enterSimba: 'Entrer dans Simba',
    phoneHint: 'Prefixes acceptes: +25078, +25079, +25072, +25073 ou format local 07...',
    phoneError: 'Utilisez un numero rwandais valide commencant par +25078, +25079, +25072, +25073 ou 07...',
    loyaltyTip: 'Les clients de retour conservent leurs reductions et leurs achats.',
    yourOrder: 'Votre commande',
    simbaCart: 'Panier Simba',
    emptyCartTitle: 'Votre panier est vide.',
    emptyCartBody: 'Ajoutez des produits Simba pour commencer une livraison a Kigali.',
    subtotal: 'Sous-total',
    discount: 'Reduction fidelite',
    total: 'Total',
    confirmCheckout: 'Confirmer le paiement',
    clearBasket: 'Vider le panier',
    adminAccess: 'Panneau admin',
    adminTitle: 'Gestion fidelite Simba',
    adminBody: 'Gerez les clients, les achats et les reductions manuelles.',
    unauthorizedAdmin: 'Seul le numero admin autorise peut ouvrir le panneau Simba.',
  },
  sw: {
    languageName: 'Kiswahili',
    deliveringTo: 'Tunapeleka',
    searchPlaceholder: 'Tafuta bidhaa, makundi au chapa za Simba',
    guest: 'Nunua kama mgeni',
    newShopper: 'Mnunuzi mpya',
    loyalty: 'punguzo',
    cart: 'Kikapu',
    switchAccount: 'Badili akaunti',
    lightMode: 'Mwanga',
    darkMode: 'Giza',
    heroKicker: 'Simba Rwanda',
    heroTitle: 'Uwasilishaji wa haraka wa supermarket Kigali.',
    heroDescription: 'Nunua bidhaa za Simba kwa haraka, ukiingia ukitaka na ukichagua eneo la delivery.',
    startBasket: 'Anza kikapu hiki',
    loginBadge: 'simba rwanda',
    loginTitle: 'Anza kwa namba yako ya Rwanda',
    loginDescription:
      'Tunarudisha wasifu wako wa Simba, historia ya ziara na punguzo kwa kutumia namba ile ile.',
    simbaIntroTitle: 'Taarifa za Simba',
    simbaIntroBody:
      'Simba ni uzoefu wa supermarket ya Rwanda unaolenga ununuzi wa haraka, bidhaa za kuaminika na uaminifu wa wateja.',
    fullName: 'Jina kamili',
    phoneNumber: 'Namba ya simu',
    enterSimba: 'Ingia Simba',
    phoneHint: 'Viprefixi vinavyokubalika: +25078, +25079, +25072, +25073 au 07...',
    phoneError: 'Tumia namba sahihi ya Rwanda inayoanza na +25078, +25079, +25072, +25073 au 07...',
    loyaltyTip: 'Wateja wanaorudi wanabaki na punguzo na historia ya manunuzi.',
    yourOrder: 'Oda yako',
    simbaCart: 'Kikapu cha Simba',
    emptyCartTitle: 'Kikapu hakina kitu.',
    emptyCartBody: 'Ongeza bidhaa za Simba ili kuanza oda ya Kigali.',
    subtotal: 'Jumla ndogo',
    discount: 'Punguzo la uaminifu',
    total: 'Jumla',
    confirmCheckout: 'Thibitisha malipo',
    clearBasket: 'Futa kikapu',
    adminAccess: 'Paneli ya admin',
    adminTitle: 'Msimamizi wa uaminifu Simba',
    adminBody: 'Simamia wateja, manunuzi na punguzo za mikono.',
    unauthorizedAdmin: 'Namba ya admin iliyoidhinishwa pekee inaweza kufungua paneli ya Simba.',
  },
} as const;

const categoryTranslations: Record<string, Record<Language, string>> = {
  'Alcoholic Drinks': {
    en: 'Alcoholic Drinks',
    rw: 'Ibinyobwa bisembuye',
    fr: 'Boissons alcoolisees',
    sw: 'Vinywaji vya kilevi',
  },
  'Baby Products': {
    en: 'Baby Products',
    rw: 'Ibicuruzwa vy abana',
    fr: 'Produits pour bebe',
    sw: 'Bidhaa za watoto',
  },
  'Cosmetics & Personal Care': {
    en: 'Cosmetics & Personal Care',
    rw: 'Amavuta n isuku y umuntu',
    fr: 'Cosmetiques et soins personnels',
    sw: 'Vipodozi na huduma binafsi',
  },
  'Food Products': {
    en: 'Food Products',
    rw: 'Ibicuruzwa vy ibiribwa',
    fr: 'Produits alimentaires',
    sw: 'Bidhaa za chakula',
  },
  General: {
    en: 'General',
    rw: 'Rusange',
    fr: 'General',
    sw: 'Jumla',
  },
  'Kitchenware & Electronics': {
    en: 'Kitchenware & Electronics',
    rw: 'Ibikoresho vyo mu gikoni n iby ikoranabuhanga',
    fr: 'Ustensiles de cuisine et electronique',
    sw: 'Vifaa vya jikoni na elektroniki',
  },
  'Sports & Wellness': {
    en: 'Sports & Wellness',
    rw: 'Siporo n ubuzima bwiza',
    fr: 'Sport et bien-etre',
    sw: 'Michezo na afya',
  },
};

const productWordTranslations: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  rw: {
    baby: 'uruhinja',
    bread: 'umukate',
    butter: 'amavuta',
    cake: 'gato',
    cakes: 'gato',
    car: 'imodoka',
    chicken: 'inkoko',
    chocolate: 'shokora',
    coffee: 'ikawa',
    cooking: 'guteka',
    cream: 'krime',
    cup: 'igikombe',
    dog: 'imbwa',
    eggs: 'amagi',
    electric: 'amashanyarazi',
    flour: 'ifu',
    fresh: 'bihiye neza',
    fruit: 'icamwa',
    heater: 'gishyushya',
    juice: 'umutobe',
    lemon: 'indimu',
    milk: 'amata',
    oil: 'amavuta',
    orange: 'icunga',
    paper: 'impapuro',
    phone: 'telefoni',
    pineapple: 'inanasi',
    salt: 'umunyu',
    shampoo: 'shampo',
    soap: 'isabune',
    spoon: 'ikiyiko',
    sunflower: 'izuba',
    vinegar: 'vinegere',
    water: 'amazi',
    wipes: 'utwenda two guhanagura',
  },
  fr: {
    baby: 'bebe',
    bread: 'pain',
    butter: 'beurre',
    cake: 'gateau',
    cakes: 'gateaux',
    car: 'voiture',
    chicken: 'poulet',
    chocolate: 'chocolat',
    coffee: 'cafe',
    cooking: 'cuisson',
    cream: 'creme',
    cup: 'tasse',
    dog: 'chien',
    eggs: 'oeufs',
    electric: 'electrique',
    flour: 'farine',
    fresh: 'frais',
    fruit: 'fruit',
    heater: 'chauffage',
    juice: 'jus',
    lemon: 'citron',
    milk: 'lait',
    oil: 'huile',
    orange: 'orange',
    paper: 'papier',
    phone: 'telephone',
    pineapple: 'ananas',
    salt: 'sel',
    shampoo: 'shampoing',
    soap: 'savon',
    spoon: 'cuillere',
    sunflower: 'tournesol',
    vinegar: 'vinaigre',
    water: 'eau',
    wipes: 'lingettes',
  },
  sw: {
    baby: 'mtoto',
    bread: 'mkate',
    butter: 'siagi',
    cake: 'keki',
    cakes: 'keki',
    car: 'gari',
    chicken: 'kuku',
    chocolate: 'chokoleti',
    coffee: 'kahawa',
    cooking: 'kupikia',
    cream: 'krimu',
    cup: 'kikombe',
    dog: 'mbwa',
    eggs: 'mayai',
    electric: 'umeme',
    flour: 'unga',
    fresh: 'safi',
    fruit: 'tunda',
    heater: 'hita',
    juice: 'juisi',
    lemon: 'ndimu',
    milk: 'maziwa',
    oil: 'mafuta',
    orange: 'chungwa',
    paper: 'karatasi',
    phone: 'simu',
    pineapple: 'nanasi',
    salt: 'chumvi',
    shampoo: 'shampuu',
    soap: 'sabuni',
    spoon: 'kijiko',
    sunflower: 'alizeti',
    vinegar: 'siki',
    water: 'maji',
    wipes: 'vitambaa vya kufuta',
  },
};

export const translateCategoryLabel = (category: string, language: Language) => {
  return categoryTranslations[category]?.[language] || category;
};

export const translateProductLabel = (name: string, language: Language) => {
  if (language === 'en') {
    return name;
  }

  const dictionary = productWordTranslations[language];
  let translated = name;

  Object.entries(dictionary).forEach(([source, target]) => {
    const pattern = new RegExp(`\\b${source}\\b`, 'gi');
    translated = translated.replace(pattern, target);
  });

  return translated;
};
