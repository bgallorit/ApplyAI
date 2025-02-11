-- initialize_db.sql
--commit

CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY,
    type TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    qualifications TEXT NOT NULL,
    postedQuarter TEXT,
    postedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_suitable BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS job_predictions (
    id INTEGER PRIMARY KEY,
    job_id INTEGER NOT NULL,
    is_suitable BOOLEAN NOT NULL,
    confidence FLOAT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs (id)
);