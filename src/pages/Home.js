import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/home.css';
import useWallet from '../context/wallet';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const DEFAULT_ASSETS = ['15-KT1JMf7LDpe2n2g3p99xmru93Hg5vjSU3p65', '55897-KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr', '9-KT1MCMQJVN4yBHyXw4TZ3KB94QtovsWM7jdH'];

const Home = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await disconnectWallet();
    navigate('/');
  };

  const checkIfAssetExistsInDataBase = (slug = '', token_data) => {
    const { fa_contract, token_id } = token_data;
    console.log({ slug, token_data });
    const splittedSlug = slug.split('-');
    return (
      splittedSlug[0] === token_id &&
      splittedSlug[1] === fa_contract
    );
  };

  const ASSETS_QUERY = gql`
      query AssetsQuery {
          token(
              where: {holders: {holder_address: {_eq: "${wallet}"}}}
              order_by: {timestamp: desc}
          ) {
              token_id
              fa_contract
              display_uri
              name
              thumbnail_uri
              fa {
                  name
              }
          }
      }
  `;

  const { data: { token = [] } = {}, loading } = useQuery(ASSETS_QUERY);

  if (wallet && (loading || token.length === 0)) return <p>Loading...</p>;
  console.log({token})
  
  const assets = token.map((token_data) => {
    // const { token_id, fa_contract, display_uri } = token_data;
    if (
      DEFAULT_ASSETS?.some(slug =>
        checkIfAssetExistsInDataBase(slug, token_data)
      )
    ) {
      return (
        <a href={`data/${token_data.token_id}/${token_data.fa_contract}`}>
          <img key={token_data.token_id} src={`https://ipfs.io/ipfs/${token_data.display_uri.substring(7)}`}
               alt='' />
        </a>);
    } else {
      return null; // Return null for items that don't meet the condition
    }
  }).filter(Boolean);
  
  return (
    <>
      <Helmet>
        <title>Heartshaped</title>
      </Helmet>
      <header>
        {wallet && <button className='button' onClick={handleSignOut}>Disconnect</button>}
      </header>
      <div className='container'>
        {!wallet ? (
          <>
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
          </>
        ) : <div>{assets.length ? assets : <p>no assets</p>}
        </div>}
      </div>
    </>
  );
};

export default Home;
