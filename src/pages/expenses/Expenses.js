import React, { useState, useContext, useEffect } from 'react';
import NewExpense from './NewExpense';
import SortExpense from './SortExpense';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';
import './Expenses.css';

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

function Expenses({ onAddExpense }) {
  const [openModal, setOpenModal] = useState(false);
  const [expenses, setExpenses] = useState();
  const [month, setMonth] = useState();
  const [, setCanLoadExpenses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);
  const auth = useContext(AuthContext);
  const uid = auth.userId;

  const setMonthHandler = thisMonth => {
    setMonth(thisMonth);
  };

  expenses?.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
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
      setCanLoadExpenses(true);
      setMonth(name);
    };
    getThisExpenses();
  }, [uid, auth.token, setCanLoadExpenses]);

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  const openModalHandler = e => setOpenModal(true);

  let filteredExpenses;
  let noExpenses = false;
  if (expenses) {
    filteredExpenses = expenses.filter(expense => {
      return expense.month === month;
    });
    if (filteredExpenses.length === 0) {
      noExpenses = true;
    }
  }

  const noMonths = (
    <p className="no__incomes">
      There are no expenses for this period please select another month
    </p>
  );

  let dates;
  if (expenses) {
    expenses.map(expense => {
      const date = new Date(expense.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dates = [day, month, year].join('/');
      return dates;
    });
  }

  if (expenses) {
    expenses.map(expense => {
      const date = new Date(expense.createdAt);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      dates = [day, month, year].join('/');

      expense.date = dates;

      return expense.date;
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
        <button className="create__exspense" onClick={openModalHandler}>
          Create expense
        </button>

        {openModal && (
          <NewExpense
            expense={expenses}
            onAddExpense={onAddExpense}
            closeModal={setOpenModal}
          />
        )}

        <SortExpense setMonthHandler={setMonthHandler} />

        <div className="income__list">
          {month && noExpenses && noMonths}

          {!expenses && !isLoading && (
            <div className="get__started">Create an expense to get started</div>
          )}
          {month &&
            expenses &&
            filteredExpenses?.map(expense => (
              <div key={expense?.id} className="incomes__container">
                <Link className="link" to={`/edit/exspense/${expense?.id}`}>
                  <ul className="list__exspense__container">
                    <li className="income__date">{expense?.date}</li>
                    <li className="income__type">{expense?.type}</li>
                    <li className="expense__ammount">
                      {expense?.ammount.toLocaleString()} €
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

export default Expenses;
