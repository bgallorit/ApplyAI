import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Pagination from './components/Pagination1'; // Ensure this component exists
import './App.css';
import useDebounce from './useDebounce';


// Lazy loaded components
const About = lazy(() => import('./components/About'));
const SavedJobs = lazy(() => import('./components/SavedJobs'));
const JobListings = lazy(() => import('./components/JobListings'));
const Filters = lazy(() => import('./components/Filters'));
const DetailedJob = lazy(() => import('./components/DetailedJob'));

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: [],
    degree: 'any',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Added for pagination
  const [totalPages, setTotalPages] = useState(0); // Added for pagination

  const debouncedFilters = useDebounce(filters, 500);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Pagination page change handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchJobs = async (searchFilters, page = currentPage) => {
    setIsLoading(true);
    setError(null);
    try {
      const queryString = `${Object.keys(searchFilters)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchFilters[key])}`)
        .join('&')}&page=${page}`; // Added page to the query

      const apiUrl = "http://localhost:5000/api" //|| process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/jobs?${queryString}`);
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);

      let data = await response.json();
      setJobs(data.jobs);
      setTotalPages(data.pages); // Set total pages for pagination
    } catch (error) {
      console.error('There was an error fetching the jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(debouncedFilters, currentPage);
  }, [debouncedFilters, currentPage]); // Added currentPage as a dependency

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleApply = (job) => {
    console.log('you appplied heres a sticker');
  }

  const handleSaveJob = async (job) => {
    console.log('saving job', job.id, job.title);
    const apiUrl = "http://localhost:5000/api" //|| process.env.REACT_APP_API_URL;
  
    try {
      const response = await fetch(`${apiUrl}/saved_jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: job.id,
          type: job.type,
          title: job.title,
          description: job.description,
          qualifications: job.qualifications
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save the job');
      }
  
      const data = await response.json();
      console.log('Job saved successfully:', data);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <>
                <Filters onFilterChange={handleFilterChange} />
                <JobListings 
                  isLoading={isLoading} 
                  error={error} 
                  jobs={jobs}
                  onSelectJob={handleSelectJob}
                  onApply={handleApply}
                  onSaveJob={handleSaveJob}
                />
                {totalPages > 1 && ( // Only display if there is more than one page
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
                {selectedJob && <DetailedJob job={selectedJob} onApply={handleApply} />}
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/saved_jobs" element={<SavedJobs />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
