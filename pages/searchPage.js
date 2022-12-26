import React, { useEffect, useState, useContext } from "react";

// internal import
import Style from "../styles/searchPage.module.css";
// import { Slider, Brand } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter, Loader } from '../components/componentindex';

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

// smart contract import
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    try {
      fetchNFTs().then((items) => {
        setNfts(items.reverse());
        setNftsCopy(items);     // we dont want to change the original array
      });
    } catch (error) {
      setError("Please reload the browser", error);
    }
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

//  const collectionArray = [
//    images.nft_image_1,
//    images.nft_image_2,
//    images.nft_image_3,
//    images.nft_image_1,
//    images.nft_image_2,
//    images.nft_image_3,
//    images.nft_image_1,
//    images.nft_image_2,
//  ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
    </div>
  );
};

export default searchPage;