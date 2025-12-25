/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  senderEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDateTime?: Date | string;
  /** @wixFieldType text */
  status?: string;
}


/**
 * Collection ID: jobapplications
 * Interface for JobApplications
 */
export interface JobApplications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  applicantId?: string;
  /** @wixFieldType text */
  jobListingId?: string;
  /** @wixFieldType datetime */
  applicationDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  coverLetter?: string;
  /** @wixFieldType url */
  resumeUrl?: string;
}


/**
 * Collection ID: joblistings
 * Interface for JobListings
 */
export interface JobListings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  jobDescription?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType number */
  hourlyRate?: number;
  /** @wixFieldType text */
  jobType?: string;
  /** @wixFieldType datetime */
  datePosted?: Date | string;
  /** @wixFieldType datetime */
  applicationDeadline?: Date | string;
  /** @wixFieldType text */
  requiredSkills?: string;
  /** @wixFieldType image */
  jobImage?: string;
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  userRole?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType boolean */
  isVerified?: boolean;
}


/**
 * Collection ID: userratings
 * Interface for UserRatings
 */
export interface UserRatings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  ratingValue?: number;
  /** @wixFieldType text */
  reviewText?: string;
  /** @wixFieldType text */
  ratedByUserId?: string;
  /** @wixFieldType text */
  ratedUserId?: string;
  /** @wixFieldType text */
  jobId?: string;
  /** @wixFieldType datetime */
  ratingDate?: Date | string;
}
