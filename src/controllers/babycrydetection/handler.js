/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const recommendationsService = require('../../services/recommendations');

const handleFlaskResult = async (audioFilePath) => {
  try {
    // handler process from flask
    const flaskResponse = await axios.post('flask', {
      audio: audioFilePath,
    });
    const { predictedLabel } = flaskResponse.data;

    // get recommend by predict
    const recommendations = recommendationsService.getRecommendation(predictedLabel);

    //  send respons JSON
    return { recommendations };
  } catch (error) {
    console.error('Error in handleFlaskResult:', error);
    throw new Error('Failed to handler the ekstrasi');
  }
};

const handleNodeJsEndpoint = async (flaskResult) => {
  try {
    // get predict from flask
    const { predictedLabel } = flaskResult;

    // get recommend by predict
    const recommendations = recommendationsService.getRecommendation(predictedLabel);

    // send response JSON
    return { recommendations };
  } catch (error) {
    console.error('Error in handleNodeJsEndpoint:', error);
    throw new Error(
      'Failed to handle result from ekstraction in Backend endpoint ',
    );
  }
};

module.exports = {
  handleFlaskResult,
  handleNodeJsEndpoint,
};
