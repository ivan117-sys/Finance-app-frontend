import React, { useState } from 'react';
import '../incomes/NewIncome.css';
import './SortExpenses.css';

function SortBudget({ setMonthHandler }) {
  const [thisMonth, setThisMonth] = useState();
  const monthHandler = e => {
    setThisMonth(e.target.value);
  };

  const clickHandler = e => {
    setMonthHandler(thisMonth);
  };

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
  let name = month[d.getMonth()];

  return (
    <div className="sort__container sort__budget">
      <label className="budge__label"></label>
      <select
        className="sort__budget sort__select select__yellow"
        name="source"
        value={thisMonth}
        onChange={monthHandler}
        onClick={clickHandler}
        onTouchEnd={clickHandler}
        initialvalue={name}
      >
        <option value={name.toLowerCase()}>{name}</option>
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
    </div>
  );
}

export default SortBudget;
