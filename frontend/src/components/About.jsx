import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const highlights = [
    t.about.highlight1,
    t.about.highlight2,
    t.about.highlight3,
    t.about.highlight4
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.about.title} <span className="text-orange-600">{t.about.titleHighlight}</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
                alt="Fernando Mendes"
                className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Nascido em Portugal Central, mudei-me para o Canadá (Toronto) ainda jovem, onde cresci até aos 17 anos. 
                Ao regressar a Portugal, completei os meus estudos e iniciei a minha carreira como agente imobiliário.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                A crise financeira de 2009 levou-me a expandir os serviços que ofereço. Desde então, tenho ajudado os 
                meus clientes com contratos de telecomunicações, internet e telemóvel, bem como hipotecas. Há 3 anos, 
                também me tornei corretor de seguros.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Graças ao meu excelente inglês, especializei-me em ajudar imigrantes de língua inglesa com as suas 
                necessidades, <strong className="text-orange-600">não cobrando aos meus clientes pelos serviços de consultoria</strong>.
              </p>

              <div className="mt-8 space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;