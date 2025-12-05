import { Wifi, Shield, Euro, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <Wifi className="h-12 w-12" />,
      title: t.services.telecom.title,
      description: t.services.telecom.description,
      image: 'https://images.unsplash.com/photo-1700463108455-956c595bc97b',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: t.services.insurance.title,
      description: t.services.insurance.description,
      image: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Euro className="h-12 w-12" />,
      title: t.services.mortgages.title,
      description: t.services.mortgages.description,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      color: 'from-orange-600 to-orange-700'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.services.title} <span className="text-blue-600">{t.services.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
            <div className="w-24 h-1 bg-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-none overflow-hidden bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className={`absolute bottom-4 left-4 p-3 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-lg`}>
                    {service.icon}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {t.services.noCost} <span className="text-orange-500">{t.services.noCostHighlight}</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.services.noCostText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;