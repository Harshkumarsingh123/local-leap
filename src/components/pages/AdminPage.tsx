import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { JobListings, JobApplications, ContactSubmissions, UserRatings } from '@/entities';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Briefcase, Users, MessageSquare, Star, TrendingUp, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

function AdminPageContent() {
  const { member } = useMember();
  const [jobs, setJobs] = useState<JobListings[]>([]);
  const [applications, setApplications] = useState<JobApplications[]>([]);
  const [contacts, setContacts] = useState<ContactSubmissions[]>([]);
  const [ratings, setRatings] = useState<UserRatings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [jobsData, appsData, contactsData, ratingsData] = await Promise.all([
      BaseCrudService.getAll<JobListings>('joblistings'),
      BaseCrudService.getAll<JobApplications>('jobapplications'),
      BaseCrudService.getAll<ContactSubmissions>('contactsubmissions'),
      BaseCrudService.getAll<UserRatings>('userratings'),
    ]);
    setJobs(jobsData.items);
    setApplications(appsData.items);
    setContacts(contactsData.items);
    setRatings(ratingsData.items);
    setLoading(false);
  };

  const stats = [
    { label: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'bg-primary' },
    { label: 'Applications', value: applications.length, icon: FileText, color: 'bg-highlightyellow' },
    { label: 'Contact Submissions', value: contacts.length, icon: MessageSquare, color: 'bg-secondary' },
    { label: 'Total Ratings', value: ratings.length, icon: Star, color: 'bg-primary' },
  ];

  const jobTypeData = jobs.reduce((acc, job) => {
    const type = job.jobType || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(jobTypeData).map(([name, value]) => ({ name, value }));

  const applicationStatusData = applications.reduce((acc, app) => {
    const status = app.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(applicationStatusData).map(([name, value]) => ({ name, value }));

  const COLORS = ['#D12318', '#B9B04A', '#3E1F0D', '#F9F3E9'];

  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + (r.ratingValue || 0), 0) / ratings.length).toFixed(2)
    : '0';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-secondary py-16 lg:py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-secondary-foreground mb-4">
              ADMIN DASHBOARD
            </h1>
            <p className="font-paragraph text-lg text-secondary-foreground/90">
              Platform overview and management tools
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="w-full py-12 bg-highlightyellow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 border-2 border-secondary/10">
                  <div className={`w-12 h-12 ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="font-heading text-4xl text-secondary mb-1">{stat.value}</div>
                  <div className="font-paragraph text-sm text-secondary/70">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="overview" className="font-heading text-xs lg:text-sm">
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger value="jobs" className="font-heading text-xs lg:text-sm">
                JOBS
              </TabsTrigger>
              <TabsTrigger value="applications" className="font-heading text-xs lg:text-sm">
                APPLICATIONS
              </TabsTrigger>
              <TabsTrigger value="contacts" className="font-heading text-xs lg:text-sm">
                CONTACTS
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h2 className="font-heading text-4xl text-secondary mb-8">PLATFORM ANALYTICS</h2>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Job Types Chart */}
                  <Card className="p-8 border-2 border-secondary/10">
                    <h3 className="font-heading text-2xl text-secondary mb-6">JOBS BY TYPE</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#D12318" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Application Status Chart */}
                  <Card className="p-8 border-2 border-secondary/10">
                    <h3 className="font-heading text-2xl text-secondary mb-6">APPLICATION STATUS</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={statusChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Key Metrics */}
                <Card className="p-8 border-2 border-secondary/10">
                  <h3 className="font-heading text-2xl text-secondary mb-6">KEY METRICS</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <p className="font-paragraph text-sm text-secondary/60 mb-2">Average Rating</p>
                      <p className="font-heading text-4xl text-primary">{averageRating}/5</p>
                    </div>
                    <div>
                      <p className="font-paragraph text-sm text-secondary/60 mb-2">Active Jobs</p>
                      <p className="font-heading text-4xl text-primary">{jobs.length}</p>
                    </div>
                    <div>
                      <p className="font-paragraph text-sm text-secondary/60 mb-2">Pending Applications</p>
                      <p className="font-heading text-4xl text-primary">
                        {applications.filter((a) => a.status === 'Pending').length}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-4xl text-secondary mb-8">JOB LISTINGS</h2>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <Card key={job._id} className="p-6 border-2 border-secondary/10">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="font-heading text-xl text-secondary">{job.jobTitle}</h3>
                              {job.jobType && <Badge>{job.jobType}</Badge>}
                            </div>
                            <p className="font-paragraph text-sm text-secondary/70 mb-2 line-clamp-2">
                              {job.jobDescription}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              {job.location && (
                                <span className="font-paragraph text-secondary/60">📍 {job.location}</span>
                              )}
                              {job.hourlyRate && (
                                <span className="font-paragraph text-secondary/60">💰 ${job.hourlyRate}/hr</span>
                              )}
                              {job.datePosted && (
                                <span className="font-paragraph text-secondary/60">
                                  📅 {format(new Date(job.datePosted), 'MMM dd, yyyy')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-4xl text-secondary mb-8">JOB APPLICATIONS</h2>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <Card key={app._id} className="p-6 border-2 border-secondary/10">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-heading text-lg text-secondary">
                                Application #{app._id.slice(0, 8)}
                              </h3>
                              <Badge
                                variant={
                                  app.status === 'Approved'
                                    ? 'default'
                                    : app.status === 'Rejected'
                                    ? 'destructive'
                                    : 'secondary'
                                }
                              >
                                {app.status}
                              </Badge>
                            </div>
                            {app.coverLetter && (
                              <p className="font-paragraph text-sm text-secondary/70 line-clamp-2 mb-2">
                                {app.coverLetter}
                              </p>
                            )}
                            {app.applicationDate && (
                              <p className="font-paragraph text-xs text-secondary/60">
                                Applied: {format(new Date(app.applicationDate), 'MMM dd, yyyy')}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-4xl text-secondary mb-8">CONTACT SUBMISSIONS</h2>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <Card key={contact._id} className="p-6 border-2 border-secondary/10">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-heading text-lg text-secondary">{contact.subject}</h3>
                              <Badge variant={contact.status === 'New' ? 'default' : 'secondary'}>
                                {contact.status}
                              </Badge>
                            </div>
                            <p className="font-paragraph text-sm text-secondary/80 mb-2">
                              From: {contact.senderName} ({contact.senderEmail})
                            </p>
                            <p className="font-paragraph text-sm text-secondary/70 line-clamp-3 mb-2">
                              {contact.messageContent}
                            </p>
                            {contact.submissionDateTime && (
                              <p className="font-paragraph text-xs text-secondary/60">
                                Submitted: {format(new Date(contact.submissionDateTime), 'MMM dd, yyyy HH:mm')}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to access the admin dashboard">
      <AdminPageContent />
    </MemberProtectedRoute>
  );
}
