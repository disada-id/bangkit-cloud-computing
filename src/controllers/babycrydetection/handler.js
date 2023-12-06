/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const librosa = require('librosa');
const wav = require('node-wav');
const noisegate = require('noise-gate');

async function loadModel() {
  const modelPath = 'https://storage.googleapis.com/disada-model/model_saved_model.json';
  loadedModel = await tf.loadLayersModel(`file://${modelPath}`);
}

async function extractFeaturesNewAudio(filePath) {
  const audioBuffer = fs.readFileSync(filePath);

  const decodedAudio = wav.decode(audioBuffer);

  // Extract audio features
  let y = decodedAudio.channelData[0]; 
  const sr = decodedAudio.sampleRate;

  // Apply noise gate to reduce noise
  y = noisegate(y, { threshold: 0.1, attack: 10, release: 200 });

  // Placeholder logic
  const mfccs = librosa.feature.mfcc(y, sr, { n_mfcc: 13 });
  const spectralCentroid = librosa.feature.spectral_centroid(y, sr)[0];
  const spectralBandwidth = librosa.feature.spectral_bandwidth(y, sr)[0];
  const spectralContrast = librosa.feature.spectral_contrast(y, sr);
  const chroma = librosa.feature.chroma_stft(y, sr);
  const zeroCrossings = librosa.feature.zero_crossing_rate(y);
  const rmse = librosa.feature.rms(y);
  const onsetEnv = librosa.onset.onset_strength(y, sr);
  const tempo = librosa.beat.tempo({ onset_envelope: onsetEnv, sr });

  // Calculate means along the axis (axis=1 for spectral_contrast and chroma)
  const meanMfccs = tf.mean(mfccs, 1).arraySync();
  const meanSpectralCentroid = tf
    .mean(tf.tensor(spectralCentroid))
    .arraySync()[0];
  const meanSpectralBandwidth = tf
    .mean(tf.tensor(spectralBandwidth))
    .arraySync()[0];
  const meanSpectralContrast = tf.mean(spectralContrast, 1).arraySync();
  const meanChroma = tf.mean(chroma, 1).arraySync();
  const meanZeroCrossings = tf.mean(tf.tensor(zeroCrossings)).arraySync()[0];
  const meanRmse = tf.mean(tf.tensor(rmse)).arraySync()[0];

  // Concatenate features into a single vector
  const featureVector = [
    ...meanMfccs,
    meanSpectralCentroid,
    meanSpectralBandwidth,
    ...meanSpectralContrast,
    ...meanChroma,
    meanZeroCrossings,
    meanRmse,
    tempo,
  ];

  // Reshape feature vector to match model input shape
  const reshapedFeatureVector = tf.tensor2d([featureVector]);

  return reshapedFeatureVector.arraySync()[0];
}

async function predictLabel(audioFeatures) {
  const inputTensor = tf.tensor2d([audioFeatures]);

  // Perform prediction
  const prediction = loadedModel.predict(inputTensor);
  const predictionData = await prediction.data();

  // Get predicted class and label
  const predictedClass = tf.argMax(predictionData).dataSync()[0];
  const predictedLabel = labelMapping[predictedClass];

  return { predictedLabel, predictionProbabilities: predictionData };
}

module.exports = {
  loadModel,
  extractFeaturesNewAudio,
  predictLabel,
};
