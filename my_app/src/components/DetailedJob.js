import React from 'react';
import PropTypes from 'prop-types';
import './DetailedJob.css';

function DetailedJob({ job }) {
  if (!job) {
    return <div>Select a job to see the details.</div>;
  }

  // Convert qualifications string to an array if it's not already one
  const qualificationsList = Array.isArray(job.qualifications) 
    ? job.qualifications 
    : (typeof job.qualifications === 'string' 
        ? job.qualifications.split(', ') 
        : []);

  return (
    <div className="detailed-job">
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Job Type:</strong> {job.type}</p>
      <p><strong>Description:</strong></p>
      <p>{job.description}</p>
      <p><strong>Qualifications:</strong></p>
      <ul>
        {qualificationsList.map((qualification, index) => (
          <li key={index}>{qualification}</li>
        ))}
      </ul>
      <div className="detailed-job-actions">
        <button className="apply-button">Apply Now</button>
        {/* Additional actions could go here */}
      </div>
    </div>
  );
}

DetailedJob.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string.isRequired,
    qualifications: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    // Include other fields as necessary
  }),
};

export default DetailedJob;


