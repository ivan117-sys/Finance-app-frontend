import React, { useState, useEffect, useContext } from 'react';
import BarChart from './BarChart';
import { Chart } from 'chart.js';
import { AuthContext } from '../../shared/auth-context';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import './IncomeChart.css';

const incomesObject = [
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

Chart.defaults.color = '#D3D3D3';
function IncomesChart() {
  const [allIncomes, setAllIncomes] = useState();
  const [canLoadIncomes, setCanLoadIncomes] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [closeModal, setCloseModal] = useState(false);

  const auth = useContext(AuthContext);

  const uid = auth.userId;

  let incomesLength = false;
  if (allIncomes?.length === 0) {
    incomesLength = true;
  }

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

        return response.data?.income;
      } catch (err) {
        setError(
          err.response?.data.message || 'Something went wrong, please try again'
        );
        setIsLoading(false);
      }
    };
    const getThisIncomes = async () => {
      const allIncomes = await getAllIncomes();

      if (allIncomes) setAllIncomes(allIncomes);

      setIsLoading(false);
      setCanLoadIncomes(true);
    };
    getThisIncomes();
  }, [uid]);

  // GROUPING INCOMES INTO MONTHS ////////

  // January joining ammounts
  const oneJanuary = allIncomes?.filter(income => income.month === 'january');

  const oneJanuaryYear = oneJanuary?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });

  const mapJanuary = oneJanuaryYear?.map(month => month.ammount);

  const reduceJanuary = mapJanuary?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[0].ammount = reduceJanuary;

  // February joining ammounts
  const oneFebruary = allIncomes?.filter(income => income.month === 'february');
  const oneFebruaryYear = oneFebruary?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapFebruary = oneFebruaryYear?.map(month => month.ammount);

  const reduceFebruary = mapFebruary?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[1].ammount = reduceFebruary;

  // March joining ammounts
  const oneMarch = allIncomes?.filter(income => income.month === 'march');

  const oneMarchYear = oneMarch?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapMarch = oneMarchYear?.map(month => month.ammount);

  const reduceMarch = mapMarch?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[2].ammount = reduceMarch;

  // /////////////////

  // April joining ammounts
  const oneApril = allIncomes?.filter(income => income.month === 'april');
  const oneAprilYear = oneApril?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapApril = oneAprilYear?.map(month => month.ammount);

  const reduceApril = mapApril?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[3].ammount = reduceApril;

  const errorHandler = () => {
    setError(null);
  };
  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  // May joining ammounts
  const oneMay = allIncomes?.filter(income => income.month === 'may');

  const oneMayYear = oneMay?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapMay = oneMayYear?.map(month => month.ammount);

  const reduceMay = mapMay?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[4].ammount = reduceMay;

  // June joining ammounts
  const oneJune = allIncomes?.filter(income => income.month === 'june');
  const oneJuneYear = oneJune?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapJune = oneJuneYear?.map(month => month.ammount);

  const reduceJune = mapJune?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[5].ammount = reduceJune;

  // July joining ammounts
  const oneJuly = allIncomes?.filter(income => income.month === 'july');
  const oneJulyYear = oneJuly?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapJuly = oneJulyYear?.map(month => month.ammount);

  const reduceJuly = mapJuly?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[6].ammount = reduceJuly;

  // August joining ammounts
  const oneAugust = allIncomes?.filter(income => income.month === 'august');
  const oneAugustYear = oneAugust?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapAugust = oneAugustYear?.map(month => month.ammount);

  const reduceAugust = mapAugust?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[7].ammount = reduceAugust;

  // September joining ammounts
  const oneSeptember = allIncomes?.filter(
    income => income.month === 'september'
  );
  const oneSeptemberYear = oneSeptember?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapSeptember = oneSeptemberYear?.map(month => month.ammount);

  const reduceSeptember = mapSeptember?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[8].ammount = reduceSeptember;

  // October joining ammounts
  const oneOctober = allIncomes?.filter(income => income.month === 'october');
  const oneOctoberYear = oneOctober?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapOctober = oneOctoberYear?.map(month => month.ammount);

  const reduceOctober = mapOctober?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[9].ammount = reduceOctober;

  // November joining ammounts
  const oneNovember = allIncomes?.filter(income => income.month === 'november');
  const oneNovemberYear = oneNovember?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapNovember = oneNovemberYear?.map(month => month.ammount);

  const reduceNovember = mapNovember?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[10].ammount = reduceNovember;

  // December joining ammounts
  const oneDecember = allIncomes?.filter(income => income.month === 'december');
  const oneDecemberYear = oneDecember?.filter(income => {
    const d = new Date(income.createdAt);
    const year = d.getFullYear();
    income.date = year;

    return income.date === currentYear;
  });
  const mapDecember = oneDecemberYear?.map(month => month.ammount);

  const reduceDecember = mapDecember?.reduce((acc, item) => {
    return (acc += item);
  }, 0);

  incomesObject[11].ammount = reduceDecember;

  // //////////////////////////////

  const data = {
    labels: incomesObject?.map(data => data.month),
    datasets: [
      {
        label: 'Incomes Gained',
        data: incomesObject?.map(data => data.ammount),
        backgroundColor: ['#03dac6'],
        hoverBackgroundColor: '#b0e0e6',
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
          <p className="chart__text">Yearly incomes chart</p>
        </div>

        {incomesLength && (
          <div className="get__started">
            Hi, create incomes to see the chart
          </div>
        )}
        <BarChart userData={data} />
      </div>
    </React.Fragment>
  );
}

export default IncomesChart;
