import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Income.css';
import NewIncome from './NewIncome';
import SortIncome from './SortIncome';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const d = new Date();
let name = month[d.getMonth()].toLowerCase();

function Income() {
  const [openModal, setOpenModal] = useState(false);
  const [incomes, setIncomes] = useState();
  const [, setCanLoadIncomes] = useState(false);
  const [month, setMonth] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);

  const auth = useContext(AuthContext);

  const uid = auth.userId;

  let firstIncome = false;
  if (incomes) {
    if (incomes.length === 0) {
      firstIncome = true;
    }
  }
  // Get Incomes ///////////////////

  useEffect(() => {
    const getAllIncomes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/incomes/user/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        return response.data.income;
      } catch (err) {
        setError(
          err.response.data.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };
    const getThisIncomes = async () => {
      const allIncomes = await getAllIncomes();

      if (allIncomes) setIncomes(allIncomes);

      setIsLoading(false);
      setCanLoadIncomes(true);
      setMonth(name);
    };
    getThisIncomes();
  }, [uid, auth.token, setCanLoadIncomes]);

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  let noIncomes = false;
  const noMonths = (
    <p className="no__incomes">
      There are no incomes for this period, <br /> please select another month
    </p>
  );

  const setMonthHandler = thisMonth => {
    setMonth(thisMonth);
  };
  const openModalHandler = e => setOpenModal(true);

  let filteredIncomes;
  if (incomes) {
    filteredIncomes = incomes.filter(income => {
      return income.month === month;
    });

    if (filteredIncomes.length === 0) {
      noIncomes = true;
    }
  }

  let dates;
  if (incomes) {
    incomes.map(income => {
      const date = new Date(income.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dates = [day, month, year].join('/');
      return dates;
    });
  }

  incomes?.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (incomes) {
    incomes.map(income => {
      const date = new Date(income.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dates = [day, month, year].join('/');
      income.date = dates;

      return income.date;
    });
  }

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
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="income__container"
      >
        <button className="create__income" onClick={openModalHandler}>
          Create income
        </button>
        {openModal && <NewIncome incomes={incomes} closeModal={setOpenModal} />}
        <SortIncome setMonthHandler={setMonthHandler} />

        <div className="income__list">
          {firstIncome && (
            <div className="get__started">Create an income to get started</div>
          )}
          {month && noIncomes && noMonths}

          {!incomes && !isLoading && (
            <div className="get__started">Create an income to get started</div>
          )}

          {month &&
            filteredIncomes?.map(income => (
              <div key={income?.id} className="incomes__container">
                <Link className="link" to={`/edit/income/${income?.id}`}>
                  <ul className="list__container">
                    <li className="income__date">{income?.date}</li>
                    <li className="income__type">{income?.type}</li>
                    <li className="income__amount">
                      {income?.ammount.toLocaleString()} €
                    </li>
                  </ul>
                </Link>
              </div>
            ))}
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default Income;
