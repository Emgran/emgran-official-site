import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechCorp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content:
      "This platform transformed how we integrate AI into our products. The API is incredibly easy to use and the performance is outstanding.",
    rating: 5,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder at StartupXYZ",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content:
      "We've tried several AI platforms, but this one stands out for its reliability and developer experience. Highly recommended!",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Emily Watson",
    role: "Product Manager at InnovateLabs",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content:
      "The support team is fantastic and the documentation is comprehensive. We were able to integrate AI features in days, not weeks.",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-muted/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-30" />
      
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold"
          >
            Loved by{" "}
            <span className="gradient-text">
              developers
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            See what our customers are saying about us
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-500"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`} />
              
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-12 w-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-2xl ring-2 ring-white/20"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
