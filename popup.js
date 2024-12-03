
// Fetch verses and hadiths
const fetchJSON = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return [];
  }
};

// Display random content
const displayRandomContent = (items, element, contentKey, referenceKey) => {
  if (items.length > 0) {
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];
    element.textContent = `${item[contentKey]} ${item[referenceKey]}`;
  } else {
    element.textContent = "No content available.";
  }
};

// Initialize content
(async () => {
  const verseElement = document.getElementById('verse');
  const newVerseButton = document.getElementById('new-verse');
  const hadithElement = document.getElementById('hadith');
  const newHadithButton = document.getElementById('new-hadith');

  const verses = await fetchJSON('processed_dataset.json');
  const hadiths = await fetchJSON('processed_hadiths.json');

  // Display initial content
  displayRandomContent(verses, verseElement, 'ayah_en', 'reference');
  displayRandomContent(hadiths, hadithElement, 'text_en', 'reference');

  // Add event listeners
  newVerseButton.addEventListener('click', () => displayRandomContent(verses, verseElement, 'ayah_en', 'reference'));
  newHadithButton.addEventListener('click', () => displayRandomContent(hadiths, hadithElement, 'text_en', 'reference'));
})();

// Fetch explanation
const getExplanation = async (content, type) => {
  const API_URL = 'https://example.com/prompt-api';
  const API_KEY = 'YOUR_API_KEY_HERE';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ prompt: `Provide a detailed ${type} of: ${content}`, max_tokens: 200 }),
    });

    const data = await response.json();
    return data?.choices?.[0]?.text?.trim() || "No explanation available.";
  } catch (error) {
    console.error("Error fetching explanation:", error);
    return "Error fetching explanation. Please try again later.";
  }
};

// Show modal
const showExplanationModal = (content) => {
  const modal = document.getElementById('explanation-modal');
  const explanationText = document.getElementById('explanation-text');
  const closeModal = document.getElementById('close-modal');

  explanationText.textContent = content;
  modal.style.display = 'block';

  closeModal.onclick = () => (modal.style.display = 'none');
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
  };
};

// Event listeners for explain buttons
document.getElementById('explain-verse').addEventListener('click', async () => {
  const verseText = document.getElementById('verse').textContent;
  const explanation = await getExplanation(verseText, 'explanation');
  showExplanationModal(explanation);
});

document.getElementById('explain-hadith').addEventListener('click', async () => {
  const hadithText = document.getElementById('hadith').textContent;
  const explanation = await getExplanation(hadithText, 'explanation');
  showExplanationModal(explanation);
});
