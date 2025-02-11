import pandas as pd
import sqlite3
from datetime import datetime

# Connect to the SQLite database
conn = sqlite3.connect('jobs.db')

# Read the data into a pandas DataFrame
df = pd.read_sql_query("SELECT * FROM jobs", conn)

# Define a function to convert date formats
def convert_date(date_str):
    # First, try parsing the date in the expected format
    try:
        return datetime.strptime(date_str, '%m/%d/%y').strftime('%Y-%m-%d')
    except ValueError:
        # If there's a ValueError, it means the parsing failed, return None or original string
        return None

# Apply the conversion to the 'postedDate' column
df['postedDate'] = df['postedDate'].apply(lambda x: convert_date(x) if x else None)

# Update the SQLite database with the new dates
df.to_sql('jobs', conn, if_exists='replace', index=False)

# Commit the changes and close the connection
conn.commit()
conn.close()
