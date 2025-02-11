import sqlite3
import os

# This is the path where your jobs.db file is locatedd
database_path = 'jobs.db'

# If using a relative path, ensure it's relative to the current script's directory
# For example:
# database_path = os.path.join(os.path.dirname(__file__), 'jobs.db')

# Function to list all tables in the SQLite database
def list_tables(db_path):
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        return [table[0] for table in tables]

# Get the list of tables
try:
    tables = list_tables(database_path)
    print("Tables in the database:", tables)
except sqlite3.OperationalError as e:
    print("Error:", e)
