import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Check, DollarSign, Users, Briefcase, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const features = [
    'Unlimited job postings',
    'Access to verified candidates',
    'In-app messaging system',
    'Secure payment processing',
    'Rating and review system',
    'Location-based matching',
    'Mobile-responsive interface',
    'Customer support',
  ];

  const faqs = [
    {
      question: 'How does the 5% commission work?',
      answer: 'We charge a 5% commission only on completed jobs. This fee is automatically calculated and deducted from the payment when the job is marked as complete. There are no upfront costs or hidden fees.',
    },
    {
      question: 'When do I pay the commission?',
      answer: 'The commission is deducted automatically when payment is processed after job completion. You only pay when you successfully hire and complete a job.',
    },
    {
      question: 'Are there any subscription fees?',
      answer: 'No. LocalWork operates on a commission-only model. There are no monthly subscriptions, listing fees, or hidden charges. You only pay the 5% commission on completed jobs.',
    },
    {
      question: 'Can I post unlimited jobs?',
      answer: 'Yes! Both job seekers and employers can use the platform without limits. Post as many jobs as you need or apply to as many positions as you want.',
    },
    {
      question: 'How are payments processed?',
      answer: 'All payments are processed securely through our platform. Employers fund the job payment upfront, which is held securely until the job is completed and approved.',
    },
    {
      question: 'What if there is a dispute?',
      answer: 'Our support team is available to mediate disputes. We have a comprehensive rating system and dispute resolution process to ensure fair outcomes for all parties.',
    },
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
            <h1 className="font-heading text-6xl lg:text-8xl text-primary-foreground mb-8">
              SIMPLE PRICING
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              No hidden fees. No subscriptions. Just a fair 5% commission on completed jobs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-12 lg:p-16 border-4 border-primary text-center">
              <div className="w-20 h-20 bg-highlightyellow mx-auto mb-8 flex items-center justify-center">
                <DollarSign className="w-10 h-10 text-secondary" />
              </div>
              
              <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-4">
                5% COMMISSION
              </h2>
              <p className="font-paragraph text-xl text-secondary/70 mb-12">
                Only on completed jobs. No upfront costs.
              </p>

              <div className="bg-highlightyellow p-8 mb-12">
                <p className="font-heading text-2xl text-secondary mb-4">EXAMPLE CALCULATION</p>
                <div className="space-y-3 font-paragraph text-lg text-secondary/80">
                  <div className="flex justify-between items-center">
                    <span>Job Payment:</span>
                    <span className="font-heading">$200.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Platform Fee (5%):</span>
                    <span className="font-heading">$10.00</span>
                  </div>
                  <div className="border-t-2 border-secondary/20 pt-3 flex justify-between items-center">
                    <span className="font-heading">Worker Receives:</span>
                    <span className="font-heading text-2xl text-primary">$190.00</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-left">
                    <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-paragraph text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/find-jobs">
                  <Button size="lg" className="font-heading text-base px-10 py-7 h-auto">
                    FIND JOBS
                  </Button>
                </Link>
                <Link to="/post-job">
                  <Button size="lg" variant="outline" className="font-heading text-base px-10 py-7 h-auto">
                    POST A JOB
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-24 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              WHY OUR PRICING WORKS
            </h2>
            <p className="font-paragraph text-lg text-secondary/80 max-w-2xl mx-auto">
              Fair, transparent, and aligned with your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl text-secondary mb-4">NO RISK</h3>
              <p className="font-paragraph text-secondary/80">
                Start using the platform immediately with zero upfront investment. Only pay when you succeed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary mx-auto mb-6 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl text-secondary mb-4">TRANSPARENT</h3>
              <p className="font-paragraph text-secondary/80">
                No hidden fees or surprise charges. You always know exactly what you'll pay.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary mx-auto mb-6 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl text-secondary mb-4">FAIR VALUE</h3>
              <p className="font-paragraph text-secondary/80">
                Keep 95% of your earnings. Our low commission ensures you get the value you deserve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 border-2 border-secondary/10">
                  <h3 className="font-heading text-xl text-secondary mb-4">{faq.question}</h3>
                  <p className="font-paragraph text-secondary/70 leading-relaxed">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-5xl lg:text-7xl text-secondary-foreground mb-8">
            READY TO GET STARTED?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/90 mb-12 max-w-2xl mx-auto">
            Join thousands of users already benefiting from our fair and transparent pricing model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/find-jobs">
              <Button size="lg" className="font-heading text-base px-10 py-7 h-auto">
                FIND JOBS NOW
              </Button>
            </Link>
            <Link to="/post-job">
              <Button
                size="lg"
                variant="outline"
                className="font-heading text-base px-10 py-7 h-auto bg-transparent text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
              >
                POST A JOB
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
