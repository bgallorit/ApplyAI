import os
from transformers import BertTokenizer
from transformers import BertForSequenceClassification


model_path = '/Users/margaretlong/gradjobsearch/gradjobsearch/backend/ml_model/model/checkpoint-42'
# Check if path exists
if not os.path.exists(model_path):
    raise ValueError("Model path does not exist:", model_path)

# Check if necessary files are in the path
required_files = ['config.json', 'vocab.txt', 'pytorch_model.bin']
missing_files = [f for f in required_files if not os.path.exists(os.path.join(model_path, f))]
if missing_files:
    raise ValueError("Missing files in model directory:", missing_files)

# Load tokenizer and model
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)

print("Model and tokenizer loaded successfully.")
