import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import useWallet from '../context/wallet';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import '../styles/data.css';

const Data = () => {
  const { wallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const { tokenId, faContract } = useParams();
  const [data, setData] = useState();
  const [links, setLinks] = useState();
  const [titles, setTitles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = async () => {
    await disconnectWallet();
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(`https://artmatr.co/wp-json/acf/v3/options/options`)
      ).json();
      const responseToken = await (
        await fetch(
          `https://artmatr.co/wp-json/wp/v2/coa?slug=${tokenId}-${faContract}`
        )
      ).json();

      setData(responseToken[0]?.acf);
      setLinks(response?.acf);
      setTitles(response?.acf?.coa_digital_content?.coa_digital_content_text);
      setIsLoading(false);
    })();
  }, []);

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
            <button className='button'>Commit Original</button>
          </div>
        </div>
        <img src={`https://ipfs.io/ipfs/${display_uri.substring(7)}`} alt='' />
        {/*<div className='script-container' id='p5-canvas-container' />*/}
        <div className='text-container-right'>
          <h2>Right Text</h2>
          <p>This is the right text container.</p>
        </div>
      </div>
    </>
  );
};

export default Data;
