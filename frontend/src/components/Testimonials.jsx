import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { mockTestimonials } from '../utils/mockData';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              O Que Dizem os <span className="text-orange-600">Clientes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Testemunhos reais de clientes satisfeitos
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.slice(0, 6).map((testimonial, index) => (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-bl-full"></div>
                
                <CardContent className="p-6 relative">
                  <Quote className="h-8 w-8 text-orange-500 mb-4 opacity-50" />
                  
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
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
              Mais de <span className="font-bold text-blue-600">500 clientes satisfeitos</span> desde 2009
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;