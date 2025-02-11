import re
import pandas as pd
from sqlalchemy import create_engine

def clean_text(text):
    text = re.sub(r'<.*?>', '', text)  # Remove HTML tags
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'[^a-z\s]', '', text)  # Keep only letters and spaces
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra whitespace
    return text

def classify_job_requirement(job_title, job_description=None):
    non_degree_keywords = [
        'barista', 'server', 'receptionist', 'cook', 'custodian', 
        'driver', 'salesperson', 'retail associate', 'janitor', 
        'maintenance', 'cashier', 'security guard', 'stocker', 
        'clerical', 'construction worker', 'mechanic', 'repair',
        'landscaping', 'warehouse', 'delivery', 'store manager',
        'cleaning', 'waitstaff', 'bartender', 'laborer', 'crew',
        'operator', 'installer', 'technician',
        # ... add more as needed ...
    ]

    degree_required_assistant_contexts = [
        'executive assistant', 'administrative assistant', 'office assistant', 
        'research assistant', 'legal assistant', 'medical assistant',
        # ... add more contexts as needed ...
    ]

    # Handle the case where job_title is None
    job_title = (job_title or "").lower()

    if 'assistant' in job_title and not any(context in job_title for context in degree_required_assistant_contexts):
        return 'degree-not-required'

    if any(keyword in job_title for keyword in non_degree_keywords):
        return 'degree-not-required'
    else:
        return 'degree-required-or-neutral'

def preprocess_data(df):
    df['description'] = df['description'].astype(str).apply(clean_text)
    df['qualifications'] = df['qualifications'].astype(str).apply(clean_text)

    # Handle None values for 'title' and 'description' in lambda function
    df['job_requirement_category'] = df.apply(lambda x: classify_job_requirement(
        x['title'] if pd.notnull(x['title']) else "", 
        x['description'] if pd.notnull(x['description']) else ""), axis=1)
    return df

# Assuming you have a 'jobs.db' SQLite database in the root of your project directory
db_engine = create_engine('sqlite:///../../jobs.db')
df = pd.read_sql_table('jobs', con=db_engine)

# Preprocess and classify the job data
preprocessed_df = preprocess_data(df)

# Update the table with the new classification
preprocessed_df.to_sql('jobs', con=db_engine, if_exists='replace', index=False)
