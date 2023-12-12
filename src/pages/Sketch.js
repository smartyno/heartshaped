import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import P5Wrapper from 'react-p5-wrapper'; // Import the P5Wrapper component
import '../styles/data.css';

// Define your p5.js sketch function
const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(200);
  };

  p.draw = () => {
    p.fill(255, 0, 0);
    p.ellipse(200, 200, 50, 50);
  };
};

const Data = () => {
  const { wallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();
  const { tokenId, faContract } = useParams();

  const handleSignOut = async () => {
    await disconnectWallet();
    navigate('/');
  };

  // Your existing component code...

  return (
    <>
      <Helmet>
        <title>Reveal The Lake</title>
      </Helmet>
      <header>
        {wallet && <button className='button' onClick={handleSignOut}>Disconnect</button>}
      </header>
      <div className='page-container'>
        <div className='text-container'>
          <h2>Left Text</h2>
          <p>This is the left text container.</p>
          <div className='button-container'>
            <button className='button'>Commit Original</button>
          </div>
        </div>
        {/* Embed your p5.js sketch using P5Wrapper */}
        <P5Wrapper sketch={sketch} />
        <div className='text-container-right'>
          <h2>Right Text</h2>
          <p>This is the right text container.</p>
        </div>
      </div>
    </>
  );
};

export default Data;
