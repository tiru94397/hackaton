import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Robotics Engineer",
    company: "TechCorp Industries",
    content: "MachineAI has revolutionized our prototyping process. What used to take days now takes minutes. The AI-generated models are incredibly accurate.",
    rating: 5,
    avatar: "AC",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    name: "Sarah Rodriguez",
    role: "Industrial Designer",
    company: "Innovation Labs",
    content: "The level of detail is mind-blowing. I can quickly iterate on designs and present them to clients. This tool is a game-changer for our workflow.",
    rating: 5,
    avatar: "SR",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Marcus Johnson",
    role: "Manufacturing Lead",
    company: "AutoMech Solutions",
    content: "Being able to visualize complex machinery before building prototypes has saved us thousands. The export formats work perfectly with our CAD software.",
    rating: 5,
    avatar: "MJ",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    name: "Emma Thompson",
    role: "Research Scientist",
    company: "MIT Robotics Lab",
    content: "We use MachineAI for rapid concept development in our research. The AI understands mechanical principles remarkably well.",
    rating: 5,
    avatar: "ET",
    gradient: "from-green-500 to-cyan-400",
  },
  {
    name: "David Park",
    role: "Product Manager",
    company: "DroneWorks",
    content: "The ability to generate and modify designs on the fly during meetings has transformed how we communicate ideas. Absolutely essential tool.",
    rating: 5,
    avatar: "DP",
    gradient: "from-cyan-400 to-green-500",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 px-4 lg:px-8 bg-accent/20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-blue-500">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Loved by Engineers
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join thousands of engineers and designers who trust MachineAI for their projects
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative h-[300px] md:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 0.8,
                  x: index === currentIndex ? 0 : direction > 0 ? 100 : -100,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}
              >
                <Card className="p-8 md:p-10 bg-card/80 backdrop-blur-sm border-cyan-400/20 shadow-2xl relative overflow-hidden h-full">
                  {/* Background gradient */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${testimonial.gradient} opacity-5 rounded-full blur-3xl`} />
                  
                  {/* Quote icon */}
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-cyan-400/10" />

                  <div className="relative">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-lg text-foreground/80 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <Avatar className={`w-12 h-12 border-2 border-cyan-400/30`}>
                        <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-white`}>
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-foreground/60">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-cyan-400 w-8'
                    : 'bg-cyan-400/30 hover:bg-cyan-400/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
