import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../shared/auth-context';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

function MainGoals({ expenses, month, lastMonth, incomes }) {
  const [budget, setBudget] = useState();
  const [setCanLoadBudget] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);

  const auth = useContext(AuthContext);
  const uid = auth.userId;

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };
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
    };
    getThisBudget();
  }, [uid, auth.token, setCanLoadBudget]);

  // Calculating expenses
  let thisMonthExpenses, mapedExpenses, totalMonthExpense;

  if (expenses) {
    thisMonthExpenses = expenses.filter(expense => {
      return expense.month === month;
    });

    mapedExpenses = thisMonthExpenses.map(expense => {
      return expense.ammount;
    });

    totalMonthExpense = mapedExpenses.reduce((acc, item) => {
      return (acc += item);
    }, 0);
  }

  let lastMonthExpenses, mapedLastMonthExpenses, totalLastMonthExpenses;

  if (expenses) {
    lastMonthExpenses = expenses.filter(expense => {
      return expense.month === lastMonth;
    });

    mapedLastMonthExpenses = lastMonthExpenses.map(expense => {
      return expense.ammount;
    });

    totalLastMonthExpenses = mapedLastMonthExpenses.reduce((acc, item) => {
      return (acc += item);
    }, 0);
  }

  let finalExpenses;

  finalExpenses = (totalLastMonthExpenses / totalMonthExpense) * 100 - 100;

  let equalExpenses = false;
  if (totalMonthExpense === totalLastMonthExpenses) {
    equalExpenses = true;
  }

  let expensesLowerThanLastMonth;
  if (totalMonthExpense <= totalLastMonthExpenses) {
    expensesLowerThanLastMonth = true;
  }

  const absExpenses = Math.abs(finalExpenses).toFixed(2);

  const higherLower =
    totalLastMonthExpenses > totalMonthExpense ? 'lower' : 'higher';

  const redGreen = totalLastMonthExpenses > totalMonthExpense ? 'green' : 'red';

  // Calculating Budget
  const budgetAmount = budget?.map(budget => budget.ammount);

  const totalBudget = budgetAmount - totalMonthExpense;

  const biggerBudget = (
    <div className="expenses__goals">
      <p>
        You still have
        <span className="budget__goal__green"> €{totalBudget.toFixed(2)} </span>
        to spend this month
      </p>
    </div>
  );
  let leftToSpend = false;
  if (totalBudget > 0) {
    leftToSpend = true;
  }

  let spendingLimit = false;
  if (totalBudget === 0) {
    spendingLimit = true;
  }

  const limitBudget = (
    <div className="expenses__goals">
      <p>
        You are at
        <span className="budget__goal__green"> budget </span>spending limit
      </p>
    </div>
  );

  let overspendBudget = false;
  if (budgetAmount < totalMonthExpense) {
    overspendBudget = true;
  }

  let biggerBudgetThanExpenses = false;
  if (budgetAmount >= totalMonthExpense) {
    biggerBudgetThanExpenses = true;
  }

  const absBudget = Math.abs(totalBudget);

  const overBudget = (
    <div className="expenses__goals">
      <p>
        you have overspend your budget by
        <span className="budget__goal__red"> €{absBudget.toFixed(2)}</span>
      </p>
    </div>
  );

  // Calculating incomes
  let thisMonthIncomes, mapedIncomes, totalMonthIncomes;

  if (incomes) {
    thisMonthIncomes = incomes.filter(incomes => {
      return incomes.month === month;
    });

    mapedIncomes = thisMonthIncomes.map(incomes => {
      return incomes.ammount;
    });

    totalMonthIncomes = mapedIncomes.reduce((acc, item) => {
      return (acc += item);
    }, 0);
  }

  let lastMonthIncomes, mapedLastMonthIncomes, totalLastMonthIncomes;

  if (incomes) {
    lastMonthIncomes = incomes.filter(income => {
      return income.month === lastMonth;
    });

    mapedLastMonthIncomes = lastMonthIncomes.map(income => {
      return income.ammount;
    });

    totalLastMonthIncomes = mapedLastMonthIncomes.reduce((acc, item) => {
      return (acc += item);
    }, 0);
  }

  let finalIncomes;

  finalIncomes = (totalLastMonthIncomes / totalMonthIncomes) * 100 - 100;

  let equalIncomes = false;
  if (totalMonthIncomes === totalLastMonthIncomes) {
    equalIncomes = true;
  }

  let incomesHigherThanLastMonth = false;
  if (totalMonthIncomes >= totalLastMonthIncomes) {
    incomesHigherThanLastMonth = true;
  }

  const absIncomes = Math.abs(finalIncomes).toFixed(2);

  const higherLowerIncomes =
    totalLastMonthIncomes > totalMonthIncomes ? 'lower' : 'higher';

  const redGreenIncomes =
    totalLastMonthIncomes < totalMonthIncomes ? 'green' : 'red';

  const totalIncomesExpenses =
    (totalMonthIncomes / totalMonthExpense) * 100 - 100;

  const absTotalIncomeExpenses = Math.abs(totalIncomesExpenses).toFixed(2);

  const higherLowerIncomesExpenses =
    totalMonthIncomes > totalMonthExpense ? 'higher' : 'lower';

  const redGreenIncomesExpenses =
    totalMonthIncomes < totalMonthExpense ? 'red' : 'green';

  let biggerIncomesthanExpenses = false;
  if (totalMonthIncomes > totalMonthExpense) {
    biggerIncomesthanExpenses = true;
  }

  let equalIncomesExpenses = false;
  if (totalMonthIncomes === totalMonthExpense) {
    equalIncomesExpenses = true;
  }

  const AllGoalsCompleted =
    biggerBudgetThanExpenses &&
    expensesLowerThanLastMonth &&
    incomesHigherThanLastMonth &&
    biggerIncomesthanExpenses;

  const goalsCompleted =
    biggerBudgetThanExpenses &&
    expensesLowerThanLastMonth &&
    incomesHigherThanLastMonth &&
    biggerIncomesthanExpenses
      ? 'are'
      : 'are not';

  let noExpenses;
  if (totalMonthExpense === 0 || totalMonthExpense === undefined) {
    noExpenses = true;
  }

  let noIncomes;
  if (totalMonthIncomes === 0 || totalMonthIncomes === undefined) {
    noIncomes = true;
  }

  const absCompletedIncomes = absIncomes === 'Infinity' ? 100 : absIncomes;

  const absCompletedExpenses = absExpenses === 'Infinity' ? 100 : absExpenses;

  const absCompletedExpensesIncomes =
    absTotalIncomeExpenses === 'NaN' ? 0 : absTotalIncomeExpenses;

  let incomesLowerThanExpenses0 = false;
  if (absCompletedExpensesIncomes === 0) {
    incomesLowerThanExpenses0 = true;
  }

  return (
    <div className="monthly__goals__div">
      {isLoading && <LoadingSpinner asOverlay />}
      {error && closeModal && (
        <ErrorModal
          closeModalHandler={closeModalHandler}
          error={error}
          errorHandler={errorHandler}
        />
      )}
      <ul className="goals__list">
        <h3 className="stats__heading">Monthly stats</h3>

        <div className="incomes__expenses text__goals__div">
          <p className="expenses__goals text__goals">
            Check your stats regularly to see the progress:
          </p>
        </div>
        {noExpenses && noIncomes && !lastMonthIncomes && !lastMonthExpenses && (
          <div className="inomes__expenses">
            <p className="expenses__goals no__stats">
              Add expenses and incomes to see the stats
            </p>
          </div>
        )}
        {
          <div className="incomes__expenses">
            {!biggerIncomesthanExpenses &&
              !equalIncomesExpenses &&
              !incomesLowerThanExpenses0 && (
                <FontAwesomeIcon className="goals__icon" icon={faCircle} />
              )}
            {biggerIncomesthanExpenses && !incomesLowerThanExpenses0 && (
              <FontAwesomeIcon className="check__icon" icon={faCheck} />
            )}
            {equalIncomesExpenses && !incomesLowerThanExpenses0 && (
              <FontAwesomeIcon className="check__icon" icon={faCheck} />
            )}
            {incomesLowerThanExpenses0 && (
              <FontAwesomeIcon className="check__icon" icon={faCheck} />
            )}
            {!equalIncomesExpenses && (
              <p className="expenses__goals">
                Your incomes are {''}
                <span className={redGreenIncomesExpenses}>
                  {absCompletedExpensesIncomes}%{' '}
                </span>
                {higherLowerIncomesExpenses} than expenses
              </p>
            )}
            {equalIncomesExpenses && (
              <p className="expenses__goals">
                Your incomes are{' '}
                <span className="budget__goal__green"> equal</span> as expenses
              </p>
            )}
          </div>
        }
        <div className="incomes__expenses">
          {!incomesHigherThanLastMonth && (
            <FontAwesomeIcon className="goals__icon" icon={faCircle} />
          )}
          {incomesHigherThanLastMonth && (
            <FontAwesomeIcon className="check__icon" icon={faCheck} />
          )}
          {thisMonthIncomes && !equalIncomes && (
            <p className="expenses__goals">
              Incomes are{' '}
              <span className={redGreenIncomes}>{absCompletedIncomes}% </span>
              {higherLowerIncomes} than last month
            </p>
          )}
          {thisMonthIncomes && equalIncomes && (
            <p className="expenses__goals">
              Incomes are <span className="budget__goal__green"> equal</span> as
              last month
            </p>
          )}
        </div>
        <div className="incomes__expenses">
          {!expensesLowerThanLastMonth && (
            <FontAwesomeIcon className="goals__icon" icon={faCircle} />
          )}
          {expensesLowerThanLastMonth && (
            <FontAwesomeIcon className="check__icon" icon={faCheck} />
          )}
          {thisMonthExpenses && !equalExpenses && (
            <p className="expenses__goals">
              Expenses are{' '}
              <span className={redGreen}>{absCompletedExpenses}%</span>{' '}
              {higherLower} than last month
            </p>
          )}
          {thisMonthExpenses && equalExpenses && (
            <p className="expenses__goals">
              Expenses are <span className="budget__goal__green"> equal</span>{' '}
              as last month
            </p>
          )}
        </div>
        <div className="incomes__expenses">
          {!biggerBudgetThanExpenses && (
            <FontAwesomeIcon className="goals__icon" icon={faCircle} />
          )}
          {biggerBudgetThanExpenses && (
            <FontAwesomeIcon className="check__icon" icon={faCheck} />
          )}
          {budget && leftToSpend && biggerBudget}
          {budget && spendingLimit && limitBudget}
          {budget && overspendBudget && overBudget}
        </div>
        <div className="incomes__expenses">
          {!AllGoalsCompleted && (
            <FontAwesomeIcon className="goals__icon" icon={faCircle} />
          )}
          {AllGoalsCompleted && (
            <FontAwesomeIcon className="check__icon" icon={faCheck} />
          )}
          <p className="expenses__goals">
            All of your goals {goalsCompleted} completed
          </p>
        </div>
      </ul>
    </div>
  );
}

export default MainGoals;
