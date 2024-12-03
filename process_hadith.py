# import pandas as pd
# import sys

# # Fix for console encoding
# sys.stdout.reconfigure(encoding='utf-8')

# df = pd.read_csv('all_hadiths_clean.csv', encoding='utf-8')

# print(df.columns)


# df = df[['text_en','source', 'chapter_no', 'hadith_no']]

# df['reference'] = '[' + df['source'].astype(str) + df['chapter_no'].astype(str) + ':' + df['hadith_no'].astype(str) + ']'

# print(df.head())

# df = df[['text_en', 'reference']]


# df.to_json('processed_hadiths.json', index=False)
 
# print("Processed dataset saved as 'cleaned_dataset.csv'.")

import json

# Load the original JSON file
with open("processed_hadiths.json", "r") as file:
    data = json.load(file)

# Restructure the JSON
hadiths = data['text_en']
references = data['reference']

# Combine into a list of dictionaries
restructured_data = [
    {"text_en": hadiths[key], "reference": references[key]}
    for key in hadiths
]

# Save the restructured JSON
with open("processed_hadiths.json", "w") as file:
    json.dump(restructured_data, file, indent=2)

print("JSON file has been restructured and saved as 'processed_dataset.json'")