import unittest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ml_model.data_preparation import clean_text, preprocess_data

class TestDataPreparation(unittest.TestCase):
    def test_clean_text(self):
        raw_text = "<p>Some dirty text! 123</p>"
        expected_result = "some dirty text"
        self.assertEqual(clean_text(raw_text), expected_result)

    def test_preprocess_data(self):
        # Mock a DataFrame with the same structure as your data
        import pandas as pd
        test_data = {
            'title': ['Job 1', 'Job 2'],  # Added a 'title' column for classification
            'description': ['<p>Some dirty text! 123</p>', '<p>Another! @test</p>'],
            'qualifications': ['<p>Requirement 1! 123</p>', '<p>Requirement 2!</p>']
        }
        df = pd.DataFrame(test_data)
        
        # Process the data
        df_processed = preprocess_data(df)
        
        # Test if the data has been cleaned
        self.assertNotIn('<p>', df_processed['description'][0])
        self.assertNotIn('123', df_processed['description'][0])
        self.assertEqual(df_processed['description'][0], "some dirty text")
        self.assertEqual(df_processed['description'][1], "another test")

        # Test the classification if needed
        # self.assertIn('degree-required-or-neutral', df_processed['job_requirement_category'][0])
        # self.assertIn('degree-not-required', df_processed['job_requirement_category'][1])

if __name__ == '__main__':
    unittest.main()
