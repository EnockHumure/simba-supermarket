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
    guest: 'Guest',
    newShopper: 'New shopper',
    loyalty: 'loyalty',
    cart: 'Cart',
    switchAccount: 'Switch account',
    lightMode: 'Light',
    darkMode: 'Dark',
    heroKicker: 'Simba, rebuilt for Rwanda',
    heroTitle: 'Rapid grocery shopping for Kigali, with Simba products and loyalty built in.',
    heroDescription:
      'Choose your language, switch your theme, and shop the Simba catalogue with a faster Rwanda-focused experience.',
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
    guest: 'Umushyitsi',
    newShopper: 'Umukiriya mushya',
    loyalty: 'igabanywa',
    cart: 'Igitebo',
    switchAccount: 'Hindura konti',
    lightMode: 'Mucyo',
    darkMode: 'Umwijima',
    heroKicker: 'Simba ivuguruye ku Rwanda',
    heroTitle: 'Guhahira Kigali byihuse, hamwe n’ibicuruzwa bya Simba n’ubudahemuka bw’umukiriya.',
    heroDescription:
      'Hitamo ururimi, uhindure isura, maze uhahire kuri Simba mu buryo bwihuse kandi bwubakiye ku Rwanda.',
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
    guest: 'Invite',
    newShopper: 'Nouveau client',
    loyalty: 'reduction',
    cart: 'Panier',
    switchAccount: 'Changer de compte',
    lightMode: 'Clair',
    darkMode: 'Sombre',
    heroKicker: 'Simba repense pour le Rwanda',
    heroTitle: 'Courses rapides pour Kigali avec les produits Simba et la fidelite integree.',
    heroDescription:
      'Choisissez votre langue, changez le theme et utilisez une experience Simba adaptee au Rwanda.',
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
    guest: 'Mgeni',
    newShopper: 'Mnunuzi mpya',
    loyalty: 'punguzo',
    cart: 'Kikapu',
    switchAccount: 'Badili akaunti',
    lightMode: 'Mwanga',
    darkMode: 'Giza',
    heroKicker: 'Simba imeboreshwa kwa Rwanda',
    heroTitle: 'Ununuzi wa haraka Kigali ukiwa na bidhaa za Simba na mfumo wa uaminifu.',
    heroDescription:
      'Chagua lugha yako, badili mwonekano, na ununue kwenye Simba kwa uzoefu unaolenga Rwanda.',
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
