-- filter_jobs.sql

CREATE VIEW IF NOT EXISTS filtered_jobs AS
SELECT *
FROM jobs
WHERE job_requirement_category = 'degree-required-or-neutral'
AND is_suitable = 1;