import numpy as np
import datetime
import torch
from sklearn.metrics import accuracy_score, f1_score
from transformers import BertForSequenceClassification, BertTokenizer

def compute_metrics(preds, labels):
    """
    Calculate and return accuracy and F1 score from predictions and labels.
    """
    preds_flat = np.argmax(preds, axis=1).flatten()
    labels_flat = labels.flatten()
    acc = accuracy_score(labels_flat, preds_flat)
    f1 = f1_score(labels_flat, preds_flat, average='weighted')
    return {
        'accuracy': acc,
        'f1': f1
    }

def format_time(elapsed):
    """
    Convert elapsed seconds into a formatted string (hh:mm:ss).
    """
    elapsed_rounded = int(round((elapsed)))
    return str(datetime.timedelta(seconds=elapsed_rounded))

def save_checkpoint(model, tokenizer, save_path):
    """
    Save a model and tokenizer at the specified directory path.
    """
    model.save_pretrained(save_path)
    tokenizer.save_pretrained(save_path)

def load_checkpoint(save_path):
    """
    Load a model and tokenizer from a specified directory path.
    """
    model = BertForSequenceClassification.from_pretrained(save_path)
    tokenizer = BertTokenizer.from_pretrained(save_path)
    return model, tokenizer

def set_seed(seed_value=42):
    """
    Set random seed for reproducibility.
    """
    np.random.seed(seed_value)
    torch.manual_seed(seed_value)
    torch.cuda.manual_seed_all(seed_value)
