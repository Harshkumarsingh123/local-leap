// HPI 1.6-V
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Shield, Clock, DollarSign, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

// --- Types ---
type Stat = { value: string; label: string };
type Feature = { icon: React.ElementType; title: string; description: string };
type Category = { name: string; count: string; image: string };

// --- Helper Components ---

// Mandatory AnimatedElement for scroll reveals using IntersectionObserver
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string; // CSS delay class
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`reveal-trigger ${className || ''} ${delay || ''}`}>
      {children}
    </div>
  );
};

// Marquee Component for Stats
const Marquee: React.FC<{ items: Stat[] }> = ({ items }) => {
  return (
    <div className="w-full overflow-hidden bg-secondary py-6 border-y border-primary/20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items, ...items].map((stat, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="font-heading text-4xl text-background mr-4">{stat.value}</span>
            <span className="font-paragraph text-sm text-highlightyellow uppercase tracking-widest">{stat.label}</span>
            <span className="ml-8 text-primary text-2xl">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sticky Section Component
const StickyFeature: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  return (
    <div className="sticky top-32 mb-24 last:mb-0 p-8 bg-background border-t-2 border-secondary/10 shadow-sm min-h-[300px] flex flex-col justify-between group hover:bg-highlightyellow/10 transition-colors duration-500">
      <div className="flex justify-between items-start">
        <span className="font-heading text-6xl text-secondary/10 group-hover:text-primary/20 transition-colors">0{index + 1}</span>
        <div className="p-4 bg-primary text-primary-foreground rounded-full">
          <feature.icon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <h3 className="font-heading text-3xl text-secondary mb-4">{feature.title}</h3>
        <p className="font-paragraph text-lg text-secondary/80 max-w-md">{feature.description}</p>
      </div>
    </div>
  );
};

export default function HomePage() {
  // --- Canonical Data Sources ---
  const stats: Stat[] = [
    { value: '10K+', label: 'Active Jobs' },
    { value: '50K+', label: 'Job Seekers' },
    { value: '5K+', label: 'Employers' },
    { value: '98%', label: 'Success Rate' },
  ];

  const features: Feature[] = [
    {
      icon: MapPin,
      title: 'Location-Based Matching',
      description: 'Find jobs near you with our advanced location-based search and filtering system.',
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work on your schedule with hourly and daily job opportunities that fit your lifestyle.',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Verified profiles, secure payments, and comprehensive rating system for peace of mind.',
    },
    {
      icon: DollarSign,
      title: 'Fair Pricing',
      description: 'Transparent pricing with only 5% commission. Keep more of what you earn.',
    },
  ];

  const categories: Category[] = [
    { name: 'Retail & Sales', count: '2,500+ jobs', image: 'https://static.wixstatic.com/media/450908_b584968ba06d49f3aedc9263829abf47~mv2.png?originWidth=448&originHeight=640' },
    { name: 'Food Service', count: '1,800+ jobs', image: 'https://static.wixstatic.com/media/450908_e58afb8e22954dd3bf113c8dfa168bb1~mv2.png?originWidth=448&originHeight=640' },
    { name: 'Tutoring', count: '1,200+ jobs', image: 'https://static.wixstatic.com/media/450908_caec1351767a4e4f89f8c0a0a266655b~mv2.png?originWidth=448&originHeight=640' },
    { name: 'Delivery', count: '3,000+ jobs', image: 'https://static.wixstatic.com/media/450908_aea947cd7e4743d9873ec88ce46d12a7~mv2.png?originWidth=448&originHeight=640' },
  ];

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-secondary overflow-clip selection:bg-primary selection:text-white">
      <style>{`
        .reveal-trigger {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-trigger.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .clip-arch {
          clip-path: ellipse(80% 100% at 50% 100%);
        }
        .clip-arch-inverted {
          clip-path: ellipse(80% 100% at 50% 0%);
        }
      `}</style>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <Header />

      {/* HERO SECTION - Replicating Structure of Inspiration Image */}
      <section className="relative w-full pt-24 pb-0 overflow-hidden bg-background flex flex-col">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
          
          {/* 1. Massive Typographic Header (Like AVANTI CENTER) */}
          <div className="w-full text-center border-b-2 border-secondary mb-4">
            <h1 className="font-heading text-[12vw] leading-[0.8] tracking-tighter text-secondary uppercase w-full text-justify">
              HYPER<span className="text-primary">LOCAL</span>
            </h1>
          </div>

          {/* 2. Navigation/Links Row (Like HOME EVENTS...) */}
          <div className="w-full flex justify-between items-center py-4 mb-12 border-b border-secondary/20">
            <Link to="/find-jobs" className="group flex items-center gap-2">
              <span className="font-heading text-xl sm:text-3xl uppercase group-hover:text-primary transition-colors">Find Jobs</span>
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </Link>
            <Link to="/post-job" className="group flex items-center gap-2">
              <span className="font-heading text-xl sm:text-3xl uppercase group-hover:text-primary transition-colors">Post a Job</span>
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </Link>
            <Link to="/how-it-works" className="hidden sm:flex group items-center gap-2">
              <span className="font-heading text-xl sm:text-3xl uppercase group-hover:text-primary transition-colors">How It Works</span>
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
            </Link>
          </div>

          {/* 3. Graphic Area (Arches Motif) */}
          <div className="relative w-full h-[60vh] lg:h-[75vh] grid grid-cols-3 gap-4 items-end">
            {/* Left Arch */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-[80%] bg-secondary clip-arch relative overflow-hidden hidden md:block"
            >
               <div className="absolute inset-0 bg-secondary/20 z-10" />
               <Image 
                 src="https://static.wixstatic.com/media/450908_235e9430dfeb467b813adb321e02bea5~mv2.png?originWidth=1152&originHeight=640"
                 alt="Worker detail"
                 className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                 width={600}
               />
            </motion.div>

            {/* Center Main Arch */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-3 md:col-span-1 h-full bg-highlightyellow clip-arch relative overflow-hidden group"
            >
              <Image 
                src="https://static.wixstatic.com/media/450908_405d7eff3e604c5e8ac52034977efd85~mv2.png?originWidth=1152&originHeight=640"
                alt="Local workers collaborating"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                width={1200}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-20">
                <p className="font-heading text-secondary text-2xl uppercase tracking-widest mb-2">Connect Instantly</p>
                <div className="w-12 h-1 bg-secondary mx-auto" />
              </div>
            </motion.div>

            {/* Right Arch */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[80%] bg-primary clip-arch relative overflow-hidden hidden md:block"
            >
              <div className="absolute inset-0 bg-primary/20 z-10" />
               <Image 
                 src="https://static.wixstatic.com/media/450908_758e1573cc1c4296b3309e6aa02a819f~mv2.png?originWidth=1152&originHeight=640"
                 alt="Worker detail"
                 className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                 width={600}
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS MARQUEE */}
      <section className="w-full z-20 relative -mt-4">
        <Marquee items={stats} />
      </section>

      {/* EDITORIAL INTRO */}
      <section className="w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <AnimatedElement>
                <h2 className="font-heading text-5xl lg:text-7xl text-secondary leading-[0.9]">
                  THE NEW<br />
                  STANDARD<br />
                  FOR GIGS.
                </h2>
              </AnimatedElement>
            </div>
            <div className="lg:col-span-8 flex flex-col justify-between">
              <AnimatedElement delay="delay-100">
                <p className="font-paragraph text-2xl lg:text-3xl text-secondary/80 leading-relaxed indent-24">
                  We are redefining how local communities work together. By connecting students and job seekers with immediate opportunities, we create a fluid, dynamic marketplace where talent meets demand instantly. No barriers, just work.
                </p>
              </AnimatedElement>
              <AnimatedElement delay="delay-200" className="mt-12">
                <div className="h-px w-full bg-secondary/20 mb-8" />
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="font-heading text-lg text-primary">LOCATION</span>
                    <span className="font-paragraph text-secondary">Hyper-Local Focus</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-lg text-primary">SPEED</span>
                    <span className="font-paragraph text-secondary">Instant Matching</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-lg text-primary">TRUST</span>
                    <span className="font-paragraph text-secondary">Verified Users</span>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - ARCH GRID */}
      <section className="w-full py-24 bg-secondary text-background overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            <AnimatedElement>
              <h2 className="font-heading text-6xl lg:text-8xl text-background">
                SECTORS
              </h2>
            </AnimatedElement>
            <AnimatedElement delay="delay-100">
              <Link to="/find-jobs">
                <Button variant="outline" className="text-background border-background hover:bg-background hover:text-secondary rounded-full px-8 py-6 font-heading text-lg">
                  VIEW ALL CATEGORIES
                </Button>
              </Link>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <AnimatedElement key={index} delay={`delay-${(index + 1) * 100}`}>
                <Link to="/find-jobs" className="group block">
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden clip-arch bg-highlightyellow">
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={500}
                    />
                    <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-secondary/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-heading text-white text-lg">Explore {category.name}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-background/20 pb-2 group-hover:border-highlightyellow transition-colors">
                    <h3 className="font-heading text-2xl text-background">{category.name}</h3>
                    <span className="font-paragraph text-sm text-highlightyellow">{category.count}</span>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - STICKY SCROLL */}
      <section className="w-full py-32 bg-background relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sticky Left Side */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <AnimatedElement>
                  <span className="font-heading text-primary text-xl tracking-widest mb-4 block">WHY CHOOSE US</span>
                  <h2 className="font-heading text-6xl lg:text-7xl text-secondary mb-8 leading-none">
                    BUILT FOR<br />
                    THE MODERN<br />
                    WORKFORCE.
                  </h2>
                  <p className="font-paragraph text-xl text-secondary/70 mb-12 max-w-md">
                    We've stripped away the complexity of traditional hiring. Our platform is engineered for speed, trust, and flexibility.
                  </p>
                  <Link to="/how-it-works">
                    <Button size="lg" className="rounded-none font-heading text-lg px-10 py-8 bg-secondary text-background hover:bg-primary">
                      LEARN MORE
                    </Button>
                  </Link>
                </AnimatedElement>
              </div>
            </div>

            {/* Scrolling Right Side */}
            <div className="lg:col-span-7 pt-12 lg:pt-0">
              {features.map((feature, index) => (
                <AnimatedElement key={index} delay="delay-100">
                  <StickyFeature feature={feature} index={index} />
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - HORIZONTAL FLOW */}
      <section className="w-full py-32 bg-highlightyellow overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="mb-20 text-center">
            <AnimatedElement>
              <h2 className="font-heading text-6xl lg:text-8xl text-secondary mb-6">SIMPLE STEPS</h2>
            </AnimatedElement>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t-2 border-b-2 border-secondary">
            {[
              { step: '01', title: 'Create Profile', desc: 'Sign up and build your professional identity in minutes.' },
              { step: '02', title: 'Search & Apply', desc: 'Browse local opportunities and apply with a single click.' },
              { step: '03', title: 'Work & Earn', desc: 'Complete the job and get paid securely through the platform.' }
            ].map((item, i) => (
              <div key={i} className={`group relative p-12 border-r-2 border-secondary last:border-r-0 hover:bg-secondary transition-colors duration-500`}>
                <AnimatedElement delay={`delay-${i * 100}`}>
                  <span className="font-heading text-7xl text-secondary/20 group-hover:text-highlightyellow/20 transition-colors absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="relative z-10 mt-12">
                    <h3 className="font-heading text-3xl text-secondary group-hover:text-highlightyellow mb-4 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-paragraph text-lg text-secondary/80 group-hover:text-highlightyellow/80 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-12 flex justify-end">
                    <div className="w-12 h-12 rounded-full border border-secondary group-hover:border-highlightyellow flex items-center justify-center transition-colors">
                      <ArrowRight className="w-5 h-5 text-secondary group-hover:text-highlightyellow" />
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - FULL BLEED */}
      <section className="w-full py-40 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Image 
             src="https://static.wixstatic.com/media/450908_0cf0ae1eef204aa388faf8d7e8e669f1~mv2.png?originWidth=1920&originHeight=1024"
             alt="Pattern"
             className="w-full h-full object-cover"
             width={1920}
           />
        </div>
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10 text-center">
          <AnimatedElement>
            <h2 className="font-heading text-[10vw] leading-[0.8] text-white mb-8">
              START NOW
            </h2>
            <p className="font-paragraph text-2xl text-white/90 max-w-2xl mx-auto mb-16">
              Join the fastest growing local job marketplace. Whether you're hiring or looking for work, your next opportunity is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/find-jobs">
                <Button size="lg" className="bg-white text-primary hover:bg-highlightyellow hover:text-secondary font-heading text-xl px-12 py-8 h-auto rounded-full transition-all duration-300 transform hover:scale-105">
                  FIND JOBS
                </Button>
              </Link>
              <Link to="/post-job">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-heading text-xl px-12 py-8 h-auto rounded-full bg-transparent transition-all duration-300">
                  POST A JOB
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}