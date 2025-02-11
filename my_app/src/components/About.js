import React from 'react';
// import profilePic from './assets/images/profile.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        {/* <img src={profilePic} alt="Maggie Long" className="about-image"/> */}
        <h1>About Grad Job Search Engine</h1>
        <p>
          The Grad Job Search Engine is dedicated to revolutionizing the job search
          experience for recent college graduates. This platform, a passion project
          by Maggie Long, focuses on accessibility and navigable design, helping new
          professionals start their careers.
        </p>
        <h2>Our Machine Learning Approach</h2>
        <p>
          Understanding the challenges of job searching for new graduates, our machine learning
          algorithms delve into the complexities of job descriptions. The goal is to
          pinpoint characteristics that truly define what an entry-level position entails.
        </p>
        <p>
          Rather than relying on often misleading job titles, our system learns from
          various data points such as required qualifications, responsibilities, and
          employer expectations to assess the suitability for recent graduates. This
          allows us to present job seekers with opportunities that genuinely match their
          level of experience and educational background.
        </p>
        <h2>Continuous Learning for Better Opportunities</h2>
        <p>
          As employers have diverse ways of describing job openings, there is no one-size-fits-all
          description for entry-level roles. Our machine learning algorithms continuously
          learn from user feedback and job market trends to adapt and refine the search results.
          This ensures that our graduates are not overwhelmed by irrelevant listings and can
          trust the process of finding their first stepping stone in their professional journey.
        </p>
        {/* Add more content or sections as required */}
      </div>
    </div>
  );
};

export default About;

