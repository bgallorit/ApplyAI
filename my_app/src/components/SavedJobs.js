import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import DetailedJob from './DetailedJob';
import './SavedJobs.css';

const SavedJobs = ({onApply}) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

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

  if (isLoading) return <div>Loading saved jobs...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleRemoveJob = async (jobId) => {
    console.log('removing job', jobId);
    const apiUrl = "http://localhost:5000/api" //|| process.env.REACT_APP_API_URL;
  
    try {
      const response = await fetch(`${apiUrl}/saved_jobs/${jobId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove the job');
      }

      setSavedJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
      console.log('Job removed successfully');
    } catch (error) {
      console.error('Error removing job:', error);
    }
  };

  return (
    <div className="saved-jobs-container">
      <h1>Saved Jobs</h1>
      {savedJobs.length > 0 ? (
        <div className="saved-jobs-layout">
          <div className="saved-jobs-list">
            {savedJobs.map((job) => (
              <JobCard 
              key={job.id} 
              job={job} 
              onRemoveJob={() => handleRemoveJob(job.id)}
              onSelectJob={setSelectedJob} 
              onApply={onApply}
     
              />
            ))}
          </div>
          {selectedJob && (
            <div className="detailed-job-container">
              <DetailedJob job={selectedJob} />
            </div>
          )}
        </div>
      ) : (
        <p>You have no saved jobs.</p>
      )}
      
    </div>
    
  );
};

export default SavedJobs;
