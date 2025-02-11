-- Start a transaction
BEGIN TRANSACTION;

-- Create a new table with the correct schema
CREATE TABLE new_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  title TEXT,
  description TEXT,
  qualifications TEXT,
  postedQuarter TEXT,
  postedDate TEXT,
  is_suitable REAL,
  "Unnamed: 7" TEXT
);

-- Copy the data from the old table to the new table
INSERT INTO new_jobs (type, title, description, qualifications, postedQuarter, postedDate, is_suitable, "Unnamed: 7")
SELECT type, title, description, qualifications, postedQuarter, postedDate, is_suitable, "Unnamed: 7" FROM jobs;

-- Drop the old table
DROP TABLE jobs;

-- Rename the new table to the original name
ALTER TABLE new_jobs RENAME TO jobs;

-- Commit the changes
COMMIT;

