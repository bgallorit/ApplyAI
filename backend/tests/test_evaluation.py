import unittest
from unittest.mock import MagicMock, patch
from ml_model.evaluate_model import evaluate_model

class TestEvaluation(unittest.TestCase):
    @patch('backend.ml_model.evaluate_model.Trainer')
    def test_evaluate_model(self, mock_trainer_class):
        # Create a mock trainer instance
        mock_trainer = mock_trainer_class.return_value
        
        # Set up the mock to return a set of predictions
        mock_predictions = MagicMock()
        mock_predictions.predictions = [[1, 0], [0, 1]]  # Mock predictions
        mock_predictions.label_ids = [1, 0]              # Mock labels
        mock_predictions.metrics = {'mock_metric': 0.99}  # Mock metric
        mock_trainer.predict.return_value = mock_predictions
        
        # Mock test dataset can be a simple list of dictionaries
        mock_test_dataset = [{'input_ids': [0], 'attention_mask': [1], 'labels': 0}]
        
        # Call evaluate_model with the mock trainer and mock test dataset
        metrics = evaluate_model(mock_trainer, mock_test_dataset)
        
        # Assertions to check if evaluate_model works correctly
        self.assertIn('mock_metric', metrics)
        self.assertEqual(metrics['mock_metric'], 0.99)

        # Check that the predict method was called on the mock trainer
        mock_trainer.predict.assert_called_once()

if __name__ == '__main__':
    unittest.main()
