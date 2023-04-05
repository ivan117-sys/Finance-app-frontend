import React, { useState, useEffect, useContext } from 'react';
import NewBudget from './NewBudget';
import SortBudget from './SortBudget';
import axios from 'axios';
import { AuthContext } from '../../shared/auth-context';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import './Budget.css';
import { motion } from 'framer-motion';

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

function Budget() {
  const [openModal, setOpenModal] = useState(false);
  const [expenses, setExpenses] = useState(false);
  const [month, setMonth] = useState(name);
  const [budget, setBudget] = useState();
  const [canLoadBudget, setCanLoadBudget] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);

  const auth = useContext(AuthContext);
  const uid = auth.userId;

  // Get Budget ///////////////////

  useEffect(() => {
    const getBudget = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/budget/user/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        return response.data.budget;
      } catch (err) {
        setError(
          err.response.data.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };
    const getThisBudget = async () => {
      const budget = await getBudget();
      if (budget) setBudget(budget);

      setIsLoading(false);
      setCanLoadBudget(true);
    };
    getThisBudget();
  }, [uid, auth.token]);

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

      setIsLoading(false);
    };
    getThisExpenses();
  }, [uid, auth.token]);

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  const openModalHandler = e => setOpenModal(true);

  const setMonthHandler = thisMonth => {
    setMonth(thisMonth);
  };

  let filteredExpenses, totalExpense;
  if (expenses) {
    filteredExpenses = expenses.filter(expense => {
      return expense.month === month;
    });

    const expense = filteredExpenses.map(expense => expense.ammount);

    totalExpense = expense.reduce((acc, item) => {
      return (acc += item);
    }, 0);
  }

  if (budget) {
  }

  let leftToSpend;
  if (totalExpense && budget) {
    leftToSpend = budget[0].ammount - totalExpense;
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
        className="budget__container"
      >
        <button className="create__budget" onClick={openModalHandler}>
          Create budget
        </button>
        {openModal && (
          <NewBudget closeModal={setOpenModal} prevBudget={budget} />
        )}
        <SortBudget setMonthHandler={setMonthHandler} />
        {!budget && !isLoading && (
          <div className="get__started budget__start">
            Create an budget to get started
          </div>
        )}

        <h3 className="stats__heading budget__stats">Monthly stats</h3>

        <div className="incomes__expenses text__goals__div">
          <p className="expenses__goals budget__paragarph">
            Here you can check your budget balance:
          </p>
        </div>
        <div className=" budget__div">
          <p className="total__text budget__text">Your budget </p>
          {canLoadBudget && budget && (
            <p className="text__income budget__number">
              €{budget[0].ammount?.toLocaleString()}
            </p>
          )}
        </div>
        <div className="budget__expense">
          <p className="total__text budget__text">Your expenses </p>
          {canLoadBudget && budget && expenses && (
            <p className="text__expense budget__number">
              €{totalExpense?.toLocaleString()}
            </p>
          )}
        </div>
        <div className="budget__left">
          <p className="total__text budget__text ">Left to spend</p>
          {canLoadBudget && budget && expenses && (
            <p className="text__balance budget__number">
              €{leftToSpend?.toLocaleString()}
            </p>
          )}
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default Budget;
