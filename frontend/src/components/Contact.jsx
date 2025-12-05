import { Mail, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if service was pre-selected from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, {
        ...formData,
        language: language
      });

      toast.success(t.contact.successTitle, {
        description: t.contact.successDescription,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t.contact.errorTitle, {
        description: t.contact.errorDescription,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: t.contact.email,
      value: 'fernandomendes@askfernando.pt',
      link: 'mailto:fernandomendes@askfernando.pt',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t.contact.phone,
      value: '+351 913 287 073',
      link: 'tel:+351913287073',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.contact.title} <span className="text-blue-600">{t.contact.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
            <div className="w-24 h-1 bg-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.contact.infoTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {t.contact.infoText}
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${info.color} text-white`}>
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">{info.title}</h4>
                          {info.link ? (
                            <a 
                              href={info.link}
                              className="text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-600">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-none shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {t.contact.formTitle}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={t.contact.phonePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={t.contact.messagePlaceholder}
                    ></textarea>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : t.contact.submitButton}
                    {!isSubmitting && <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
