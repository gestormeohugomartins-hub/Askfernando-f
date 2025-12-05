import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Testimonials = () => {
  const { t, language } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 4;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API}/testimonials`, {
          params: { language, approved_only: true }
        });
        // Filter testimonials with rating > 4
        const filtered = response.data.filter(t => (t.rating || 5) >= 4);
        setTestimonials(filtered);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]);

  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    if (testimonials.length <= testimonialsPerPage) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(testimonials.length / testimonialsPerPage) - 1;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const nextSlide = () => {
    const maxIndex = Math.ceil(testimonials.length / testimonialsPerPage) - 1;
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.ceil(testimonials.length / testimonialsPerPage) - 1;
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const getCurrentTestimonials = () => {
    const start = currentIndex * testimonialsPerPage;
    return testimonials.slice(start, start + testimonialsPerPage);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.testimonials.title} <span className="text-orange-600">{t.testimonials.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.slice(0, 6).map((testimonial, index) => (
                  <Card 
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 bg-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-bl-full"></div>
                    
                    <CardContent className="p-6 relative">
                      <Quote className="h-8 w-8 text-orange-500 mb-4 opacity-50" />
                      
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-6">
                        {testimonial.text}
                      </p>

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="font-bold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 text-lg">
                  {t.testimonials.footer}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No testimonials available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;