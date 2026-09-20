import React, { createContext, useContext, useState } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
];

const UI_STRINGS = {
  en: {
    nav_home: 'Home',
    nav_assistant: 'AI Assistant',
    nav_matcher: 'Find Standard',
    nav_certification: 'Certification Wizard',
    nav_isi: 'Verify ISI Mark',
    nav_huid: 'Verify HUID Gold',
    nav_standards: 'Standards Explorer',
    nav_dashboard: 'Dashboard',
    nav_admin: 'Admin Portal',
    nav_login: 'Login / Portal',
    hero_title: 'Your Intelligent Assistant for BIS Standards & Certification',
    hero_subtitle: 'Understand Indian Standards, find applicable IS codes, navigate BIS certification and verify product authenticity — all in one place.',
    btn_ask_ai: 'Ask BIS Assistant',
    btn_find_standard: 'Find My Standard',
    btn_verify_product: 'Verify Product',
    demo_badge: 'Smart India Hackathon 2026 Prototype • Demo Data Mode',
  },
  hi: {
    nav_home: 'होम',
    nav_assistant: 'एआई सहायक',
    nav_matcher: 'मानक खोजें',
    nav_certification: 'प्रमाणन विज़ार्ड',
    nav_isi: 'आईएसआई मार्क सत्यापन',
    nav_huid: 'एचयूआईडी स्वर्ण सत्यापन',
    nav_standards: 'भारतीय मानक निर्देशिका',
    nav_dashboard: 'डैशबोर्ड',
    nav_admin: 'प्रशासक पोर्टल',
    nav_login: 'लॉग इन / पोर्टल',
    hero_title: 'भारतीय मानकों और बीआईएस सेवाओं के लिए आपका बुद्धिमान सहायक',
    hero_subtitle: 'भारतीय मानकों को समझें, लागू आईएस कोड खोजें, बीआईएस प्रमाणन प्रक्रिया पूरी करें और उत्पाद प्रामाणिकता सत्यापित करें।',
    btn_ask_ai: 'बीआईएस सहायक से पूछें',
    btn_find_standard: 'अपना मानक खोजें',
    btn_verify_product: 'उत्पाद सत्यापित करें',
    demo_badge: 'स्मार्ट इंडिया हैकाथॉन 2026 प्रोटोटाइप • डेमो डेटा मोड',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  const t = (key) => {
    if (UI_STRINGS[currentLang] && UI_STRINGS[currentLang][key]) {
      return UI_STRINGS[currentLang][key];
    }
    return UI_STRINGS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, languages: LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
