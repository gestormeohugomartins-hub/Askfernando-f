import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: t.header.about, section: 'about' },
    { label: t.header.services, section: 'services' },
    { label: t.header.testimonials, section: 'testimonials' },
    { label: t.header.contact, section: 'contact' }
  ];

  const services = [
    t.services.telecom.title,
    t.services.insurance.title,
    t.services.realEstate.title,
    t.services.mortgages.title
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              ASK<span className="text-orange-500">FERNANDO</span><span className="text-blue-500">.PT</span>
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="space-y-2">
              <a href="mailto:fernandomendes@askfernando.pt" className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors">
                <Mail className="h-5 w-5" />
                <span>fernandomendes@askfernando.pt</span>
              </a>
              <a href="tel:+351913287073" className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors">
                <Phone className="h-5 w-5" />
                <span>+351 913 287 073</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button onClick={() => scrollToSection(link.section)} className="text-gray-400 hover:text-orange-500 transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t.footer.servicesTitle}</h4>
            <ul className="space-y-2 text-gray-400">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AskFernando.pt - {t.footer.copyright}
            </p>
            <p className="text-gray-400 text-sm">
              {t.footer.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;