// Initialize SuperAdmin Account
// Run this once to create the superadmin account

const SUPERADMIN_EMAIL = 'humureenock@gmail.com';
const SUPERADMIN_PASSWORD = 'Mataru@8';
const SUPERADMIN_NAME = 'Enock Humure';

// Simple hash function (matches UserContext)
const hashPassword = (password) => {
  return btoa(password);
};

const initializeSuperAdmin = () => {
  const profiles = JSON.parse(localStorage.getItem('simba_profiles') || '{}');
  
  const superAdminProfile = {
    name: SUPERADMIN_NAME,
    email: SUPERADMIN_EMAIL,
    password: hashPassword(SUPERADMIN_PASSWORD),
    phone: '+250788695675',
    visitCount: 1,
    totalPurchases: 0,
    manualDiscount: 0,
    role: 'superadmin'
  };
  
  profiles[SUPERADMIN_EMAIL] = superAdminProfile;
  localStorage.setItem('simba_profiles', JSON.stringify(profiles));
  
  console.log('✅ SuperAdmin account created!');
  console.log('Email:', SUPERADMIN_EMAIL);
  console.log('Password:', SUPERADMIN_PASSWORD);
};

// Run initialization
initializeSuperAdmin();
