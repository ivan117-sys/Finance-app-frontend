import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../shared/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Drawer from './Drawer';
import './Navigation.css';

function Aside({ allIncomes, allExpenses }) {
  const [drawer, setDrawer] = useState(false);

  const auth = useContext(AuthContext);

  const openHandler = () => {
    setDrawer(true);
  };

  const closeHandler = () => {
    setDrawer(false);
  };

  return (
    <React.Fragment>
      <div className="nav_container main-navigation__header-nav">
        <div>
          {!drawer && auth.isLoggedIn && (
            <button className="btn-mobile-nav">
              <FontAwesomeIcon
                value={drawer}
                onClick={openHandler}
                icon={faBars}
                className="bars"
              />
            </button>
          )}
        </div>

        {drawer && (
          <Drawer
            allIncomes={allIncomes}
            allExpenses={allExpenses}
            onClose={closeHandler}
          />
        )}

        <div className="navbar">
          <div>
            {auth.isLoggedIn && (
              <button onClick={auth.logout} className="login__button">
                Logout
              </button>
            )}
          </div>
          <div>
            {!auth.isLoggedIn && (
              <Link to="/">
                <button className="login__button">Login</button>
              </Link>
            )}
          </div>
          <div>
            {auth.isLoggedIn && (
              <Link to="/main">
                <button className="main__button">Main</button>
              </Link>
            )}
          </div>
          <div>
            {auth.isLoggedIn && (
              <Link to="/income">
                <button className="income__button">Income</button>
              </Link>
            )}
          </div>
          <div>
            {auth.isLoggedIn && (
              <Link to="/income/chart">
                <button className="income__button">Charts</button>
              </Link>
            )}
          </div>
          <div>
            {auth.isLoggedIn && (
              <Link to="/expenses">
                <button className="expenses__button">Expenses</button>
              </Link>
            )}
          </div>
          <div>
            {auth.isLoggedIn && (
              <Link to="/expense/chart">
                <button className="expenses__button">Charts</button>
              </Link>
            )}
          </div>
          <div>
            {auth.isLoggedIn && (
              <Link to="/budget">
                <button className="budget__button">Budget</button>
              </Link>
            )}
          </div>
          <div>
            {auth.isLoggedIn && (
              <Link to="/crypto">
                <button className="budget__button">Crypto</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Aside;
