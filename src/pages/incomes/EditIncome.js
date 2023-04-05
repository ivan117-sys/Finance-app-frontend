import React, { useState, useEffect, useContext } from 'react';
import './Edit.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';

function EditIncome({ setIncomeId }) {
  const [editAmmount, setEditAmmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editMonth, setMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);
  const [income, setIncome] = useState();
  const [canLoadIncomes, setCanLoadIncomes] = useState(false);

  const auth = useContext(AuthContext);
  const params = useParams();

  const navigate = useNavigate();
  // Get incomes

  useEffect(() => {
    const getIncome = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/incomes/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setCanLoadIncomes(true);
        setIncomeId(params.id);
        return response.data.income;
      } catch (err) {
        setError(
          err.response.data.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };
    const getThisIncome = async () => {
      const income = await getIncome();
      if (income) setIncome(income);
      setIsLoading(false);
    };
    getThisIncome();
  }, [params.id, setIncomeId, auth.token]);

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  const editAmmountHandler = e => {
    setEditAmmount(e.target.value);
  };

  const editCategoryHandler = e => {
    setEditCategory(e.target.value);
  };

  const monthHandler = e => setMonth(e.target.value);

  // Update incomes
  const updateHandler = async e => {
    e.preventDefault();

    let type, ammount, month;
    if (editAmmount.length === 0) {
      ammount = income.ammount;
    } else {
      ammount = editAmmount;
    }

    if (editCategory.length === 0) {
      type = income.type;
    } else {
      type = editCategory;
    }

    if (editMonth.length === 0) {
      month = income.month;
    } else {
      month = editMonth;
    }

    const newIncome = {
      id: params.id,
      type,
      ammount,
      month,
    };

    try {
      setIsLoading(true);
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/incomes/${income.id}`,
        newIncome,
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

    navigate('/income');
  };

  // Delete incomes
  const deleteIncomeHandler = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/incomes/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      navigate('/income');
      setCanLoadIncomes(true);
      setIsLoading(true);
    } catch (err) {
      setError(
        err.response.data.message || 'Something went wrong, please try again'
      );
      setIsLoading(false);
    }
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
      {canLoadIncomes && (
        <div className="income__container">
          <form className="editForm" onSubmit={updateHandler}>
            <label className="update__income" htmlFor="income">
              Change income ammount {income?.ammount} €
            </label>
            <input
              type="number"
              id="income"
              value={editAmmount}
              onChange={editAmmountHandler}
            ></input>
            <label className="update__income">
              Change category {income.type}
            </label>
            <select
              name="source"
              value={editCategory}
              onChange={editCategoryHandler}
            >
              <option value="">Please choose </option>
              <option value="salary">Salary</option>
              <option value="investment">Investment</option>
              <option value="rent">Rent</option>
              <option value="gift">Gift</option>
              <option value="interest">Interest</option>
              <option value="seling">Seling</option>
            </select>
            <label className="update__income">
              Change month {income.month}
            </label>
            <select name="source" value={editMonth} onChange={monthHandler}>
              <option value="">Please choose </option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="august">August</option>
              <option value="september">September</option>

              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
            <button className="form__button">Update</button>
            <button onClick={deleteIncomeHandler} className="expenses__button">
              Delete
            </button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default EditIncome;
