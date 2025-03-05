import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import './SavedJobs.css';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch saved jobs from the server
    const fetchSavedJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/saved_jobs');
        if (!response.ok) throw new Error('Failed to fetch saved jobs');
        const data = await response.json();
        setSavedJobs(data.jobs);
      } catch (err) {
        setError('Could not load saved jobs.');
        // console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveJob = (jobId) => {
    // Remove a job from saved list
    const updatedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedJobs);
    // Optionally update server about the removal
  };

  if (isLoading) return <div>Loading saved jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="saved-jobs-container">
      <h1>Saved Jobs</h1>
      {savedJobs.length > 0 ? (
        <div className="saved-jobs-list">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} onRemoveJob={() => handleRemoveJob(job.id)} />
          ))}
        </div>
      ) : (
        <p>You have no saved jobs.</p>
      )}
    </div>
  );
};

export default SavedJobs;
