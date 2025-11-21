import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const whatsappNumber = '+351913287073';
  const defaultMessage = t.whatsapp.message;
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group animate-pulse hover:animate-none"
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform" />
      <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
        !
      </span>
    </button>
  );
};

export default WhatsAppButton;