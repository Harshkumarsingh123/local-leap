import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    messageContent: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submission: ContactSubmissions = {
      _id: crypto.randomUUID(),
      senderName: formData.senderName,
      senderEmail: formData.senderEmail,
      subject: formData.subject,
      messageContent: formData.messageContent,
      submissionDateTime: new Date().toISOString(),
      status: 'New',
    };

    await BaseCrudService.create('contactsubmissions', submission);
    setSubmitted(true);
    setSubmitting(false);
    setFormData({ senderName: '', senderEmail: '', subject: '', messageContent: '' });
  };

  const isFormValid = () => {
    return (
      formData.senderName.trim() &&
      formData.senderEmail.trim() &&
      formData.subject.trim() &&
      formData.messageContent.trim()
    );
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@localwork.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: '24/7 support available',
    },
    {
      icon: MapPin,
      title: 'Office',
      content: '123 Main Street, Seattle, WA',
      description: 'Visit us during business hours',
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
              CONTACT US
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Have questions or need support? We're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="w-full py-16 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 text-center border-2 border-secondary/10 h-full">
                  <div className="w-16 h-16 bg-primary mx-auto mb-6 flex items-center justify-center">
                    <info.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl text-secondary mb-2">{info.title}</h3>
                  <p className="font-heading text-lg text-primary mb-2">{info.content}</p>
                  <p className="font-paragraph text-sm text-secondary/70">{info.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
                SEND US A MESSAGE
              </h2>
              <p className="font-paragraph text-lg text-secondary/70">
                Fill out the form below and our team will respond within 24 hours.
              </p>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <Card className="p-8 bg-highlightyellow border-2 border-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-secondary mb-1">
                        MESSAGE SENT SUCCESSFULLY!
                      </h3>
                      <p className="font-paragraph text-sm text-secondary/70">
                        We've received your message and will get back to you soon.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <Card className="p-8 lg:p-12 border-2 border-secondary/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-highlightyellow flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading text-2xl text-secondary">CONTACT FORM</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="senderName" className="font-heading text-sm text-secondary mb-2">
                      YOUR NAME *
                    </Label>
                    <Input
                      id="senderName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.senderName}
                      onChange={(e) => handleChange('senderName', e.target.value)}
                      className="font-paragraph h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="senderEmail" className="font-heading text-sm text-secondary mb-2">
                      YOUR EMAIL *
                    </Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.senderEmail}
                      onChange={(e) => handleChange('senderEmail', e.target.value)}
                      className="font-paragraph h-12"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <Label htmlFor="subject" className="font-heading text-sm text-secondary mb-2">
                    SUBJECT *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="font-paragraph h-12"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="messageContent" className="font-heading text-sm text-secondary mb-2">
                    MESSAGE *
                  </Label>
                  <Textarea
                    id="messageContent"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.messageContent}
                    onChange={(e) => handleChange('messageContent', e.target.value)}
                    rows={8}
                    className="font-paragraph"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t-2 border-secondary/10">
                  <Button
                    type="submit"
                    disabled={submitting || !isFormValid()}
                    className="w-full font-heading text-base h-14"
                  >
                    {submitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl lg:text-6xl text-secondary mb-6">
              QUICK ANSWERS
            </h2>
            <p className="font-paragraph text-lg text-secondary/80 max-w-2xl mx-auto">
              Looking for immediate help? Check out these common questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2 border-secondary/20">
              <h3 className="font-heading text-xl text-secondary mb-3">
                How do I reset my password?
              </h3>
              <p className="font-paragraph text-sm text-secondary/70">
                Click on "Forgot Password" on the login page and follow the instructions sent to your email.
              </p>
            </Card>

            <Card className="p-8 border-2 border-secondary/20">
              <h3 className="font-heading text-xl text-secondary mb-3">
                How long does verification take?
              </h3>
              <p className="font-paragraph text-sm text-secondary/70">
                Profile verification typically takes 24-48 hours. You'll receive an email once approved.
              </p>
            </Card>

            <Card className="p-8 border-2 border-secondary/20">
              <h3 className="font-heading text-xl text-secondary mb-3">
                What are your support hours?
              </h3>
              <p className="font-paragraph text-sm text-secondary/70">
                Our support team is available 24/7 via email and phone for urgent matters.
              </p>
            </Card>

            <Card className="p-8 border-2 border-secondary/20">
              <h3 className="font-heading text-xl text-secondary mb-3">
                How do I report a problem?
              </h3>
              <p className="font-paragraph text-sm text-secondary/70">
                Use the contact form above or email safety@localwork.com for immediate assistance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
