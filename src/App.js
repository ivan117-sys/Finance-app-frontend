import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Signup from './pages/signup/Signup';
import Budget from './pages/budget/Budget';
import Expenses from './pages/expenses/Expenses';
import Income from './pages/incomes/Income';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Crypto from './pages/crypto/Crypto';
import Header from './components/Header';
import Aside from './components/Navigation';
import EditIncome from './pages/incomes/EditIncome';
import EditExspense from './pages/expenses/EditExpense';
import IncomesChart from './pages/incomesChart/IncomesChart';
import ExpensesChart from './pages/expensesCharts/ExpensesChart';
import Footer from './components/Footer';
import { AuthContext } from './shared/auth-context';
import { useAuth } from './hooks/auth-hook';
import './App.css';

function App() {
  const [allIncomes, setAllIncomes] = useState();
  const [allExpenses, setAllExpenses] = useState();
  const [incomeId, setIncomeId] = useState(false);
  const [expenseId, setExpenseId] = useState(false);
  const [name, setName] = useState(false);

  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        incomeId: incomeId,
        login: login,
        logout: logout,
        expenseId: expenseId,
        name: name,
      }}
    >
      <AnimatePresence>
        <div className="app">
          {token && <Header />}
          <main className="main">
            <Aside allIncomes={allIncomes} allExpenses={allExpenses} />
            <Routes>
              {!token && (
                <Route path="/" element={<Login setName={setName} />} />
              )}
              {!token && (
                <Route
                  path="/signup"
                  element={<Signup setNameSignup={setName} />}
                />
              )}
              {token && (
                <Route
                  path="/main"
                  element={
                    <Main
                      setAllIncomes={setAllIncomes}
                      setAllExpenses={setAllExpenses}
                    />
                  }
                />
              )}
              {token && (
                <Route
                  path="/budget"
                  element={<Budget expenses={allExpenses} />}
                />
              )}
              {token && <Route path="/income" element={<Income />} />}
              {token && (
                <Route
                  path="/income/chart"
                  element={<IncomesChart incomes={allIncomes} />}
                />
              )}
              {token && <Route path="/expenses" element={<Expenses />} />}
              {token && (
                <Route
                  path="/edit/income/:id"
                  element={<EditIncome setIncomeId={setIncomeId} />}
                />
              )}
              {token && (
                <Route
                  path="/edit/exspense/:id"
                  element={<EditExspense setExpenseId={setExpenseId} />}
                />
              )}
              {token && (
                <Route
                  path="/expense/chart"
                  element={<ExpensesChart expenses={allExpenses} />}
                />
              )}
              {token && <Route path="/crypto" element={<Crypto />} />}
            </Routes>
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export default App;
