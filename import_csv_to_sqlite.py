import pandas as pd
import sqlite3

# Function to concatenate and import CSV files into SQLite
def import_csvs(csv_paths, table_name, conn):
    # Initialize an empty list to store DataFrames
    dfs = []

    # Loop through the CSV paths
    for path in csv_paths:
        # Read the CSV file
        df = pd.read_csv(path, nrows = 50)

        df.insert(0, 'id', range(1, 1+len(df)))

        # Append the DataFrame to the list
        dfs.append(df)
    
    # Concatenate all the DataFrames in the list
    combined_df = pd.concat(dfs, ignore_index=True)
    
    # Write the combined data to a sqlite table
    combined_df.to_sql(table_name, conn, if_exists='replace', index=False)

# Create or connect to an SQLite database
conn = sqlite3.connect('jobs.db')

# Path to your CSV files
jobs_csv_paths = ['backend/data/Jobs_part1.csv']
labeled_data_path = 'backend/ml_model/data/labeled_data.csv'

# Import the jobs CSV files into SQLite under the 'jobs' table
import_csvs(jobs_csv_paths, 'filtered_jobs', conn)

# Import the labeled data CSV file into SQLite under the 'labeled_data' table
df_labeled = pd.read_csv(labeled_data_path)
df_labeled.to_sql('labeled_data', conn, if_exists='replace', index=False)

# Commit the changes and close the connection
conn.commit()
conn.close()

print("CSV files have been imported into the SQLite database successfully.")
