import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../shared/auth-context';
import axios from 'axios';
import {
  faMoneyBillTrendUp,
  faHouse,
  faCoins,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import ErrorModal from './ErrorModal';
import LoadingSpinner from './LoadingSpinner';
import './Header.css';

const logoImage = logo;

function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState('');
  const [closeModal, setCloseModal] = useState(false);
  const auth = useContext(AuthContext);

  const uid = auth.userId;
  const name = auth.name;

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/users/${uid}`
        );

        return response.data.users;
      } catch (err) {
        setError(
          err.response?.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };
    const getThisUser = async () => {
      const thisUser = await getUser();
      if (thisUser) setUser(thisUser);
      setIsLoading(false);
    };
    getThisUser();
  }, [uid]);

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {error && closeModal && (
        <ErrorModal
          closeModalHandler={closeModalHandler}
          error={error}
          errorHandler={errorHandler}
        />
      )}
      (
      <div className="header__container sticky">
        <div className="coding__container">
          <img className="logo" alt="logo" src={logoImage}></img>
        </div>
        <div className="coding__container">
          <Link to="/main">
            <FontAwesomeIcon icon={faHouse} className="house btn_mobile_nav" />
          </Link>
        </div>

        <div className="coding__container">
          <Link to="/income">
            <FontAwesomeIcon
              icon={faMoneyBillTrendUp}
              className="house btn_mobile_nav"
            />
          </Link>
        </div>
        <div className="coding__container">
          <Link to="/expenses">
            <FontAwesomeIcon icon={faCoins} className="house btn_mobile_nav" />
          </Link>
        </div>
        <div className="coding__container">
          <Link to="/budget">
            <FontAwesomeIcon
              icon={faSackDollar}
              className="house btn_mobile_nav"
            />
          </Link>
        </div>

        <div className="text__container">
          <p>Hello {name || user?.name}</p>
        </div>
      </div>
      )
    </React.Fragment>
  );
}

export default Header;
