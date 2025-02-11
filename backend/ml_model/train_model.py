from transformers import Trainer, TrainingArguments, BertTokenizer, BertForSequenceClassification
import pandas as pd
import sqlite3
import os

from job_dataset import JobDescriptionsDataset

def update_job_suitability(db_path, predictions):
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.executemany(
            "UPDATE jobs SET is_suitable = ? WHERE id = ?",
            predictions
        )
        conn.commit()

if __name__ == "__main__":
    model_path = 'model/checkpoint-42'
    db_path = '../../jobs.db'

    tokenizer = BertTokenizer.from_pretrained(model_path)
    model = BertForSequenceClassification.from_pretrained(model_path)

    with sqlite3.connect(db_path) as conn:
        labeled_data_df = pd.read_sql_query("SELECT id, description, qualifications FROM jobs WHERE is_suitable IS NULL", conn)

    if not labeled_data_df.empty:
        test_dataset = JobDescriptionsDataset(
            descriptions=labeled_data_df['description'].tolist(),
            qualifications=labeled_data_df['qualifications'].tolist(),  # Make sure this is included
            labels=[0] * len(labeled_data_df),  # Assuming a dummy label for the purpose of this example
            tokenizer=tokenizer,
            max_token_len=512
        )

        training_args = TrainingArguments(
            output_dir=model_path,
            num_train_epochs=1,  # Reduced for speed
            per_device_train_batch_size=16,  # Increased batch size
            logging_dir='./logs',
            logging_steps=10,
            save_strategy="no"  # Do not save models to speed up the process
        )

        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=test_dataset
        )

        trainer.train()

        # Predict and update database in bulk for efficiency
        predictions = [(bool(pred), job_id) for pred, job_id in zip(trainer.predict(test_dataset).predictions.argmax(axis=1), labeled_data_df['id'])]
        update_job_suitability(db_path, predictions)

        print("Updated job suitability for all jobs.")
    else:
        print("No jobs found for updating.")
