import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobCard.css';

function JobCard({ job, onSaveJob, onApply, onSelectJob }) {
  // State to manage save and apply actions
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Function to handle saving a job
  const handleSaveJob = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the card
    if (!isSaved) {
      onSaveJob(job);
      setIsSaved(true); // Mark as saved after action
    }
  };

  // Function to handle applying for a job
  const handleApply = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the card
    if (!isApplied) {
      onApply(job.id);
      setIsApplied(true); // Mark as applied after action
    }
  };

  return (
    <div className="job-card" onClick={() => onSelectJob(job)}>
      <div className="job-card-content">
        <h3 className="job-title">{job.title}</h3>
        <div className="job-meta">
          <p className="job-company">{job.company}</p>
          <p className="job-location">{job.location}</p>
          {job.type && <p className="job-type">{job.type}</p>}
        </div>
        <div className="job-description-scroll">
          <strong>Description:</strong>
          <p>{createSnippet(job.description)}</p>
          <strong>Qualifications:</strong>
          <p>{createSnippet(job.qualifications)}</p>
        </div>
      </div>
      <div className="job-actions">
        <button className={`btn-save ${isSaved ? 'saved' : ''}`} onClick={handleSaveJob}>
          {isSaved ? 'Saved' : 'Save Job'}
        </button>
        <button className={`btn-apply ${isApplied ? 'applied' : ''}`} onClick={handleApply}>
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}

// Helper function to create a text snippet with ellipsis
const createSnippet = (text) => {
  const maxLength = 80; // Adjust this value as needed to fit one line
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string.isRequired,
    qualifications: PropTypes.string
  }),
  onSaveJob: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onSelectJob: PropTypes.func.isRequired
};

export default JobCard;
