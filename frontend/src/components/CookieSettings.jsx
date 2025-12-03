import { useState, useEffect } from 'react';
import { X, Cookie, CheckCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../context/LanguageContext';

const CookieSettings = ({ onClose }) => {
  const { t } = useLanguage();
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('cookieConsent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          necessary: true,
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false
        });
      } catch (e) {
        console.error('Error parsing cookie preferences');
      }
    }
  }, []);

  const handleSave = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    onClose();
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: t.cookies?.necessaryTitle || 'Necessary Cookies',
      description: t.cookies?.necessaryDesc || 'These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas.',
      required: true
    },
    {
      id: 'analytics',
      title: t.cookies?.analyticsTitle || 'Analytics Cookies',
      description: t.cookies?.analyticsDesc || 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false
    },
    {
      id: 'marketing',
      title: t.cookies?.marketingTitle || 'Marketing Cookies',
      description: t.cookies?.marketingDesc || 'These cookies are used to track visitors across websites to display relevant advertisements.',
      required: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Cookie className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-slate-900">
                {t.cookies?.settingsTitle || 'Cookie Preferences'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            {t.cookies?.settingsDesc || 'Manage your cookie preferences. You can enable or disable different types of cookies below.'}
          </p>

          <div className="space-y-4 mb-6">
            {cookieTypes.map((type) => (
              <div
                key={type.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{type.title}</h3>
                      {type.required && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {t.cookies?.required || 'Required'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => {
                        if (!type.required) {
                          setPreferences(prev => ({
                            ...prev,
                            [type.id]: !prev[type.id]
                          }));
                        }
                      }}
                      disabled={type.required}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences[type.id]
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences[type.id] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                {t.cookies?.info || 'You can change these preferences at any time by clicking the cookie settings link in the footer.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              {t.cookies?.cancel || 'Cancel'}
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {t.cookies?.savePreferences || 'Save Preferences'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieSettings;
