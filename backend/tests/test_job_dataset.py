import unittest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Adjust the import statement based on your directory structure
from ml_model.job_dataset import JobDescriptionsDataset
from transformers import BertTokenizer
import torch

class TestJobDataset(unittest.TestCase):
    def setUp(self):
        # Initialize the tokenizer
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        # Create some mock data
        self.descriptions = ["This is a test description."]
        self.qualifications = ["These are test qualifications."]
        self.labels = [1]

    def test_dataset_initialization(self):
        # Initialize the dataset with mock data
        dataset = JobDescriptionsDataset(
            descriptions=self.descriptions,
            qualifications=self.qualifications,
            labels=self.labels,
            tokenizer=self.tokenizer,
            max_token_len=512
        )
        # Assert that the length is correct
        self.assertEqual(len(dataset), 1)

    def test_dataset_getitem(self):
        # Initialize the dataset with mock data
        dataset = JobDescriptionsDataset(
            descriptions=self.descriptions,
            qualifications=self.qualifications,
            labels=self.labels,
            tokenizer=self.tokenizer,
            max_token_len=512
        )
        # Get the first item
        item = dataset[0]

        # Assertions to ensure the item is structured correctly
        self.assertTrue('input_ids' in item)
        self.assertTrue('attention_mask' in item)
        self.assertTrue('labels' in item)
        self.assertIsInstance(item['input_ids'], torch.Tensor)
        self.assertIsInstance(item['attention_mask'], torch.Tensor)
        self.assertEqual(item['labels'].item(), self.labels[0])  # Assuming labels are tensors

if __name__ == '__main__':
    unittest.main()
