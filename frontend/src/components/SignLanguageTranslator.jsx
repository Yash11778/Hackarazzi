import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const SignLanguageTranslator = ({ videoRef }) => {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const loadModel = async () => {
      // Load the pre-trained model
      const model = await tf.loadGraphModel('../../Sign-Language-To-Text-Conversion-main/Models/model_new.json');
      return model;
    };

    const translateSignLanguage = async (model) => {
      const video = videoRef.current;
      const captureFrame = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return tf.browser.fromPixels(canvas);
      };

      const processFrame = async () => {
        const frame = captureFrame();
        const prediction = await model.predict(frame.expandDims(0));
        const letter = prediction.argMax(-1).dataSync()[0];
        setTranslatedText(prevText => prevText + String.fromCharCode(65 + letter));
        frame.dispose();
      };

      const intervalId = setInterval(() => processFrame(), 1000); // Process frame every second
      return () => clearInterval(intervalId);
    };

    let model;
    loadModel().then(loadedModel => {
      model = loadedModel;
      translateSignLanguage(model);
    });

    return () => {
      if (model) {
        model.dispose();
      }
    };
  }, [videoRef]);

  return (
    <div>
      <h2>Translated Text: {translatedText}</h2>
    </div>
  );
};

export default SignLanguageTranslator;
