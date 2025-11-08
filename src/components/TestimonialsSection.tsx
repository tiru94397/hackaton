"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Virtual Factory AI transformed our product design workflow — what took weeks now takes hours.",
    author: "Aarav Mehta",
    title: "Product Engineer, NovaTech",
  },
  {
    quote:
      "This is the future of manufacturing intelligence. The precision and adaptability are unreal.",
    author: "Dr. Ishita Rao",
    title: "R&D Head, MechX Labs",
  },
  {
    quote:
      "Our team created AI-powered prototypes faster than ever using VF AI’s automation tools.",
    author: "Kiran Das",
    title: "Founder, AutoForge Robotics",
  },
  {
    quote:
      "VF AI’s simulation engine cut our prototype testing time by 70%. It’s revolutionary.",
    author: "Raghav Bansal",
    title: "Mechanical Lead, BuildX Systems",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-12 bg-black/60 text-gray-200 backdrop-blur-md">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
      >
        What Innovators Say
      </motion.h2>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0px 0px 30px rgba(147, 51, 234, 0.4)",
            }}
            className="transform-gpu"
          >
            <Card className="bg-gradient-to-b from-gray-900/90 to-gray-800/80 border border-gray-700/60 shadow-lg rounded-2xl hover:shadow-purple-500/10 transition-all duration-500">
              <CardContent className="p-6">
                <p className="italic text-gray-200 text-sm md:text-base mb-4 leading-relaxed">
                  “{t.quote}”
                </p>
                <p className="font-semibold text-purple-400">{t.author}</p>
                <p className="text-xs text-gray-500">{t.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Background Glow Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 blur-3xl opacity-60 pointer-events-none"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Floating light particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </section>
  );
}
