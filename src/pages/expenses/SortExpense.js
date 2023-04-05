import React, { useState } from 'react';
import '../incomes/NewIncome.css';

function SortExpense({ setMonthHandler }) {
  const [thisMonth, setThisMonth] = useState();

  const monthHandler = e => {
    setThisMonth(e.target.value);
  };

  const clickHandler = e => {
    setMonthHandler(thisMonth);
  };

  return (
    <div className="sort__container">
      <select
        className="sort__select select__red"
        name="source"
        value={thisMonth}
        onChange={monthHandler}
        onClick={clickHandler}
        onTouchEnd={clickHandler}
      >
        <option value="">Sort by month</option>
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
    </div>
  );
}

export default SortExpense;
