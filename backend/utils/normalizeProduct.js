const normalizeProduct = (name) => {
  if (!name) return '';

  let normalized = name.toLowerCase().trim();

  // Remove extra spaces
  normalized = normalized.replace(/\s+/g, ' ');

  // Synonyms map (Hindi <-> English)
  const synonyms = {
    doodh: 'milk',
    milk: 'milk',
    pav: 'bread',
    bread: 'bread',
    chawal: 'rice',
    rice: 'rice',
    cheeni: 'sugar',
    sugar: 'sugar',
    tel: 'oil',
    oil: 'oil',
    aata: 'flour',
    flour: 'flour',
  };

  // Replace synonyms if found (basic replacement for AI search normalization)
  const words = normalized.split(' ');
  const mappedWords = words.map(word => synonyms[word] || word);

  return mappedWords.join(' ');
};

module.exports = normalizeProduct;
