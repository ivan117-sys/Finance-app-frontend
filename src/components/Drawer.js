import React, { useContext } from 'react';
import { AuthContext } from '../shared/auth-context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faCoins,
  faChartSimple,
  faMoneyBillTrendUp,
  faHouse,
  faX,
  faRightFromBracket,
  faSackDollar,
  faBitcoinSign,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './Drawer.css';

function Drawer({ onClose }) {
  const auth = useContext(AuthContext);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="drawer"
    >
      <span className="close__drawer">
        <FontAwesomeIcon className="bars close" icon={faX} onClick={onClose} />
      </span>
      <div>
        {auth.isLoggedIn && (
          <Link className="link " to="/">
            <FontAwesomeIcon
              className="logout__drawer"
              icon={faRightFromBracket}
              onClick={auth.logout}
            />
            <span onClick={auth.logout} className="drawer__span drawer__white">
              Logout
            </span>
          </Link>
        )}
      </div>
      <div>
        {!auth.isLoggedIn && (
          <Link className="link" to="/">
            <FontAwesomeIcon
              className="logout__drawer"
              icon={faRightFromBracket}
              onClick={auth.logout}
            />
            <span onClick={onClose} className="drawer__span drawer__white">
              Login
            </span>
          </Link>
        )}
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="link" to="/main">
            <FontAwesomeIcon
              className="logout__drawer"
              icon={faHouse}
              onClick={onClose}
            />
            <span onClick={onClose} className="drawer__span drawer__white">
              Main
            </span>
          </Link>
        )}
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="link" to="/income">
            <FontAwesomeIcon
              className="blue__icon"
              icon={faMoneyBillTrendUp}
              onClick={onClose}
            />
            <span onClick={onClose} className="drawer__span drawer__blue">
              Income
            </span>
          </Link>
        )}
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="link" to="/income/chart">
            <FontAwesomeIcon
              className="blue__icon"
              icon={faChartSimple}
              onClick={onClose}
            />
            <span onClick={onClose} className="drawer__span drawer__blue">
              Income chart
            </span>
          </Link>
        )}
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="link" to="/expenses">
            <FontAwesomeIcon
              className="red__icon"
              icon={faCoins}
              onClick={onClose}
            />
            <span onClick={onClose} className="drawer__span drawer__red">
              Expenses
            </span>
          </Link>
        )}
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="link" to="/expense/chart">
            <FontAwesomeIcon
              className="red__icon"
              icon={faChartPie}
              onClick={onClose}
            />
            <span onClick={onClose} className="drawer__span drawer__red">
              Expenses Chart
            </span>
          </Link>
        )}
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="link" to="/budget">
            <FontAwesomeIcon
              className="house__drawer"
              icon={faSackDollar}
              onClick={onClose}
            />
            <span onClick={onClose} className="drawer__span drawer__yellow">
              Budget
            </span>
          </Link>
        )}
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="link" to="/crypto">
            <FontAwesomeIcon
              className="house__drawer"
              icon={faBitcoinSign}
              onClick={onClose}
            />
            <span onClick={onClose} className="drawer__span drawer__yellow">
              Crypto
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default Drawer;
