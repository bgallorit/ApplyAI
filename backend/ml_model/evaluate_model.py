from transformers import Trainer, BertTokenizer, BertForSequenceClassification
import numpy as np
import pandas as pd
import sqlite3
from sklearn.metrics import classification_report, accuracy_score
import os

from job_dataset import JobDescriptionsDataset

def evaluate_model(trainer, test_dataset):
    prediction_output = trainer.predict(test_dataset)
    preds_flat = np.argmax(prediction_output.predictions, axis=1).flatten()
    labels_flat = np.array(test_dataset.labels)
    report = classification_report(labels_flat, preds_flat, target_names=['Not Suitable', 'Suitable'])
    accuracy = accuracy_score(labels_flat, preds_flat)
    print(report)
    print("Accuracy:", accuracy)
    return prediction_output.metrics, preds_flat, labels_flat

if __name__ == "__main__":
    model_path = '/Users/margaretlong/gradjobsearch/gradjobsearch/backend/ml_model/model/checkpoint-42'

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model directory not found: {model_path}")

    tokenizer = BertTokenizer.from_pretrained(model_path)
    model = BertForSequenceClassification.from_pretrained(model_path)

    db_path = '/Users/margaretlong/gradjobsearch/gradjobsearch/jobs.db'
    if not os.path.exists(db_path):
        raise FileNotFoundError(f"Database file not found: {db_path}")

    with sqlite3.connect(db_path) as conn:
        labeled_data_df = pd.read_sql_query("SELECT * FROM labeled_data", conn)

    if not labeled_data_df.empty:
        test_dataset = JobDescriptionsDataset(
            descriptions=labeled_data_df['description'].tolist(),
            qualifications=labeled_data_df['qualifications'].tolist(),
            labels=labeled_data_df['is_suitable'].tolist(),
            tokenizer=tokenizer,
            max_token_len=512
        )
        trainer = Trainer(model=model)
        metrics, predictions, true_labels = evaluate_model(trainer, test_dataset)
        print(metrics)

        # Save predictions to the database
        cursor = conn.cursor()
        for idx, prediction in enumerate(predictions):
            cursor.execute(
                'INSERT INTO job_predictions (job_id, is_suitable, confidence) VALUES (?, ?, ?)',
                (labeled_data_df.iloc[idx]['id'], bool(prediction), metrics['eval_loss'])
            )
        conn.commit()
    else:
        print("Labeled data DataFrame is empty. Check your database connection and table.")
