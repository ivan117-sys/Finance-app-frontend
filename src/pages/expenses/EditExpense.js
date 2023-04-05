import React, { useState, useEffect, useContext } from 'react';
import '.././incomes/Edit.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import './EditExpenses.css';
import { AuthContext } from '../../shared/auth-context';

function EditExspense({ setExpenseId }) {
  const [editAmmount, setEditAmmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [expense, setExpense] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);
  const [editMonth, setMonth] = useState('');

  const auth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  // Get expenses

  useEffect(() => {
    const getExpense = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + `/expenses/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setExpenseId(params.id);
        return response.data.expense;
      } catch (err) {
        setError(
          err.response.data.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };
    const getThisExpense = async () => {
      const expense = await getExpense();
      if (expense) setExpense(expense);
      setIsLoading(false);
    };
    getThisExpense();
  }, [params.id, setExpenseId]);

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

  // Update expenses
  const updateHandler = async e => {
    e.preventDefault();

    let type, ammount, month;
    if (editAmmount.length === 0) {
      ammount = expense.ammount;
    } else {
      ammount = editAmmount;
    }

    if (editCategory.length === 0) {
      type = expense.type;
    } else {
      type = editCategory;
    }

    if (editMonth.length === 0) {
      month = expense.month;
    } else {
      month = editMonth;
    }

    const newExpense = {
      id: params.id,
      type,
      ammount,
      month,
    };

    try {
      setIsLoading(true);
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/expenses/${expense.id}`,
        newExpense,
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
    navigate('/expenses');
  };

  // Delete expenses
  const deleteExpenseHandler = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/expenses/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // onDeleteIncome(incomeEdit[0].id);
      navigate('/expenses');

      // window.location.reload();
    } catch (err) {
      setError(
        err.response.data.message || 'Something went wrong, please try again'
      );
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="income__container">
        {isLoading && <LoadingSpinner asOverlay />}
        {error && closeModal && (
          <ErrorModal
            closeModalHandler={closeModalHandler}
            error={error}
            errorHandler={errorHandler}
          />
        )}
        <form className="edit__form">
          <label className="edit__expenses" htmlFor="income">
            Change expense ammount {expense.ammount} €
          </label>
          <input
            type="text"
            id="income"
            value={editAmmount}
            onChange={editAmmountHandler}
          ></input>
          <label className="edit__expenses">
            Change category {expense.type}
          </label>
          <input
            name="source"
            value={editCategory}
            onChange={editCategoryHandler}
          ></input>
          <label className="edit__expenses">Change month {expense.month}</label>
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
          <button className="form__button" onClick={updateHandler}>
            Update
          </button>
          <button onClick={deleteExpenseHandler} className="expenses__button">
            Delete
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EditExspense;
