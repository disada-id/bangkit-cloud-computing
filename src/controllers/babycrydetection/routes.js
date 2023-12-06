/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-undef */
const handler = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/predict',
    handler: async (request, h) => {
      try {
        const { file } = request.payload;
        const tempFilePath = 'temp_audio.wav';

        // Save the file to a temporary location
        fs.writeFileSync(tempFilePath, file._data);

        // Extract features from the uploaded audio
        const audioFeatures = await handler.extractFeaturesNewAudio(
          tempFilePath,
        );

        // Perform prediction
        const { predictedLabel, predictionProbabilities } = await handler.predictLabel(audioFeatures);

        // Display the results
        const results = {
          predictedLabel,
          predictionProbabilities: Object.fromEntries(
            Object.entries(handler.labelMapping).map(([key, label]) => [
              label,
              predictionProbabilities[key],
            ]),
          ),
        };

        return results;
      } catch (error) {
        return { error: error.message };
      }
    },
  },
];

module.exports = routes;
