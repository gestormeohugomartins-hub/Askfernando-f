import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: November 24, 2025',
      sections: [
        {
          title: '1. Introduction',
          content: 'AskFernando.pt ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website askfernando.pt.'
        },
        {
          title: '2. Information We Collect',
          content: 'We collect information that you provide directly to us, including:\n\n• Personal identification information (name, email address, phone number)\n• Messages and inquiries sent through our contact form\n• Language preferences\n• Cookie consent preferences\n\nWe automatically collect certain information when you visit our website:\n\n• Browser type and version\n• Operating system\n• Pages visited and time spent\n• Referring website addresses\n• IP address'
        },
        {
          title: '3. How We Use Your Information',
          content: 'We use the information we collect to:\n\n• Respond to your inquiries and provide customer service\n• Send you information about our services\n• Improve our website and services\n• Comply with legal obligations\n• Protect against fraudulent or illegal activity'
        },
        {
          title: '4. Data Retention',
          content: 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.'
        },
        {
          title: '5. Your Rights (GDPR)',
          content: 'Under the General Data Protection Regulation (GDPR), you have the following rights:\n\n• Right to access your personal data\n• Right to rectification of inaccurate data\n• Right to erasure ("right to be forgotten")\n• Right to restrict processing\n• Right to data portability\n• Right to object to processing\n• Right to withdraw consent\n\nTo exercise these rights, please contact us at fernandomendes@askfernando.pt'
        },
        {
          title: '6. Data Security',
          content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.'
        },
        {
          title: '7. International Data Transfers',
          content: 'Your information may be transferred to and maintained on servers located outside of your country. We ensure that appropriate safeguards are in place to protect your data.'
        },
        {
          title: '8. Children\'s Privacy',
          content: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16.'
        },
        {
          title: '9. Changes to This Policy',
          content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.'
        },
        {
          title: '10. Contact Us',
          content: 'If you have questions about this Privacy Policy, please contact us:\n\nEmail: fernandomendes@askfernando.pt\nPhone: +351 913 287 073\nWebsite: askfernando.pt'
        }
      ]
    },
    pt: {
      title: 'Política de Privacidade',
      lastUpdated: 'Última Atualização: 24 de Novembro de 2025',
      sections: [
        {
          title: '1. Introdução',
          content: 'O AskFernando.pt ("nós", "nosso" ou "nos") está comprometido em proteger a sua privacidade. Esta Política de Privacidade explica como recolhemos, usamos, divulgamos e protegemos as suas informações quando visita o nosso website askfernando.pt.'
        },
        {
          title: '2. Informações que Recolhemos',
          content: 'Recolhemos informações que nos fornece diretamente, incluindo:\n\n• Informações de identificação pessoal (nome, endereço de email, número de telefone)\n• Mensagens e consultas enviadas através do nosso formulário de contacto\n• Preferências de idioma\n• Preferências de consentimento de cookies\n\nRecolhemos automaticamente certas informações quando visita o nosso website:\n\n• Tipo e versão do navegador\n• Sistema operativo\n• Páginas visitadas e tempo gasto\n• Endereços de websites de referência\n• Endereço IP'
        },
        {
          title: '3. Como Usamos as Suas Informações',
          content: 'Usamos as informações que recolhemos para:\n\n• Responder às suas consultas e fornecer atendimento ao cliente\n• Enviar-lhe informações sobre os nossos serviços\n• Melhorar o nosso website e serviços\n• Cumprir obrigações legais\n• Proteger contra atividades fraudulentas ou ilegais'
        },
        {
          title: '4. Retenção de Dados',
          content: 'Retemos as suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido por lei.'
        },
        {
          title: '5. Os Seus Direitos (RGPD)',
          content: 'Ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD), tem os seguintes direitos:\n\n• Direito de acesso aos seus dados pessoais\n• Direito à retificação de dados incorretos\n• Direito ao apagamento ("direito ao esquecimento")\n• Direito à limitação do tratamento\n• Direito à portabilidade dos dados\n• Direito de oposição ao tratamento\n• Direito de retirar o consentimento\n\nPara exercer estes direitos, contacte-nos em fernandomendes@askfernando.pt'
        },
        {
          title: '6. Segurança dos Dados',
          content: 'Implementamos medidas técnicas e organizacionais apropriadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro.'
        },
        {
          title: '7. Transferências Internacionais de Dados',
          content: 'As suas informações podem ser transferidas e mantidas em servidores localizados fora do seu país. Garantimos que existem salvaguardas apropriadas para proteger os seus dados.'
        },
        {
          title: '8. Privacidade de Menores',
          content: 'Os nossos serviços não são direcionados a indivíduos com menos de 16 anos. Não recolhemos intencionalmente informações pessoais de menores de 16 anos.'
        },
        {
          title: '9. Alterações a Esta Política',
          content: 'Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações publicando a nova política nesta página e atualizando a data de "Última Atualização".'
        },
        {
          title: '10. Contacte-nos',
          content: 'Se tiver questões sobre esta Política de Privacidade, contacte-nos:\n\nEmail: fernandomendes@askfernando.pt\nTelefone: +351 913 287 073\nWebsite: askfernando.pt'
        }
      ]
    },
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière Mise à Jour: 24 Novembre 2025',
      sections: [
        {
          title: '1. Introduction',
          content: 'AskFernando.pt ("nous", "notre" ou "nos") s\'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web askfernando.pt.'
        },
        {
          title: '2. Informations que Nous Collectons',
          content: 'Nous collectons les informations que vous nous fournissez directement, notamment:\n\n• Informations d\'identification personnelle (nom, adresse e-mail, numéro de téléphone)\n• Messages et demandes envoyés via notre formulaire de contact\n• Préférences linguistiques\n• Préférences de consentement aux cookies\n\nNous collectons automatiquement certaines informations lorsque vous visitez notre site:\n\n• Type et version du navigateur\n• Système d\'exploitation\n• Pages visitées et temps passé\n• Adresses des sites web de référence\n• Adresse IP'
        },
        {
          title: '3. Comment Nous Utilisons Vos Informations',
          content: 'Nous utilisons les informations que nous collectons pour:\n\n• Répondre à vos demandes et fournir un service client\n• Vous envoyer des informations sur nos services\n• Améliorer notre site web et nos services\n• Respecter les obligations légales\n• Protéger contre les activités frauduleuses ou illégales'
        },
        {
          title: '4. Conservation des Données',
          content: 'Nous conservons vos informations personnelles uniquement le temps nécessaire pour remplir les objectifs décrits dans cette Politique de Confidentialité, sauf si une période de conservation plus longue est requise par la loi.'
        },
        {
          title: '5. Vos Droits (RGPD)',
          content: 'En vertu du Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants:\n\n• Droit d\'accès à vos données personnelles\n• Droit de rectification des données inexactes\n• Droit à l\'effacement ("droit à l\'oubli")\n• Droit à la limitation du traitement\n• Droit à la portabilité des données\n• Droit d\'opposition au traitement\n• Droit de retirer le consentement\n\nPour exercer ces droits, contactez-nous à fernandomendes@askfernando.pt'
        },
        {
          title: '6. Sécurité des Données',
          content: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre l\'accès non autorisé, la modification, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet n\'est sûre à 100%.'
        },
        {
          title: '7. Transferts Internationaux de Données',
          content: 'Vos informations peuvent être transférées et conservées sur des serveurs situés en dehors de votre pays. Nous veillons à ce que des garanties appropriées soient en place pour protéger vos données.'
        },
        {
          title: '8. Vie Privée des Enfants',
          content: 'Nos services ne sont pas destinés aux personnes de moins de 16 ans. Nous ne collectons pas sciemment d\'informations personnelles auprès d\'enfants de moins de 16 ans.'
        },
        {
          title: '9. Modifications de Cette Politique',
          content: 'Nous pouvons mettre à jour cette Politique de Confidentialité périodiquement. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page et en mettant à jour la date de "Dernière Mise à Jour".'
        },
        {
          title: '10. Nous Contacter',
          content: 'Si vous avez des questions sur cette Politique de Confidentialité, contactez-nous:\n\nEmail: fernandomendes@askfernando.pt\nTéléphone: +351 913 287 073\nSite web: askfernando.pt'
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="mb-8 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {currentContent.title}
              </h1>
              <p className="text-gray-500 mb-8">{currentContent.lastUpdated}</p>

              <div className="space-y-8">
                {currentContent.sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
