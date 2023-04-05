import React, { useState, useContext } from 'react';
import { AuthContext } from '../../shared/auth-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';

function NewBudget({ prevBudget, closeModal }) {
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const uid = auth.userId;

  const closeModalHandler = e => closeModal(false);
  const budgetHandler = e => setBudget(e.target.value);
  const errorHandler = () => {
    setError(null);
  };

  // Add Budget
  const addBudgetHandler = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const request = {
        ammount: budget,
        creator: uid,
      };

      await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/budget/user/${uid}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setIsLoading(false);
      window.location.reload();
      navigate('/budget');
    } catch (err) {
      setError(
        err.response.data.message || 'Something went wrong, please try again'
      );
    }

    closeModal();
  };

  // Update Budget
  const updateHandler = async e => {
    e.preventDefault();

    let ammount;
    if (budget.length === 0) {
      ammount = prevBudget[0].ammount;
    } else {
      ammount = +budget;
    }

    const newBudget = {
      ammount,
    };

    try {
      setIsLoading(true);
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/budget/${uid}`,
        newBudget,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (err) {
      setError(
        err.response.data.message || 'Something went wrong, please try again'
      );
      setIsLoading(false);
    }

    navigate('/budget');
    window.location.reload();
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
          <ErrorModal
            closeModalHandler={closeModalHandler}
            error={error}
            errorHandler={errorHandler}
          />
        )}
        <button onClick={closeModalHandler} className="close__modal">
          X
        </button>
        <div className="title">
          <h1 className="modal__header"> Monthly budget</h1>
        </div>
        <div className="body new__budget__div">
          <form onSubmit={addBudgetHandler}>
            <label htmlFor="income">Change budget</label>
            <input
              type="number"
              id="income"
              value={budget}
              onChange={budgetHandler}
              required
            ></input>
            <span className="error__message">Please enter valid ammount</span>
            {!prevBudget && (
              <button className="form__button">Create Budget</button>
            )}
            {prevBudget && (
              <button onClick={updateHandler} className="form__button">
                Update Budget
              </button>
            )}
          </form>
        </div>
        <div className="footer">coding.map</div>
      </motion.div>
    </div>
  );
}

export default NewBudget;
