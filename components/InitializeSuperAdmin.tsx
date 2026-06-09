import { useEffect } from 'react';

const SUPERADMIN_EMAIL = 'humureenock@gmail.com';
const SUPERADMIN_PASSWORD = 'Mataru@8';
const SUPERADMIN_NAME = 'Enock Humure';

const hashPassword = (password: string): string => {
  return btoa(password);
};

export const InitializeSuperAdmin = () => {
  useEffect(() => {
    const profiles = JSON.parse(localStorage.getItem('simba_profiles') || '{}');
    
    // Check if SuperAdmin already exists
    if (!profiles[SUPERADMIN_EMAIL]) {
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
      
      console.log('✅ SuperAdmin account initialized');
      console.log('📧 Email:', SUPERADMIN_EMAIL);
      console.log('🔑 Password:', SUPERADMIN_PASSWORD);
    }
  }, []);

  return null;
};
