const fs = require('fs');
const path = require('path');

// for reading recomend json
const readRecommendationData = () => {
  try {
    const filePath = path.resolve(__dirname, 'data', 'recommendation.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading recommendation data:', error);
    throw new Error('Failed to read recommendation data');
  }
};

// get data recomend
const recommendationsData = readRecommendationData();

// get recomend by label predict
const getRecommendation = (predictedLabel) => {
  const recommendations = recommendationsData.rekomendasi_panganan[predictedLabel];

  if (!recommendations) {
    return { error: 'Label not found' };
  }

  return recommendations;
};

module.exports = {
  getRecommendation,
};
