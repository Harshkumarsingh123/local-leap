import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { JobListings, JobApplications } from '@/entities';
import { useMember } from '@/integrations';
import { MapPin, DollarSign, Clock, Calendar, Briefcase, FileText, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { member, isAuthenticated } = useMember();
  const [job, setJob] = useState<JobListings | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const loadJob = async () => {
    if (!id) return;
    setLoading(true);
    const jobData = await BaseCrudService.getById<JobListings>('joblistings', id);
    setJob(jobData);
    setLoading(false);
  };

  const handleApply = async () => {
    if (!id || !isAuthenticated) return;

    setApplying(true);
    const application: JobApplications = {
      _id: crypto.randomUUID(),
      jobListingId: id,
      applicantId: member?.id || '',
      applicationDate: new Date().toISOString(),
      status: 'Pending',
      coverLetter: coverLetter,
    };

    await BaseCrudService.create('jobapplications', application);
    setApplicationSubmitted(true);
    setApplying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-20 text-center">
          <h2 className="font-heading text-3xl text-secondary mb-4">Job not found</h2>
          <Link to="/find-jobs">
            <Button className="font-heading">BACK TO JOBS</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="w-full bg-highlightyellow py-6">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Link to="/find-jobs" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-paragraph">Back to all jobs</span>
          </Link>
        </div>
      </section>

      {/* Job Details */}
      <section className="w-full py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {job.jobImage && (
                  <div className="w-full h-96 bg-secondary mb-8 overflow-hidden">
                    <Image src={job.jobImage} alt={job.jobTitle || 'Job image'} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="font-heading text-4xl lg:text-5xl text-secondary mb-4">
                      {job.jobTitle}
                    </h1>
                    {job.jobType && (
                      <Badge variant="secondary" className="text-base px-4 py-1">
                        {job.jobType}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {job.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-highlightyellow flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-xs text-secondary/60">Location</p>
                        <p className="font-heading text-lg text-secondary">{job.location}</p>
                      </div>
                    </div>
                  )}
                  {job.hourlyRate && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-highlightyellow flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-xs text-secondary/60">Hourly Rate</p>
                        <p className="font-heading text-lg text-secondary">${job.hourlyRate}/hour</p>
                      </div>
                    </div>
                  )}
                  {job.datePosted && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-highlightyellow flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-xs text-secondary/60">Posted</p>
                        <p className="font-heading text-lg text-secondary">
                          {format(new Date(job.datePosted), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  )}
                  {job.applicationDeadline && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-highlightyellow flex items-center justify-center">
                        <Clock className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-xs text-secondary/60">Deadline</p>
                        <p className="font-heading text-lg text-secondary">
                          {format(new Date(job.applicationDeadline), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-secondary/10 pt-8 mb-8">
                  <h2 className="font-heading text-3xl text-secondary mb-4">JOB DESCRIPTION</h2>
                  <p className="font-paragraph text-secondary/80 leading-relaxed whitespace-pre-line">
                    {job.jobDescription}
                  </p>
                </div>

                {job.requiredSkills && (
                  <div className="border-t-2 border-secondary/10 pt-8 mb-8">
                    <h2 className="font-heading text-3xl text-secondary mb-4">REQUIRED SKILLS</h2>
                    <p className="font-paragraph text-secondary/80 leading-relaxed">
                      {job.requiredSkills}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar - Application */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-8 border-2 border-secondary/10 sticky top-24">
                  {applicationSubmitted ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-heading text-2xl text-secondary mb-3">
                        APPLICATION SUBMITTED
                      </h3>
                      <p className="font-paragraph text-secondary/70 mb-6">
                        Your application has been sent successfully. The employer will review it and contact you soon.
                      </p>
                      <Link to="/find-jobs">
                        <Button variant="outline" className="w-full font-heading">
                          BROWSE MORE JOBS
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-heading text-2xl text-secondary mb-6">APPLY FOR THIS JOB</h3>
                      
                      {!isAuthenticated ? (
                        <div>
                          <p className="font-paragraph text-secondary/70 mb-6">
                            You need to be logged in to apply for this job.
                          </p>
                          <Link to="/profile">
                            <Button className="w-full font-heading mb-3">SIGN IN TO APPLY</Button>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <div className="mb-6">
                            <label className="font-heading text-sm text-secondary mb-2 block">
                              COVER LETTER
                            </label>
                            <Textarea
                              placeholder="Tell the employer why you're a great fit for this position..."
                              value={coverLetter}
                              onChange={(e) => setCoverLetter(e.target.value)}
                              rows={8}
                              className="font-paragraph"
                            />
                          </div>

                          <Button
                            onClick={handleApply}
                            disabled={applying || !coverLetter.trim()}
                            className="w-full font-heading"
                          >
                            {applying ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                          </Button>

                          <p className="font-paragraph text-xs text-secondary/60 mt-4 text-center">
                            By applying, you agree to our terms and conditions
                          </p>
                        </>
                      )}
                    </>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs CTA */}
      <section className="w-full py-16 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl text-secondary mb-6">
            EXPLORE MORE OPPORTUNITIES
          </h2>
          <p className="font-paragraph text-lg text-secondary/80 mb-8 max-w-2xl mx-auto">
            Browse thousands of other local jobs that match your skills and availability.
          </p>
          <Link to="/find-jobs">
            <Button size="lg" className="font-heading text-base px-10 py-7 h-auto">
              VIEW ALL JOBS
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
