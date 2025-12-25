import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BaseCrudService } from '@/integrations';
import { JobApplications, JobListings, UserRatings } from '@/entities';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { User, Mail, Calendar, Briefcase, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

function ProfilePageContent() {
  const { member } = useMember();
  const [applications, setApplications] = useState<JobApplications[]>([]);
  const [ratings, setRatings] = useState<UserRatings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [member]);

  const loadUserData = async () => {
    if (!member?.id) return;
    
    setLoading(true);
    const { items: apps } = await BaseCrudService.getAll<JobApplications>('jobapplications');
    const userApps = apps.filter((app) => app.applicantId === member.id);
    setApplications(userApps);

    const { items: allRatings } = await BaseCrudService.getAll<UserRatings>('userratings');
    const userRatings = allRatings.filter((rating) => rating.ratedUserId === member.id);
    setRatings(userRatings);
    
    setLoading(false);
  };

  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + (r.ratingValue || 0), 0) / ratings.length).toFixed(1)
    : 'N/A';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Profile Header */}
      <section className="w-full bg-primary py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            {/* Profile Picture */}
            <div className="w-32 h-32 bg-primary-foreground flex items-center justify-center flex-shrink-0">
              {member?.profile?.photo?.url ? (
                <Image src={member.profile.photo.url} alt={member.profile.nickname || 'Profile'} className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-primary" />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-heading text-5xl lg:text-6xl text-primary-foreground mb-4">
                {member?.profile?.nickname || member?.contact?.firstName || 'User Profile'}
              </h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {member?.loginEmail && (
                  <div className="flex items-center gap-2 text-primary-foreground/90">
                    <Mail className="w-4 h-4" />
                    <span className="font-paragraph text-sm">{member.loginEmail}</span>
                  </div>
                )}
                {member?._createdDate && (
                  <div className="flex items-center gap-2 text-primary-foreground/90">
                    <Calendar className="w-4 h-4" />
                    <span className="font-paragraph text-sm">
                      Member since {format(new Date(member._createdDate), 'MMM yyyy')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="font-heading text-4xl text-primary-foreground mb-1">
                  {applications.length}
                </div>
                <div className="font-paragraph text-sm text-primary-foreground/80">Applications</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl text-primary-foreground mb-1">
                  {averageRating}
                </div>
                <div className="font-paragraph text-sm text-primary-foreground/80">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="w-full py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="applications" className="font-heading">
                MY APPLICATIONS
              </TabsTrigger>
              <TabsTrigger value="ratings" className="font-heading">
                MY RATINGS
              </TabsTrigger>
            </TabsList>

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
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-paragraph text-secondary/70">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <Card className="p-12 text-center border-2 border-secondary/10">
                    <Briefcase className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl text-secondary mb-2">No Applications Yet</h3>
                    <p className="font-paragraph text-secondary/70 mb-6">
                      Start applying to jobs to see your applications here.
                    </p>
                    <Link to="/find-jobs">
                      <Button className="font-heading">BROWSE JOBS</Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((app, index) => (
                      <motion.div
                        key={app._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="p-6 border-2 border-secondary/10 h-full flex flex-col">
                          <div className="flex items-start justify-between mb-4">
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

                          {app.applicationDate && (
                            <p className="font-paragraph text-sm text-secondary/70 mb-4">
                              Applied on {format(new Date(app.applicationDate), 'MMM dd, yyyy')}
                            </p>
                          )}

                          {app.coverLetter && (
                            <div className="mb-4 flex-1">
                              <p className="font-paragraph text-xs text-secondary/60 mb-2">Cover Letter:</p>
                              <p className="font-paragraph text-sm text-secondary/80 line-clamp-3">
                                {app.coverLetter}
                              </p>
                            </div>
                          )}

                          {app.jobListingId && (
                            <Link to={`/job/${app.jobListingId}`}>
                              <Button variant="outline" className="w-full font-heading mt-auto">
                                VIEW JOB
                              </Button>
                            </Link>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Ratings Tab */}
            <TabsContent value="ratings">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-4xl text-secondary mb-8">MY RATINGS & REVIEWS</h2>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-paragraph text-secondary/70">Loading ratings...</p>
                  </div>
                ) : ratings.length === 0 ? (
                  <Card className="p-12 text-center border-2 border-secondary/10">
                    <Star className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl text-secondary mb-2">No Ratings Yet</h3>
                    <p className="font-paragraph text-secondary/70">
                      Complete jobs to receive ratings from employers.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <Card className="p-8 bg-highlightyellow border-2 border-secondary/10">
                      <div className="text-center">
                        <div className="font-heading text-6xl text-secondary mb-2">
                          {averageRating}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-6 h-6 ${
                                star <= parseFloat(averageRating)
                                  ? 'fill-primary text-primary'
                                  : 'text-secondary/30'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="font-paragraph text-secondary/70">
                          Based on {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
                        </p>
                      </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                      {ratings.map((rating, index) => (
                        <motion.div
                          key={rating._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="p-6 border-2 border-secondary/10">
                            <div className="flex items-center gap-1 mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-5 h-5 ${
                                    star <= (rating.ratingValue || 0)
                                      ? 'fill-primary text-primary'
                                      : 'text-secondary/30'
                                  }`}
                                />
                              ))}
                            </div>
                            {rating.reviewText && (
                              <p className="font-paragraph text-secondary/80 mb-3">
                                "{rating.reviewText}"
                              </p>
                            )}
                            {rating.ratingDate && (
                              <p className="font-paragraph text-xs text-secondary/60">
                                {format(new Date(rating.ratingDate), 'MMM dd, yyyy')}
                              </p>
                            )}
                          </Card>
                        </motion.div>
                      ))}
                    </div>
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

export default function ProfilePage() {
  return (
    <MemberProtectedRoute>
      <ProfilePageContent />
    </MemberProtectedRoute>
  );
}
