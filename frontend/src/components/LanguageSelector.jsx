import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          variant="ghost"
          size="sm"
          className={`text-2xl p-2 transition-all duration-300 ${
            language === lang.code
              ? 'bg-white/20 scale-110 ring-2 ring-orange-500'
              : 'hover:bg-white/10 opacity-60 hover:opacity-100'
          }`}
          title={lang.name}
        >
          {lang.flag}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
