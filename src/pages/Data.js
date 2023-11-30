import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/data.css';

const Data = () => {
  return (
    <>
      <Helmet>
        <title>Reveal The Lake</title>
      </Helmet>
      <div className="page-container">
        <div className="text-container">
          <h2>Left Text</h2>
          <p>This is the left text container.</p>
          <div className="button-container">
            <button className="button">Commit Original</button>
          </div>
        </div>
        <div className="script-container" id="p5-canvas-container" />
        <div className="text-container-right">
          <h2>Right Text</h2>
          <p>This is the right text container.</p>
        </div>
      </div>
    </>
  );
};

export default Data;
