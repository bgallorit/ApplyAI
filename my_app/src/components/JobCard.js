import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobCard.css';

function JobCard({ job, onSaveJob, onRemoveJob, onApply, onSelectJob }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showApplyPopup, setShowApplyPopup] = useState(false); // State for popup

  const isSavedPage = Boolean(onRemoveJob);

  const handleSaveJob = (e) => {
    e.stopPropagation();
    if (!isSaved) {
      onSaveJob(job);
      setIsSaved(true);
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    if (!isApplied) {
      onApply(job.id);
      setIsApplied(true);
      setShowApplyPopup(true); // Show popup when apply is pressed
    }
  };

  const handleRemoveJob = (e) => {
    e.stopPropagation();
    onRemoveJob(job.id); // Ensure you're passing only the job id if that's expected
  };

  const closePopup = (e) => {
    e.stopPropagation();
    setShowApplyPopup(false);
  };

  function determineJobFit() {
    return "good";
  }

  return (
    <div className="job-card" onClick={() => onSelectJob(job)}>
      <div className="job-card-content">
        <h3 className="job-title">{job.title}</h3>
        <div className="job-meta">
          <p className="job-company">{job.company}</p>
          <p className="job-location">{job.location}</p>
          {job.type && <p className="job-type">{job.type}</p>}
          <p className="job-fit">Job likely a {determineJobFit()} fit</p>
        </div>
        <div className="job-description-scroll">
          <strong>Description:</strong>
          <p>{createSnippet(job.description)}</p>
          <strong>Qualifications:</strong>
          <p>{createSnippet(job.qualifications)}</p>
        </div>
      </div>
      <div className="job-actions">
        {isSavedPage ? (
          <button className="btn-remove" onClick={handleRemoveJob}>
            Remove Job
          </button>
        ) : (
          <button className={`btn-save ${isSaved ? 'saved' : ''}`} onClick={handleSaveJob}>
            Save Job
          </button>
        )}
        <button className="btn-apply" onClick={handleApply}>
          Apply Now
        </button>
      </div>
      {showApplyPopup && (
        <div className="apply-popup">
          <p><a href="https://rit-csm.symplicity.com/students/app/home">Apply on CareerConnect</a></p>
          <button className="close-popup" onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

// Helper function to create a text snippet with ellipsis
const createSnippet = (text) => {
  const maxLength = 80;
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
  onSelectJob: PropTypes.func.isRequired,
  onRemoveJob: PropTypes.func // Optional; provided if on a saved jobs page
};

export default JobCard;
