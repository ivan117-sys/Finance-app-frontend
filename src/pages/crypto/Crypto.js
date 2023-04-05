import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { motion } from 'framer-motion';
import ErrorModal from '../../components/ErrorModal';
import './Crypto.css';

function Crypto() {
  const [coins, setCoins] = useState();
  const [filteredCoin, setFilteredCoin] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);

  const filteredCoins = coins?.filter(
    coin => coin.id === search?.toLowerCase()
  );

  let emptyFilteredCoins = true;
  if (filteredCoins?.length === 0) {
    emptyFilteredCoins = false;
  }

  const searchHandler = e => {
    setSearch(e.target.value);
  };

  // Get coins

  useEffect(() => {
    const getAllCoins = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );

        return response.data;
      } catch (err) {
        setError(
          err.response?.data.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };

    const getThisCoins = async () => {
      const allCoins = await getAllCoins();
      if (allCoins) setCoins(allCoins);

      setIsLoading(false);
    };
    getThisCoins();
  }, []);

  const filterHandler = () => {
    setFilteredCoin(search);
  };

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="crypto__container"
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {error && closeModal && (
        <ErrorModal
          closeModalHandler={closeModalHandler}
          error={error}
          errorHandler={errorHandler}
        />
      )}
      <div>
        <h3 className="coins__header">Search coins</h3>
      </div>
      <div className="form__div">
        <input
          className="coins__input"
          onChange={searchHandler}
          placeholder="search coins"
        ></input>
        <button className="coins__button" onClick={filterHandler}>
          Search
        </button>
      </div>
      {!filteredCoin && (
        <div className="coins__container">
          {coins?.map(coin => (
            <div key={coin.id} className="coin__container">
              <div className="left__side">
                <div className="img__div">
                  <img
                    className="coin__img"
                    src={coin.image}
                    alt="coins__image"
                  />
                </div>
                <div className="coins__name">
                  <p className="full__coin__name">{coin.name}</p>
                  <p className="short__coin__name">{coin.symbol}</p>
                </div>
              </div>
              <div className="right__side">
                <div className="price__div">
                  <p className="full__price">
                    €{coin.current_price.toLocaleString()}
                  </p>
                  {coin.price_change_percentage_24h < 0 ? (
                    <p className="price__percent red">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="price__percent green">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredCoins && emptyFilteredCoins && (
        <div className="coins__container">
          <div className="coin__container">
            <div className="left__side">
              <div className="img__div">
                <img
                  className="coin__img"
                  src={filteredCoins[0]?.image}
                  alt="coins__image"
                />
              </div>
              <div className="coins__name">
                <p className="full__coin__name">{filteredCoins[0]?.name}</p>
                <p className="short__coin__name">{filteredCoins[0]?.symbol}</p>
              </div>
            </div>
            <div className="right__side">
              <div className="price__div">
                <p className="full__price">
                  €{filteredCoins[0]?.current_price.toLocaleString()}
                </p>
                {filteredCoins[0]?.price_change_percentage_24h < 0 ? (
                  <p className="price__percent red">
                    {filteredCoins[0]?.price_change_percentage_24h.toFixed(2)}%
                  </p>
                ) : (
                  <p className="price__percent green">
                    {filteredCoins[0]?.price_change_percentage_24h.toFixed(2)}%
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Crypto;
