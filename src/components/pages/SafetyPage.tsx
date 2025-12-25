import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Shield, Lock, UserCheck, AlertCircle, MessageSquare, Star, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SafetyPage() {
  const safetyFeatures = [
    {
      icon: UserCheck,
      title: 'Verified Profiles',
      description: 'All users undergo identity verification. We validate email addresses, phone numbers, and require profile completion before platform access.',
    },
    {
      icon: Star,
      title: 'Rating System',
      description: 'Comprehensive two-way rating system allows both employers and workers to rate each other, building trust through transparency.',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'All transactions are processed through encrypted, PCI-compliant payment systems. Funds are held securely until job completion.',
    },
    {
      icon: MessageSquare,
      title: 'In-App Communication',
      description: 'Keep all conversations on platform. Our messaging system protects your privacy and provides a record of all interactions.',
    },
    {
      icon: AlertCircle,
      title: 'Dispute Resolution',
      description: 'Dedicated support team available to mediate disputes and ensure fair outcomes for all parties involved.',
    },
    {
      icon: FileText,
      title: 'Background Checks',
      description: 'Optional background check services available for employers who want additional verification of candidates.',
    },
  ];

  const guidelines = [
    {
      title: 'For Job Seekers',
      tips: [
        'Always communicate through the platform messaging system',
        'Research the employer and read their ratings before applying',
        'Never share personal banking information outside the platform',
        'Report suspicious job postings or requests immediately',
        'Meet in public places for initial interviews when possible',
        'Trust your instincts - if something feels wrong, it probably is',
      ],
    },
    {
      title: 'For Employers',
      tips: [
        'Review candidate profiles, ratings, and work history thoroughly',
        'Conduct interviews before making hiring decisions',
        'Use the platform payment system for all transactions',
        'Provide clear job descriptions and expectations upfront',
        'Report any suspicious behavior or policy violations',
        'Leave honest ratings to help the community',
      ],
    },
  ];

  const trustIndicators = [
    { label: 'Verified Users', value: '50K+' },
    { label: 'Background Checks', value: '15K+' },
    { label: 'Successful Jobs', value: '100K+' },
    { label: 'Average Rating', value: '4.8/5' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-primary-foreground mx-auto mb-8 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading text-6xl lg:text-8xl text-primary-foreground mb-8">
              SAFETY & TRUST
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Your safety is our priority. We've built comprehensive systems to ensure secure, trustworthy connections between job seekers and employers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="w-full py-16 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-heading text-5xl text-secondary mb-2">{indicator.value}</h3>
                <p className="font-paragraph text-sm text-secondary/70">{indicator.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              SAFETY FEATURES
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
              Multiple layers of protection to keep our community safe and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 border-2 border-secondary/10 h-full">
                  <div className="w-16 h-16 bg-highlightyellow flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-heading text-xl text-secondary mb-4">{feature.title}</h3>
                  <p className="font-paragraph text-sm text-secondary/70">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="w-full py-24 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              SAFETY GUIDELINES
            </h2>
            <p className="font-paragraph text-lg text-secondary/80 max-w-2xl mx-auto">
              Best practices to help you stay safe while using our platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {guidelines.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 border-2 border-secondary/20 h-full">
                  <h3 className="font-heading text-3xl text-secondary mb-6">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="font-paragraph text-secondary/80">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report & Support */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
                REPORT CONCERNS
              </h2>
              <p className="font-paragraph text-lg text-secondary/70 mb-8">
                If you encounter suspicious activity, policy violations, or feel unsafe, our support team is here to help 24/7.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-secondary mb-2">Immediate Response</h4>
                    <p className="font-paragraph text-sm text-secondary/70">
                      Our team reviews all reports within 24 hours and takes appropriate action.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-secondary mb-2">Confidential</h4>
                    <p className="font-paragraph text-sm text-secondary/70">
                      All reports are handled confidentially to protect your privacy.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-10 border-2 border-primary bg-highlightyellow">
                <h3 className="font-heading text-3xl text-secondary mb-6">CONTACT SUPPORT</h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-heading text-sm text-secondary/60 mb-2">EMAIL</p>
                    <p className="font-paragraph text-lg text-secondary">safety@localwork.com</p>
                  </div>
                  <div>
                    <p className="font-heading text-sm text-secondary/60 mb-2">PHONE</p>
                    <p className="font-paragraph text-lg text-secondary">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="font-heading text-sm text-secondary/60 mb-2">HOURS</p>
                    <p className="font-paragraph text-lg text-secondary">24/7 Support Available</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Standards */}
      <section className="w-full py-24 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-5xl lg:text-7xl text-secondary-foreground mb-8">
            COMMUNITY STANDARDS
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/90 mb-12 max-w-3xl mx-auto">
            We maintain a zero-tolerance policy for harassment, discrimination, fraud, or any behavior that compromises the safety and integrity of our community.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-heading text-2xl text-secondary-foreground mb-3">RESPECT</h3>
              <p className="font-paragraph text-secondary-foreground/80">
                Treat all users with dignity and professionalism
              </p>
            </div>
            <div>
              <h3 className="font-heading text-2xl text-secondary-foreground mb-3">HONESTY</h3>
              <p className="font-paragraph text-secondary-foreground/80">
                Provide accurate information in all interactions
              </p>
            </div>
            <div>
              <h3 className="font-heading text-2xl text-secondary-foreground mb-3">ACCOUNTABILITY</h3>
              <p className="font-paragraph text-secondary-foreground/80">
                Follow through on commitments and agreements
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
