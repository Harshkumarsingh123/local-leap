import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserPlus, Search, MessageSquare, CheckCircle, Shield, DollarSign, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorksPage() {
  const jobSeekerSteps = [
    {
      icon: UserPlus,
      title: 'Sign Up & Create Profile',
      description: 'Register for free and build your professional profile. Add your skills, experience, availability, and location to attract the right opportunities.',
    },
    {
      icon: Search,
      title: 'Browse & Filter Jobs',
      description: 'Search thousands of local part-time jobs. Use our advanced filters to find positions that match your location, schedule, and skill set.',
    },
    {
      icon: MessageSquare,
      title: 'Apply & Connect',
      description: 'Submit applications with one click. Chat directly with employers through our secure in-app messaging system to discuss details.',
    },
    {
      icon: CheckCircle,
      title: 'Work & Get Paid',
      description: 'Complete the job, receive ratings, and get paid securely through our platform. Build your reputation with verified reviews.',
    },
  ];

  const employerSteps = [
    {
      icon: UserPlus,
      title: 'Create Employer Account',
      description: 'Sign up as a job provider and verify your business. Set up your company profile to attract quality candidates.',
    },
    {
      icon: Search,
      title: 'Post Job Listings',
      description: 'Create detailed job postings with requirements, pay rates, and schedules. Our platform helps you reach local talent instantly.',
    },
    {
      icon: MessageSquare,
      title: 'Review & Hire',
      description: 'Browse applications, review candidate profiles and ratings, then connect with your top choices through in-app chat.',
    },
    {
      icon: CheckCircle,
      title: 'Manage & Pay',
      description: 'Track job completion, rate workers, and process payments securely. Build a reliable team for future opportunities.',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Verified profiles, secure payments, and comprehensive rating system ensure safe transactions for everyone.',
    },
    {
      icon: DollarSign,
      title: 'Fair Pricing',
      description: 'Only 5% commission on completed jobs. Transparent pricing with no hidden fees or surprise charges.',
    },
    {
      icon: Star,
      title: 'Rating System',
      description: 'Build your reputation with verified reviews. Quality work leads to better opportunities and higher earnings.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Work on your terms. Choose hourly or daily jobs that fit your lifestyle and availability.',
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
              HOW IT WORKS
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Connecting local talent with opportunities has never been easier. Learn how our platform works for both job seekers and employers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Seeker Process */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              FOR JOB SEEKERS
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 max-w-2xl">
              Find flexible part-time work in your area with our simple four-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {jobSeekerSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-highlightyellow flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-heading text-4xl text-primary">0{index + 1}</span>
                    <h3 className="font-heading text-2xl text-secondary">{step.title}</h3>
                  </div>
                  <p className="font-paragraph text-secondary/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/find-jobs">
              <Button size="lg" className="font-heading text-base px-10 py-7 h-auto">
                START FINDING JOBS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <section className="w-full h-96 bg-secondary relative overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/450908_2092abfacacc4a369136a0f5a670b609~mv2.png?originWidth=1600&originHeight=512"
          alt="People working together"
          className="w-full h-full object-cover opacity-40"
          width={1600}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-heading text-5xl lg:text-7xl text-secondary-foreground text-center px-6">
            SIMPLE. SECURE. EFFECTIVE.
          </h2>
        </div>
      </section>

      {/* Employer Process */}
      <section className="w-full py-24 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              FOR EMPLOYERS
            </h2>
            <p className="font-paragraph text-lg text-secondary/80 max-w-2xl">
              Hire skilled local workers quickly and efficiently with our streamlined hiring process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {employerSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-heading text-4xl text-primary">0{index + 1}</span>
                    <h3 className="font-heading text-2xl text-secondary">{step.title}</h3>
                  </div>
                  <p className="font-paragraph text-secondary/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/post-job">
              <Button size="lg" className="font-heading text-base px-10 py-7 h-auto">
                POST YOUR FIRST JOB
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              PLATFORM BENEFITS
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
              Built with features that prioritize trust, transparency, and user success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary mx-auto mb-6 flex items-center justify-center">
                  <benefit.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl text-secondary mb-4">{benefit.title}</h3>
                <p className="font-paragraph text-sm text-secondary/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-5xl lg:text-6xl text-secondary-foreground mb-6">
                READY TO START?
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground/90 mb-8">
                Join our growing community of job seekers and employers. Create your account today and experience the future of local hiring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/find-jobs">
                  <Button size="lg" className="font-heading text-base px-8 py-6 h-auto">
                    FIND JOBS
                  </Button>
                </Link>
                <Link to="/post-job">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-heading text-base px-8 py-6 h-auto bg-transparent text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                  >
                    POST A JOB
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-highlightyellow h-96 relative overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/450908_0d3fc020f6de401d94bad6293c2b1caf~mv2.png?originWidth=640&originHeight=512"
                alt="Community of workers"
                className="w-full h-full object-cover"
                width={700}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
