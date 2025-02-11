from torch.utils.data import Dataset
import torch

class JobDescriptionsDataset(Dataset):
    """
    A PyTorch Dataset class to handle the job descriptions, qualifications, and labels.
    This class will prepare the text data for processing by a BERT model by tokenizing
    the inputs appropriately.
    """

    def __init__(self, descriptions, qualifications, labels, tokenizer, max_token_len=512):
        """
        Args:
            descriptions (list of str): Job descriptions.
            qualifications (list of str): Job qualifications.
            labels (list of int): Labels indicating suitability for each job (1 or 0).
            tokenizer: A tokenizer instance capable of tokenizing text for BERT.
            max_token_len (int): The maximum length for the tokenized output.
        """
        self.descriptions = descriptions
        self.qualifications = qualifications
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_token_len = max_token_len

    def __len__(self):
        """
        Returns the size of the dataset.
        """
        return len(self.descriptions)

    def __getitem__(self, index):
        """
        Retrieves an item by index and tokenizes the text.
        Args:
            index (int): Index of the item.
        Returns:
            dict: Contains input ids, attention mask, and labels as tensors.
        """
        # Combine description and qualifications for a complete context
        text = str(self.descriptions[index]) + ' ' + str(self.qualifications[index])
        label = self.labels[index]
        
        # Encode the text into tokens, attention masks, and input ids
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,  # Adds '[CLS]' and '[SEP]' tokens
            max_length=self.max_token_len,  # Truncates or pads sequences to max_token_len
            padding='max_length',  # Pads sequences to max length
            truncation=True,  # Truncates sequences longer than max length
            return_attention_mask=True,  # Generates attention mask for sequences
            return_tensors='pt',  # Returns PyTorch tensors
        )
        
        # Return the tokenized information as a dictionary
        return {
            'input_ids': encoding['input_ids'].flatten(),  # Flatten the tensor for compatibility with BERT model
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)  # Convert label to a long tensor
        }
