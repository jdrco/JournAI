import React from "react";

const TestDisplay = () => {
  let output = `[{"label": "sadness", "score": 0.4088817834854126}, {"label": "neutral", "score": 0.32471874356269836}, {"label": "surprise", "score": 0.13414035737514496}, {"label": "joy", "score": 0.03980706259608269}, {"label": "anger", "score": 0.034086793661117554}, {"label": "fear", "score": 0.03125927224755287}, {"label": "disgust", "score": 0.027105990797281265}]`;

  const data = JSON.parse(output);

  console.log(data);

  return (
    <>
      <div>TestDisplay</div>
    </>
  );
};

export default TestDisplay;
