import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { JobListings } from '@/entities';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Briefcase, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Image } from '@/components/ui/image';

export default function FindJobsPage() {
  const [jobs, setJobs] = useState<JobListings[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListings[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, locationFilter, jobTypeFilter, jobs]);

  const loadJobs = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<JobListings>('joblistings');
    setJobs(items);
    setFilteredJobs(items);
    setLoading(false);
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.jobDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requiredSkills?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter((job) => job.location === locationFilter);
    }

    if (jobTypeFilter !== 'all') {
      filtered = filtered.filter((job) => job.jobType === jobTypeFilter);
    }

    setFilteredJobs(filtered);
  };

  const uniqueLocations = Array.from(new Set(jobs.map((job) => job.location).filter(Boolean)));
  const uniqueJobTypes = Array.from(new Set(jobs.map((job) => job.jobType).filter(Boolean)));

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
              FIND YOUR NEXT JOB
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl">
              Browse thousands of local part-time opportunities. Filter by location, job type, and skills to find the perfect match.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="w-full bg-highlightyellow py-12">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50" />
                <Input
                  type="text"
                  placeholder="Search jobs, skills, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 font-paragraph bg-background border-secondary/20"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-14 font-paragraph bg-background border-secondary/20">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((location) => (
                    <SelectItem key={location} value={location || ''}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Type Filter */}
            <div>
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="h-14 font-paragraph bg-background border-secondary/20">
                  <SelectValue placeholder="All Job Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  {uniqueJobTypes.map((type) => (
                    <SelectItem key={type} value={type || ''}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="font-paragraph text-secondary/70">
              <span className="font-heading text-secondary">{filteredJobs.length}</span> jobs found
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('all');
                setJobTypeFilter('all');
              }}
              className="font-heading"
            >
              CLEAR FILTERS
            </Button>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="w-full py-16 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-paragraph text-secondary/70">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-secondary mb-2">No jobs found</h3>
              <p className="font-paragraph text-secondary/70">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 border-2 border-secondary/10 hover:border-primary transition-colors h-full flex flex-col">
                    {job.jobImage && (
                      <div className="w-full h-48 bg-secondary/5 mb-4 overflow-hidden">
                        <Image src={job.jobImage} alt={job.jobTitle || 'Job image'} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-xl text-secondary line-clamp-2">
                          {job.jobTitle}
                        </h3>
                        {job.jobType && (
                          <Badge variant="secondary" className="ml-2 flex-shrink-0">
                            {job.jobType}
                          </Badge>
                        )}
                      </div>

                      <p className="font-paragraph text-sm text-secondary/70 mb-4 line-clamp-3">
                        {job.jobDescription}
                      </p>

                      <div className="space-y-2 mb-4">
                        {job.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-secondary/80">{job.location}</span>
                          </div>
                        )}
                        {job.hourlyRate && (
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-secondary/80">
                              ${job.hourlyRate}/hour
                            </span>
                          </div>
                        )}
                        {job.datePosted && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-secondary/80">
                              Posted {format(new Date(job.datePosted), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        )}
                      </div>

                      {job.requiredSkills && (
                        <div className="mb-4">
                          <p className="font-paragraph text-xs text-secondary/60 mb-2">Required Skills:</p>
                          <p className="font-paragraph text-sm text-secondary line-clamp-2">
                            {job.requiredSkills}
                          </p>
                        </div>
                      )}
                    </div>

                    <Link to={`/job/${job._id}`} className="mt-auto">
                      <Button className="w-full font-heading">VIEW DETAILS</Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl text-secondary-foreground mb-6">
            LOOKING TO HIRE?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Post your job listing and connect with qualified local talent today.
          </p>
          <Link to="/post-job">
            <Button size="lg" className="font-heading text-base px-10 py-7 h-auto">
              POST A JOB
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
