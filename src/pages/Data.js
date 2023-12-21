import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import useWallet from '../context/wallet';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import p5 from 'p5';
import { Sketch } from 'react-p5';
import '../styles/data.css';
import tokensData from '../tokens.json'; // Import the local JSON file


const Data = () => {

  const { wallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();
  const { tokenId, faContract } = useParams();
  const [data, setData] = useState();
  const [links, setLinks] = useState();
  const [titles, setTitles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const p5ContainerRef = useRef();

  const handleSignOut = async () => {
    await disconnectWallet();
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Find the token data based on tokenId and faContract
        const token = tokensData.tokens.find(
          (t) => t.tokenId === tokenId && t.faContract === faContract
        );

        if (token) {
          // Update state with the token data from the local JSON file
          setData(token.desc);
          setLinks(token.links);
          setTitles(token.titles);
          setIsLoading(false);
        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [tokenId, faContract]);

  useEffect(() => {
    // On component creation, instantiate a p5 object with the sketch and container reference
    const p5Instance = new p5(sketch, p5ContainerRef.current);

    // On component destruction, delete the p5 instance
    return () => {
      p5Instance.remove();
    };
  }, []);

  const sketch = (p) => {
    // p is a reference to the p5 instance this sketch is attached to
    // Include your full p5.js logic here

    let foregroundImg;
    let backgroundImg;
    let brushSize = 30;
    let isDrawing = false;

    p.preload = function () {
      let foregroundImageUrl =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nymphaea_nouchali5.JPG/440px-Nymphaea_nouchali5.JPG';
      foregroundImg = p.loadImage(foregroundImageUrl);

      let backgroundImageUrl =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rosa_rubiginosa_1.jpg/440px-Rosa_rubiginosa_1.jpg';
      backgroundImg = p.loadImage(backgroundImageUrl);
    };

    p.setup = function () {
      let canvas = p.createCanvas(700, 700);
      p.background(0);

      foregroundImg.resize(p.width, p.height);
      backgroundImg.resize(p.width, p.height);

      canvas.mousePressed(startDrawing);
      canvas.mouseReleased(stopDrawing);

      canvas.ontouchstart = function (event) {
        startDrawing();
        return false;
      };

      canvas.ontouchend = function (event) {
        stopDrawing();
        return false;
      };
    };

    p.draw = function () {
      // your draw code here

      p.scale(1.0); // set scale to fit the image

      if (!isDrawing) {
        p.background(255, 0);
        p.image(foregroundImg, 0, 0, p.width, p.height);
      } else {
        let scaledMouseX = p.mouseX * 1; // adjust to scale
        let scaledMouseY = p.mouseY * 1; // adjust toS scale

        p.noFill();
        p.stroke(255);
        p.strokeWeight(2);
        p.rectMode(p.CENTER);

        p.rect(scaledMouseX, scaledMouseY, brushSize, brushSize);

        foregroundImg.copy(
          backgroundImg,
          scaledMouseX - brushSize / 2,
          scaledMouseY - brushSize / 2,
          brushSize,
          brushSize,
          scaledMouseX - brushSize / 2,
          scaledMouseY - brushSize / 2,
          brushSize,
          brushSize
        );

        p.image(foregroundImg, 0, 0, p.width, p.height);
      }
    };

    const startDrawing = () => {
      isDrawing = true;
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    p.mouseWheel = function (event) {
      brushSize += event.delta;
      brushSize = p.constrain(brushSize, 10, 100);
      return false;
    };
  };

  const ASSET_QUERY = gql`
      query AssetQuery {
          token(where: { fa_contract: { _eq: "${faContract}" }, token_id: {_eq: "${tokenId}"} }) {
              name
              display_uri
              fa {
                  name
                  contract
              }
          }
      }
  `;

  const { data: { token = [] } = {}, loading: isQueryLoading } =
    useQuery(ASSET_QUERY);

  const { name, display_uri, fa: { contract } = {} } = token[0] || {};

  const isDataLoading = isLoading || isQueryLoading;

  if (isDataLoading) return <p>Loading...</p>;
  console.log({ token, name, contract, display_uri, data, links, titles, tokenId, faContract });
  if (token.length === 0) return <div> No data found </div>;


  
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
          <button className='button'><Link to="/sketch">See Sketch</Link></button>
          </div>
        </div>
        <div className='script-container' >

        <div ref={p5ContainerRef}></div>
          {/* <img src={`https://ipfs.io/ipfs/${display_uri.substring(7)}`} alt='' /> */}
          {/* {<div className='script-container' id='p5-canvas-container' />} */}

        </div>
        <div className='text-container-right'>
          <h2>Right Text</h2>
          <p>This is the right text container.</p>
          <p>Description: {data}</p>
          <p>Links: {links}</p>
          <p>Titles: {titles}</p>
          <p>{}</p>
        </div>
      </div>

    </>
    
  );
  
};

export default Data;