import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import CookieSettings from './CookieSettings';

const CookieBanner = () => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  if (showSettings) {
    return <CookieSettings onClose={() => {
      setShowSettings(false);
      setShowBanner(false);
    }} />;
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-gray-700 shadow-2xl">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1">
            <Cookie className="h-8 w-8 text-orange-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-2">{t.cookies?.title || 'Cookie Consent'}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t.cookies?.description || 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.'}
                {' '}
                <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                  {t.cookies?.privacyLink || 'Privacy Policy'}
                </a>
                {' '}{t.cookies?.and || 'and'}{' '}
                <a href="/cookie-policy" className="text-blue-400 hover:text-blue-300 underline">
                  {t.cookies?.cookieLink || 'Cookie Policy'}
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Button
              onClick={openSettings}
              variant="outline"
              className="bg-transparent border-gray-600 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              {t.cookies?.settings || 'Settings'}
            </Button>
            <Button
              onClick={acceptNecessary}
              variant="outline"
              className="bg-transparent border-gray-600 text-white hover:bg-white/10"
            >
              {t.cookies?.necessary || 'Necessary Only'}
            </Button>
            <Button
              onClick={acceptAll}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {t.cookies?.acceptAll || 'Accept All'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
