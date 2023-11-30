import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/home.css';
import useWallet from '../context/wallet';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await disconnectWallet();
    navigate('/');
  };
  console.log({ wallet });
  return (
    <>
      <Helmet>
        <title>Heartshaped</title>
      </Helmet>
      <header>
        {wallet && <button className='button' onClick={handleSignOut}>Disconnect</button>}
      </header>
      <div className='container'>
        <div className='info-container'>
          <h1>PROJECT TITLE</h1>
          <p>Project info goes here...</p>
          {/*Button to link to the second page*/}
          <div className='button-container'>
            <a
              href='https://objkt.com/collection/KT1JMf7LDpe2n2g3p99xmru93Hg5vjSU3p65'
              target='_blank'
              className='button'
            >
              Open The Collection
            </a>
            <button onClick={connectWallet} className='button'>
              Reveal The Lake
            </button>
          </div>
        </div>
        <div className='grid-container'>
          <div className='grid-item'>
            <img
              src='https://ipfs.io/ipfs/QmTcBXoreQXbgFr8Yug4BAkJ75LtLMgCdsyBwHpkHCgWsB'
              alt='Image 1'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 2'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 3'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 4'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 5'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 6'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 7'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 8'
            />
          </div>
          <div className='grid-item'>
            <img
              src='https://assets.objkt.media/file/assets-003/QmYUyJ6WiQk1BRgcxKbYfd6tgUgRzVAMgCTtNHpu9NfXQv/artifact'
              alt='Image 9'
            />
          </div>
          {/*Repeat the above three grid items for the other six images*/}
        </div>
      </div>
    </>
  );
};

export default Home;
