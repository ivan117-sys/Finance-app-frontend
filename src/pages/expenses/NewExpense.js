import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';
import { useNavigate } from 'react-router-dom';

function NewExpense({ closeModal }) {
  const [expense, setExpense] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const uid = auth.userId;

  const expenseHandler = e => setExpense(e.target.value);

  const closeModalHandler = e => closeModal(false);

  const categoryHandler = e => setCategory(e.target.value);

  const monthHandler = e => setMonth(e.target.value);

  // Add expenses
  const addExpenseHandler = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const request = {
        ammount: expense,
        type: category,
        month,
        creator: uid,
        date: '',
      };

      await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/expenses/user/${uid}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setIsLoading(false);
      window.location.reload();
      navigate('/expenses');
    } catch (err) {
      setError(
        err.response.data.message || 'Something went wrong, please try again'
      );
    }

    closeModal();
  };

  return (
    <div className="backdrop">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="modal"
      >
        {isLoading && <LoadingSpinner asOverlay />}
        {error && closeModal && (
          <ErrorModal closeModalHandler={closeModalHandler} error={error} />
        )}
        <button onClick={closeModalHandler} className="close__modal">
          X
        </button>
        <div className="title">
          <h1 className="modal__header">Add your expense</h1>
        </div>
        <div className="body">
          <form onSubmit={addExpenseHandler}>
            <label htmlFor="income">My expense ammount</label>
            <input
              type="number"
              id="income"
              value={expense}
              onChange={expenseHandler}
              required
            ></input>
            <span className="error__message expense__error">
              Please enter valid ammount
            </span>
            <label>Category</label>
            <input
              className="category__input"
              name="source"
              value={category}
              onChange={categoryHandler}
              required
              type="text"
            ></input>
            <span className="error__category expense__error">
              Please enter valid category
            </span>
            <label>Month</label>
            <select
              name="source"
              value={month}
              onChange={monthHandler}
              required
              className="month__select"
            >
              <option value="">Please choose </option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>

              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
            <span className="error__month expense__error">
              Please enter valid month
            </span>

            <button className="form__button">Submit</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default NewExpense;
