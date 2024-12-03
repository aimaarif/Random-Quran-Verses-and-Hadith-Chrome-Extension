import pandas as pd
import sys

# Fix for console encoding
sys.stdout.reconfigure(encoding='utf-8')

df = pd.read_csv('Quran_dataset.csv', encoding='utf-8')

df = df[['ayah_en', 'surah_no', 'ayah_no_quran']]

df['reference'] = '[' + df['surah_no'].astype(str) + ':' + df['ayah_no_quran'].astype(str) + ']'

df = df[['ayah_en', 'reference']]

print(df.head())

df.to_json('processed_dataset.json', index=False)

print("Processed dataset saved as 'cleaned_dataset.csv'.")

import json

# Load the original JSON file
with open("processed_dataset.json", "r") as file:
    data = json.load(file)

# Restructure the JSON
ayahs = data['ayah_en']
references = data['reference']

# Combine into a list of dictionaries
restructured_data = [
    {"ayah_en": ayahs[key], "reference": references[key]}
    for key in ayahs
]

# Save the restructured JSON
with open("processed_dataset.json", "w") as file:
    json.dump(restructured_data, file, indent=2)

print("JSON file has been restructured and saved as 'processed_dataset.json'")
