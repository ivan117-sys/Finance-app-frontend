import React, { useState, useEffect, useContext } from 'react';
import PieChart from './PieChart';
import axios from 'axios';
import { Chart } from 'chart.js';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';
import './ExpensesChart.css';

const expensesObject = [
  {
    ammount: 0,
    month: '01',
  },

  {
    ammount: 0,
    month: '02',
  },
  {
    ammount: 0,
    month: '03',
  },
  {
    ammount: 0,
    month: '04',
  },
  {
    ammount: 0,
    month: '05',
  },
  {
    ammount: 0,
    month: '06',
  },
  {
    ammount: 0,
    month: '07',
  },
  {
    ammount: 0,
    month: '08',
  },
  {
    ammount: 0,
    month: '09',
  },
  {
    ammount: 0,
    month: '10',
  },
  {
    ammount: 0,
    month: '11',
  },
  {
    ammount: 0,
    month: '12',
  },
];

const currentYear = new Date().getFullYear();

function ExpensesChart({ expenses }) {
  const [userData, setUserData] = useState();
  const [CanLoadExpenses, setCanLoadExpenses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);
  const [allExpenses, setAllExpenses] = useState();

  const auth = useContext(AuthContext);
  const uid = auth.userId;

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };
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
      if (allExpenses) setAllExpenses(allExpenses);
      setIsLoading(false);
      setCanLoadExpenses(true);
    };
    getThisExpenses();
  }, [uid]);

  // GROUPING EXPENSES INTO MONTHS ////////

  // January joining ammounts
  const oneJanuary = allExpenses?.filter(
    expense => expense.month === 'january'
  );

  const oneJanuaryYear = oneJanuary?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapJanuary = oneJanuaryYear?.map(month => month.ammount);

  const reduceJanuary = mapJanuary?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[0].ammount = reduceJanuary;

  // February joining ammounts
  const oneFebruary = allExpenses?.filter(
    expense => expense.month === 'february'
  );

  const oneFebruaryYear = oneFebruary?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapFebruary = oneFebruaryYear?.map(month => month.ammount);

  const reduceFebruary = mapFebruary?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[1].ammount = reduceFebruary;

  // March joining ammounts
  const oneMarch = allExpenses?.filter(expense => expense.month === 'march');

  const oneMarchYear = oneMarch?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapMarch = oneMarchYear?.map(month => month.ammount);

  const reduceMarch = mapMarch?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[2].ammount = reduceMarch;

  // April joining ammounts
  const oneApril = allExpenses?.filter(expense => expense.month === 'april');

  const oneAprilYear = oneApril?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapApril = oneAprilYear?.map(month => month.ammount);

  const reduceApril = mapApril?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[3].ammount = reduceApril;

  // May joining ammounts
  const oneMay = allExpenses?.filter(expense => expense.month === 'may');

  const oneMayYear = oneMay?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapMay = oneMayYear?.map(month => month.ammount);

  const reduceMay = mapMay?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[4].ammount = reduceMay;

  // June joining ammounts
  const oneJune = allExpenses?.filter(expense => expense.month === 'june');

  const oneJuneYear = oneJune?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapJune = oneJuneYear?.map(month => month.ammount);

  const reduceJune = mapJune?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[5].ammount = reduceJune;

  // July joining ammounts
  const oneJuly = allExpenses?.filter(expense => expense.month === 'july');

  const oneJulyYear = oneJuly?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapJuly = oneJulyYear?.map(month => month.ammount);

  const reduceJuly = mapJuly?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[6].ammount = reduceJuly;

  // August joining ammounts
  const oneAugust = allExpenses?.filter(expense => expense.month === 'august');

  const oneAugustYear = oneJanuary?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapAugust = oneAugustYear?.map(month => month.ammount);

  const reduceAugust = mapAugust?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[7].ammount = reduceAugust;

  // September joining ammounts
  const oneSeptember = allExpenses?.filter(
    expense => expense.month === 'september'
  );

  const oneSeptemberYear = oneSeptember?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapSeptember = oneSeptemberYear?.map(month => month.ammount);

  const reduceSeptember = mapSeptember?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[8].ammount = reduceSeptember;

  // October joining ammounts
  const oneOctober = allExpenses?.filter(
    expense => expense.month === 'october'
  );

  const oneOctoberYear = oneOctober?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapOctober = oneOctoberYear?.map(month => month.ammount);

  const reduceOctober = mapOctober?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[9].ammount = reduceOctober;

  // November joining ammounts
  const oneNovember = allExpenses?.filter(
    expense => expense.month === 'november'
  );

  const oneNovemberYear = oneNovember?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapNovember = oneNovemberYear?.map(month => month.ammount);

  const reduceNovember = mapNovember?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[10].ammount = reduceNovember;

  // December joining ammounts
  const oneDecember = allExpenses?.filter(
    expense => expense.month === 'december'
  );

  const oneDecemberYear = oneDecember?.filter(expense => {
    const d = new Date(expense.createdAt);
    const year = d.getFullYear();
    expense.date = year;

    return expense.date === currentYear;
  });

  const mapDecember = oneDecemberYear?.map(month => month.ammount);

  const reduceDecember = mapDecember?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  expensesObject[11].ammount = reduceDecember;

  const data = {
    labels: expensesObject?.map(data => data.month),
    datasets: [
      {
        label: 'Expenses',
        data: expensesObject?.map(data => data.ammount),
        backgroundColor: ['#fe8078'],
        hoverBackgroundColor: '#E0115F',
      },
    ],
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
      <div className="chart__container">
        <div className="chart__text__container">
          <p className="chart__text">Yearly expenses chart</p>
        </div>
        {!allExpenses && !isLoading && (
          <div className="get__started">
            Hi, create expenses to see the chart
          </div>
        )}
        <PieChart userData={data} />
      </div>
    </React.Fragment>
  );
}

export default ExpensesChart;
