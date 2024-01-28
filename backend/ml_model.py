import pandas as pd
from nltk.tokenize import word_tokenize
from nltk.stem.wordnet import WordNetLemmatizer
from ast import literal_eval
import nltk

# Download NLTK data
nltk.download('punkt')
nltk.download('stopwords')  # Download stopwords corpus

# Load the dataset
# Assuming 'data' is your pandas DataFrame containing hotel data
# Replace this with your actual dataset loading code
data = pd.read_csv('./data/data.csv')

# Data cleaning
# Assuming necessary cleaning has been done on the dataset beforehand

# Function to correct the format of hotel facilities column
def correction(string):
    try:
        facilities_list = literal_eval(string)
        return facilities_list
    except (ValueError, SyntaxError):
        return []

data['hotel_facilities'] = data['hotel_facilities'].apply(correction)

# Function to recommend hotels based on description, star rating, and guest recommendations
def recommend_hotel(description, star_rating, guest_recommendation):
    description = description.lower()
    description_tokens = word_tokenize(description)
    lemmatizer = WordNetLemmatizer()

    # Define stopwords set
    stop_words = set(nltk.corpus.stopwords.words('english'))

    # Filter out stopwords from description_tokens
    filtered = {word for word in description_tokens if word not in stop_words}

    # Your remaining code for hotel recommendation here...

# Function to run the hotel recommendation system
def run():
    description = input("Describe your ideal hotel:\t:")
    star_rating = int(input("Enter the desired star rating (1 to 5):\t:"))
    guest_recommendation = int(input("Enter the minimum guest recommendation count:\t:"))
    return recommend_hotel(description, star_rating, guest_recommendation)

# Execute the recommendation system
pd.set_option('display.max_colwidth', None)  # Display full text in DataFrame output
run()
