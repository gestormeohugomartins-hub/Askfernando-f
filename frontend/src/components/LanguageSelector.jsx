import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: 'gb' },
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'pt', name: 'Português', flag: 'pt' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          variant="ghost"
          size="sm"
          className={`p-2 transition-all duration-300 rounded-lg overflow-hidden ${
            language === lang.code
              ? 'bg-white/20 scale-110 ring-2 ring-orange-500'
              : 'hover:bg-white/10 opacity-70 hover:opacity-100'
          }`}
          title={lang.name}
        >
          <img 
            src={`https://flagcdn.com/w40/${lang.flag}.png`}
            srcSet={`https://flagcdn.com/w80/${lang.flag}.png 2x`}
            width="32"
            height="24"
            alt={lang.name}
            className="rounded"
          />
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
