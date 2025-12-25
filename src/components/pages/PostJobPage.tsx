import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { JobListings } from '@/entities';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { CheckCircle, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function PostJobPageContent() {
  const { member } = useMember();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    location: '',
    hourlyRate: '',
    jobType: '',
    requiredSkills: '',
    applicationDeadline: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const job: JobListings = {
      _id: crypto.randomUUID(),
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      location: formData.location,
      hourlyRate: parseFloat(formData.hourlyRate),
      jobType: formData.jobType,
      requiredSkills: formData.requiredSkills,
      datePosted: new Date().toISOString(),
      applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline).toISOString() : undefined,
    };

    await BaseCrudService.create('joblistings', job);
    setSubmitted(true);
    setSubmitting(false);

    setTimeout(() => {
      navigate('/find-jobs');
    }, 3000);
  };

  const isFormValid = () => {
    return (
      formData.jobTitle.trim() &&
      formData.jobDescription.trim() &&
      formData.location.trim() &&
      formData.hourlyRate &&
      formData.jobType
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-primary-foreground mb-6">
              POST A JOB
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl">
              Connect with qualified local talent. Create your job listing and start receiving applications from skilled workers in your area.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-12 text-center border-2 border-primary">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="font-heading text-4xl text-secondary mb-4">
                  JOB POSTED SUCCESSFULLY!
                </h2>
                <p className="font-paragraph text-lg text-secondary/70 mb-6">
                  Your job listing is now live. You'll start receiving applications from qualified candidates soon.
                </p>
                <p className="font-paragraph text-sm text-secondary/60">
                  Redirecting to job listings...
                </p>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 lg:p-12 border-2 border-secondary/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-highlightyellow flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="font-heading text-3xl text-secondary">JOB DETAILS</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Job Title */}
                  <div>
                    <Label htmlFor="jobTitle" className="font-heading text-sm text-secondary mb-2">
                      JOB TITLE *
                    </Label>
                    <Input
                      id="jobTitle"
                      type="text"
                      placeholder="e.g., Retail Sales Associate"
                      value={formData.jobTitle}
                      onChange={(e) => handleChange('jobTitle', e.target.value)}
                      className="font-paragraph h-12"
                      required
                    />
                  </div>

                  {/* Job Description */}
                  <div>
                    <Label htmlFor="jobDescription" className="font-heading text-sm text-secondary mb-2">
                      JOB DESCRIPTION *
                    </Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Describe the job responsibilities, requirements, and what makes this opportunity great..."
                      value={formData.jobDescription}
                      onChange={(e) => handleChange('jobDescription', e.target.value)}
                      rows={8}
                      className="font-paragraph"
                      required
                    />
                  </div>

                  {/* Location and Hourly Rate */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="location" className="font-heading text-sm text-secondary mb-2">
                        LOCATION *
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="e.g., Downtown Seattle"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="font-paragraph h-12"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="hourlyRate" className="font-heading text-sm text-secondary mb-2">
                        HOURLY RATE ($) *
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 18.50"
                        value={formData.hourlyRate}
                        onChange={(e) => handleChange('hourlyRate', e.target.value)}
                        className="font-paragraph h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Job Type and Deadline */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="jobType" className="font-heading text-sm text-secondary mb-2">
                        JOB TYPE *
                      </Label>
                      <Select value={formData.jobType} onValueChange={(value) => handleChange('jobType', value)}>
                        <SelectTrigger className="h-12 font-paragraph">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Part-Time">Part-Time</SelectItem>
                          <SelectItem value="Hourly">Hourly</SelectItem>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Temporary">Temporary</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="applicationDeadline" className="font-heading text-sm text-secondary mb-2">
                        APPLICATION DEADLINE
                      </Label>
                      <Input
                        id="applicationDeadline"
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) => handleChange('applicationDeadline', e.target.value)}
                        className="font-paragraph h-12"
                      />
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <Label htmlFor="requiredSkills" className="font-heading text-sm text-secondary mb-2">
                      REQUIRED SKILLS
                    </Label>
                    <Textarea
                      id="requiredSkills"
                      placeholder="List the skills and qualifications needed for this position..."
                      value={formData.requiredSkills}
                      onChange={(e) => handleChange('requiredSkills', e.target.value)}
                      rows={4}
                      className="font-paragraph"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t-2 border-secondary/10">
                    <Button
                      type="submit"
                      disabled={submitting || !isFormValid()}
                      className="w-full font-heading text-base h-14"
                    >
                      {submitting ? 'POSTING JOB...' : 'POST JOB LISTING'}
                    </Button>
                    <p className="font-paragraph text-xs text-secondary/60 mt-4 text-center">
                      * Required fields. A 5% commission applies to completed jobs.
                    </p>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      {!submitted && (
        <section className="w-full py-16 bg-highlightyellow">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-heading text-2xl text-secondary mb-3">REACH LOCAL TALENT</h3>
                <p className="font-paragraph text-secondary/80">
                  Your job will be visible to thousands of qualified job seekers in your area.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-heading text-2xl text-secondary mb-3">ONLY 5% COMMISSION</h3>
                <p className="font-paragraph text-secondary/80">
                  Fair and transparent pricing. Pay only when you successfully hire.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-heading text-2xl text-secondary mb-3">VERIFIED CANDIDATES</h3>
                <p className="font-paragraph text-secondary/80">
                  Review ratings, profiles, and work history before making your decision.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default function PostJobPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to post a job listing">
      <PostJobPageContent />
    </MemberProtectedRoute>
  );
}
