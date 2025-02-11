<<<<<<< HEAD
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the CSV file into a pandas DataFrame
jobs_df = pd.read_csv('backend/data/jobs.csv')

# Convert the DataFrame to a list of dictionaries
jobsData = jobs_df.to_dict(orient='records')

def extract_degree(description, qualifications):
    text = f"{description} {qualifications}".lower()  # Combine both fields and convert to lower case for checking
    if 'bachelor' in text:
        return 'Bachelor\'s'
    if 'master' in text:
        return 'Master\'s'
    if 'associate' in text:
        return 'Associate\'s'
    # Default assumption
    return 'Bachelor\'s'

def extract_job_type(description, qualifications):
    text = f"{description} {qualifications}".lower()  # Combine both fields and convert to lower case for checking
    if 'remote' in text:
        return 'Remote'
    if 'hybrid' in text:
        return 'Hybrid'
    # Default to on-site if not specified
    return 'On-site'

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    # Extract query parameters...
    position = request.args.get('position', '')  # Default to empty string if not provided
    page = int(request.args.get('page', 1))  # Default to first page
    per_page = int(request.args.get('per_page', 20))  # Default to 20 jobs per page

    # Additional filtering based on degree and job type
    filtered_jobs = []
    for job in jobsData:
        degree = extract_degree(job['description'], job.get('qualifications', ''))
        job_type = extract_job_type(job['description'], job.get('qualifications', ''))

        # Modify the condition below to include checks for degree and job_type if needed
        # Assuming the 'position' variable is extracted from the query parameters
        if (not position or position.lower() in job['title'].lower()) and (not degree or degree.lower() in job['description'].lower()):
            job['degree'] = degree  # Add degree information to job object
            job['job_type'] = job_type  # Add job type information to job object
            filtered_jobs.append(job)

   # Implement pagination
    start = (page - 1) * per_page
    end = start + per_page
    paginated_jobs = filtered_jobs[start:end]

    # Return the filtered and paginated list of jobs as JSON
    return jsonify({
        'jobs': paginated_jobs,
        'total': len(filtered_jobs),
        'page': page,
        'per_page': per_page
    })

if __name__ == '__main__':
    app.run(debug=True)
=======
version https://git-lfs.github.com/spec/v1
oid sha256:20af8403ee790f3a22fbcee17fcaeca3ec5abd4874780b5f368376c9bc8744a9
size 2490
>>>>>>> ac8f7fb7 (progress)