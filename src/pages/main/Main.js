import React, { useState, useContext, useEffect } from 'react';
import './Main.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';
import MainGoals from './MainGoals';

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

let lastName = month[d.getMonth() - 1].toLowerCase();

function Main({ setAllIncomes, setAllExpenses }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);
  const [incomes, setIncomes] = useState();
  const [expenses, setExpenses] = useState();
  const [month] = useState(name);
  const [lastMonth] = useState(lastName);

  const auth = useContext(AuthContext);
  const uid = auth.userId;

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

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
      setAllIncomes(allIncomes);
      setIsLoading(false);
    };
    getThisIncomes();
  }, [uid, setAllIncomes, auth.token]);

  // Get expenses

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/expenses/user/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        return response.data.expenses;
      } catch (err) {
        setError(
          err.response.data.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };
    const getThisExpenses = async () => {
      const allExpenses = await getAllExpenses();
      if (allExpenses) setExpenses(allExpenses);
      setAllExpenses(allExpenses);
      setIsLoading(false);
    };
    getThisExpenses();
  }, [uid, setAllExpenses, auth.token]);

  let totalIncome;
  if (incomes) {
    const income = incomes.map(income => {
      return income.ammount;
    });

    totalIncome = income.reduce((acc, item) => {
      return (acc += item);
    }, 0);
  }
  let balance, totalExpense;
  if (expenses) {
    const expense = expenses.map(expense => expense.ammount);

    totalExpense = expense.reduce((acc, item) => {
      return (acc += item);
    }, 0);
  }

  let totalsExpense = totalExpense === undefined ? 0 : totalExpense;

  let totalsIncome = totalIncome === undefined ? 0 : totalIncome;

  balance = totalsIncome - totalsExpense;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="main__container"
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {error && closeModal && (
        <ErrorModal
          closeModalHandler={closeModalHandler}
          error={error}
          errorHandler={errorHandler}
        />
      )}

      <MainGoals
        expenses={expenses}
        month={month}
        lastMonth={lastMonth}
        incomes={incomes}
      />
      <h3 className="stats__heading account__balance__stats">All time stats</h3>

      <div className="incomes__expenses text__goals__div">
        <p className="expenses__goals alltime__goals">
          Here you can check your account balance:
        </p>
      </div>
      <div className="total__income">
        <p className="total__text main__text">Total income</p>
        <p className="text__income">€{totalIncome?.toLocaleString() || 0}</p>
      </div>

      <div className="total__expense">
        <p className="total__text main__text">Total expense</p>
        <p className="text__expense">€{totalExpense?.toLocaleString() || 0}</p>
      </div>

      <div className="total__balance">
        <p className="total__text main__text">Your balance</p>
        <p className="text__balance">€{balance?.toLocaleString() || 0}</p>
      </div>
    </motion.div>
  );
}

export default Main;
