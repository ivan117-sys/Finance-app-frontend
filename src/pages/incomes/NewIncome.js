import React, { useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';
import { useNavigate } from 'react-router-dom';
import './NewIncome.css';

function NewIncome({ closeModal }) {
  const [income, setIncome] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const uid = auth.userId;

  const incomeHandler = e => {
    const value = e.target.value.replace(',');
    console.log(value);
    setIncome(value);
  };

  const closeModalHandler = e => closeModal(false);

  const categoryHandler = e => setCategory(e.target.value);

  const monthHandler = e => setMonth(e.target.value);

  const errorHandler = () => {
    setError(null);
  };

  // Add incomes

  const addIncomeHandler = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const request = {
        ammount: income,
        type: category,
        month,
        creator: uid,
        date: '',
      };

      await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/incomes/user/${uid}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setIsLoading(false);
      window.location.reload();
      navigate('/income');
    } catch (err) {
      setError(
        err.response.data.message || 'Something went wrong, please try again'
      );
    }

    closeModal();
  };

  return (
    <React.Fragment>
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
            <h1 className="modal__header">Add your income</h1>
          </div>
          <div className="body">
            <form onSubmit={addIncomeHandler}>
              <label htmlFor="income">My income ammount</label>
              <input
                type="number"
                id="income"
                value={income}
                onChange={incomeHandler}
                name="ammount"
                required
                errormessage="yes"
                aria-required="false"
              ></input>
              <span className="error__message">Please enter valid ammount</span>
              <label>Category</label>
              <select
                className="category__select"
                type="text"
                name="category"
                value={category}
                onChange={categoryHandler}
                required
              >
                <option value="">Please choose </option>
                <option value="salary">Salary</option>
                <option value="investment">Investment</option>
                <option value="rent">Rent</option>
                <option value="gift">Gift</option>
                <option value="interest">Interest</option>
                <option value="seling">Seling</option>
              </select>
              <span className="error__select">Please enter valid category</span>
              <label>Month</label>
              <select
                type="text"
                name="month"
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
              <span className="error__month">Please enter valid month</span>
              <button className="form__button">Submit</button>
            </form>
          </div>
        </motion.div>
      </div>
    </React.Fragment>
  );
}

export default NewIncome;
