import unittest
from unittest.mock import patch
import sys
import os

# Ensuring that the 'backend' directory is recognized
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# Now you should be able to import your module
from backend.ml_model.train_model import main as train_main

class TestTraining(unittest.TestCase):
    @patch('backend.ml_model.train_model.Trainer.train')
    def test_training(self, mock_train):
        # Mocking the train method to prevent actual training
        train_main()
        # Verify if the train method was indeed called
        mock_train.assert_called()

if __name__ == '__main__':
    unittest.main()

