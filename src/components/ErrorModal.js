import React from 'react';
import { motion } from 'framer-motion';
import './ErrorModal.css';

function ErrorModal({ error, closeModalHandler, errorHandler }) {
  const closeHandler = () => {
    errorHandler();
    closeModalHandler();
  };

  return (
    <div className="backdrop">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="modal"
      >
        <button className="close__modal" onClick={closeHandler}>
          X
        </button>
        <div className="title">
          <h1 className="modal__header error__header">Error</h1>
        </div>
        <div className="body">
          <p className="error__message__modal">{error}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default ErrorModal;
