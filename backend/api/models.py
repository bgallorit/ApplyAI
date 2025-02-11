from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime

db = SQLAlchemy()

class Job(db.Model):
    __tablename__ = 'jobs'

    # Define the columns based on the table schema
    # id column is assumed to be added to the database schema
    id = db.Column(db.Integer, primary_key=True)  # Unique identifier for each job
    type = db.Column(db.String(255))  # Type of job (e.g., Full-time, Part-time)
    title = db.Column(db.String(255), nullable=False)  # Job title
    description = db.Column(db.Text, nullable=False)  # Job description
    qualifications = db.Column(db.Text, nullable=False)  # Qualifications required for the job
    postedQuarter = db.Column(db.String(255))  # The quarter during which the job was posted
    postedDate = db.Column(db.DateTime, default=datetime.utcnow)  # The date and time when the job was posted
    is_suitable = db.Column(db.Boolean, default=False)  # Flag indicating if the job is suitable for new graduates

    def serialize(self):
        """ 
        Serializes the Job object to a dictionary format for JSON representation, 
        making it easier to send data through HTTP responses.
        """
        return {
            'id': self.id,
            'type': self.type,
            'title': self.title,
            'description': self.description,
            'qualifications': self.qualifications,
            'postedQuarter': self.postedQuarter,
            'postedDate': self.postedDate.strftime('%m/%d/%Y') if self.postedDate else None,
            'is_suitable': self.is_suitable
        }

    @validates('title', 'description', 'qualifications')
    def validate_non_empty(self, key, value):
        """
        Ensures that certain fields are not empty.
        """
        if not value:
            raise ValueError(f"{key.capitalize()} is required and cannot be empty.")
        return value
    
@validates('postedDate')
def validate_postedDate(self, key, value):
    # Skipping validation to allow any date format
    return value


