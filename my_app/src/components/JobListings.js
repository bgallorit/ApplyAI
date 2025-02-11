import React from 'react';
import JobCard from './JobCard';
import './JobListings.css';

const JobListings = ({ isLoading, error, jobs, onSelectJob, onSaveJob, onApply }) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (!jobs.length) {
    return <div>No jobs found. Please adjust your filters.</div>;
  }

  return (
    <div className="job-listings-container">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onSelectJob={onSelectJob}
          onSaveJob={onSaveJob}
          onApply={onApply}
        />
      ))}
    </div>
  );
};

export default JobListings;
