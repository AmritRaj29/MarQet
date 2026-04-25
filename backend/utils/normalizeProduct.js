const synonyms = {
  milk: ['milk', 'doodh', 'dudh'],
  bread: ['bread', 'pav', 'paav', 'roti'],
  rice: ['rice', 'chawal', 'chaawal'],
  sugar: ['sugar', 'cheeni', 'chini', 'shakar'],
  oil: ['oil', 'tel', 'refined'],
  egg: ['egg', 'anda', 'ande', 'eggs'],
  flour: ['flour', 'atta', 'aata', 'maida'],
  butter: ['butter', 'makhan', 'makkhan'],
  water: ['water', 'pani', 'paani', 'jal'],
  salt: ['salt', 'namak'],
  potato: ['potato', 'aloo', 'alu'],
  onion: ['onion', 'pyaaz', 'pyaz', 'kanda'],
  tomato: ['tomato', 'tamatar'],
  tea: ['tea', 'chai', 'chaay'],
  coffee: ['coffee', 'kafi', 'kofi'],
  cheese: ['cheese', 'paneer'],
  curd: ['curd', 'dahi', 'yogurt'],
  lentil: ['lentil', 'dal', 'daal'],
  soap: ['soap', 'sabun'],
  shampoo: ['shampoo', 'shampu']
};

const normalizeProduct = (name) => {
  if (!name) return '';

  let normalized = name.toLowerCase().trim();
  normalized = normalized.replace(/\s+/g, ' ');

  // Basic word replacement using base synonym if matched
  const words = normalized.split(' ');
  const mappedWords = words.map(word => {
    for (const [key, variants] of Object.entries(synonyms)) {
      if (variants.includes(word)) {
        return key;
      }
    }
    return word;
  });

  return mappedWords.join(' ');
};

const getAllSynonyms = (key) => {
  // Try to find if key matches any variant, return all variants for that base
  for (const variants of Object.values(synonyms)) {
    if (variants.includes(key)) {
      return variants;
    }
  }
  // If not found in dict, just return the key in an array
  return [key];
};

module.exports = { normalizeProduct, getAllSynonyms };
