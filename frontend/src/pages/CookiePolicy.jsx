import { useEffect } from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last Updated: November 24, 2025',
      sections: [
        {
          title: '1. What Are Cookies',
          content: 'Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, making it easier to visit the site again and making the site more useful to you.'
        },
        {
          title: '2. How We Use Cookies',
          content: 'We use cookies to:\n\n• Remember your language preferences\n• Remember your cookie consent choices\n• Understand how you use our website\n• Improve your user experience\n• Analyze website traffic and usage patterns'
        },
        {
          title: '3. Types of Cookies We Use',
          content: '**Necessary Cookies (Required)**\nThese cookies are essential for the website to function. They enable basic features like page navigation and access to secure areas. The website cannot function properly without these cookies.\n\nExamples:\n• Language preference cookies\n• Cookie consent cookies\n• Session cookies\n\n**Analytics Cookies (Optional)**\nThese cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website.\n\nExamples:\n• Google Analytics cookies\n• Page view tracking\n• User behavior analytics\n\n**Marketing Cookies (Optional)**\nThese cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.\n\nExamples:\n• Advertising cookies\n• Social media cookies\n• Retargeting cookies'
        },
        {
          title: '4. Managing Cookies',
          content: 'You can manage your cookie preferences at any time by:\n\n• Clicking the "Cookie Settings" link in the footer\n• Adjusting your browser settings to refuse cookies\n• Deleting cookies that have already been set\n\nPlease note that blocking necessary cookies may affect the functionality of the website.'
        },
        {
          title: '5. Third-Party Cookies',
          content: 'We may use third-party services that also set cookies on your device. These third parties have their own privacy policies.'
        },
        {
          title: '6. Your Consent',
          content: 'When you first visit our website, we will ask for your consent to use non-essential cookies. You can change your mind at any time by adjusting your cookie preferences.'
        },
        {
          title: '7. Updates to This Policy',
          content: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.'
        },
        {
          title: '8. Contact Us',
          content: 'If you have questions about our use of cookies, please contact us:\n\nEmail: fernandomendes@askfernando.pt\nPhone: +351 913 287 073'
        }
      ]
    },
    pt: {
      title: 'Política de Cookies',
      lastUpdated: 'Última Atualização: 24 de Novembro de 2025',
      sections: [
        {
          title: '1. O Que São Cookies',
          content: 'Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo quando visita um website. Ajudam os websites a recordar informações sobre a sua visita, facilitando a próxima visita e tornando o site mais útil.'
        },
        {
          title: '2. Como Usamos Cookies',
          content: 'Usamos cookies para:\n\n• Recordar as suas preferências de idioma\n• Recordar as suas escolhas de consentimento de cookies\n• Compreender como usa o nosso website\n• Melhorar a sua experiência de utilizador\n• Analisar o tráfego e padrões de uso do website'
        },
        {
          title: '3. Tipos de Cookies que Usamos',
          content: '**Cookies Necessários (Obrigatórios)**\nEstes cookies são essenciais para o funcionamento do website. Permitem funcionalidades básicas como navegação de páginas e acesso a áreas seguras. O website não pode funcionar adequadamente sem estes cookies.\n\nExemplos:\n• Cookies de preferência de idioma\n• Cookies de consentimento\n• Cookies de sessão\n\n**Cookies Analíticos (Opcionais)**\nEstes cookies ajudam-nos a compreender como os visitantes interagem com o nosso website, recolhendo e reportando informações de forma anónima. Isto ajuda-nos a melhorar o nosso website.\n\nExemplos:\n• Cookies do Google Analytics\n• Rastreamento de visualizações de página\n• Análise de comportamento do utilizador\n\n**Cookies de Marketing (Opcionais)**\nEstes cookies rastreiam a sua atividade online para ajudar os anunciantes a fornecer publicidade mais relevante ou para limitar quantas vezes vê um anúncio.\n\nExemplos:\n• Cookies de publicidade\n• Cookies de redes sociais\n• Cookies de retargeting'
        },
        {
          title: '4. Gestão de Cookies',
          content: 'Pode gerir as suas preferências de cookies a qualquer momento:\n\n• Clicando no link "Definições de Cookies" no rodapé\n• Ajustando as definições do seu navegador para recusar cookies\n• Eliminando cookies que já foram definidos\n\nNote que bloquear cookies necessários pode afetar a funcionalidade do website.'
        },
        {
          title: '5. Cookies de Terceiros',
          content: 'Podemos usar serviços de terceiros que também definem cookies no seu dispositivo. Estes terceiros têm as suas próprias políticas de privacidade.'
        },
        {
          title: '6. O Seu Consentimento',
          content: 'Quando visita o nosso website pela primeira vez, pediremos o seu consentimento para usar cookies não essenciais. Pode mudar de ideias a qualquer momento ajustando as suas preferências de cookies.'
        },
        {
          title: '7. Atualizações a Esta Política',
          content: 'Podemos atualizar esta Política de Cookies periodicamente. Quaisquer alterações serão publicadas nesta página com uma data de revisão atualizada.'
        },
        {
          title: '8. Contacte-nos',
          content: 'Se tiver questões sobre o nosso uso de cookies, contacte-nos:\n\nEmail: fernandomendes@askfernando.pt\nTelefone: +351 913 287 073'
        }
      ]
    },
    fr: {
      title: 'Politique des Cookies',
      lastUpdated: 'Dernière Mise à Jour: 24 Novembre 2025',
      sections: [
        {
          title: '1. Que Sont les Cookies',
          content: 'Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils aident les sites web à mémoriser des informations sur votre visite, facilitant ainsi la prochaine visite et rendant le site plus utile.'
        },
        {
          title: '2. Comment Nous Utilisons les Cookies',
          content: 'Nous utilisons les cookies pour:\n\n• Mémoriser vos préférences linguistiques\n• Mémoriser vos choix de consentement aux cookies\n• Comprendre comment vous utilisez notre site web\n• Améliorer votre expérience utilisateur\n• Analyser le trafic et les modèles d\'utilisation du site web'
        },
        {
          title: '3. Types de Cookies que Nous Utilisons',
          content: '**Cookies Nécessaires (Requis)**\nCes cookies sont essentiels au fonctionnement du site web. Ils permettent des fonctionnalités de base comme la navigation et l\'accès aux zones sécurisées. Le site ne peut pas fonctionner correctement sans ces cookies.\n\nExemples:\n• Cookies de préférence linguistique\n• Cookies de consentement\n• Cookies de session\n\n**Cookies Analytiques (Optionnels)**\nCes cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant et en rapportant des informations de manière anonyme. Cela nous aide à améliorer notre site.\n\nExemples:\n• Cookies Google Analytics\n• Suivi des pages vues\n• Analyse du comportement utilisateur\n\n**Cookies Marketing (Optionnels)**\nCes cookies suivent votre activité en ligne pour aider les annonceurs à diffuser des publicités plus pertinentes ou pour limiter le nombre de fois où vous voyez une annonce.\n\nExemples:\n• Cookies publicitaires\n• Cookies des réseaux sociaux\n• Cookies de reciblage'
        },
        {
          title: '4. Gestion des Cookies',
          content: 'Vous pouvez gérer vos préférences de cookies à tout moment:\n\n• En cliquant sur le lien "Paramètres des Cookies" dans le pied de page\n• En ajustant les paramètres de votre navigateur pour refuser les cookies\n• En supprimant les cookies déjà définis\n\nVeuillez noter que le blocage des cookies nécessaires peut affecter la fonctionnalité du site.'
        },
        {
          title: '5. Cookies Tiers',
          content: 'Nous pouvons utiliser des services tiers qui définissent également des cookies sur votre appareil. Ces tiers ont leurs propres politiques de confidentialité.'
        },
        {
          title: '6. Votre Consentement',
          content: 'Lorsque vous visitez notre site pour la première fois, nous vous demanderons votre consentement pour utiliser des cookies non essentiels. Vous pouvez changer d\'avis à tout moment en ajustant vos préférences de cookies.'
        },
        {
          title: '7. Mises à Jour de Cette Politique',
          content: 'Nous pouvons mettre à jour cette Politique des Cookies périodiquement. Tout changement sera publié sur cette page avec une date de révision mise à jour.'
        },
        {
          title: '8. Nous Contacter',
          content: 'Si vous avez des questions sur notre utilisation des cookies, contactez-nous:\n\nEmail: fernandomendes@askfernando.pt\nTéléphone: +351 913 287 073'
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
              <div className="flex items-center space-x-4 mb-4">
                <Cookie className="h-10 w-10 text-orange-600" />
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                  {currentContent.title}
                </h1>
              </div>
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

export default CookiePolicy;
