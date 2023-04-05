import React, { useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as Charts } from 'chart.js/auto';
import { Colors } from 'chart.js/auto';

import './BarChart.css';

function BarChart({ userData }) {
  return (
    <div className="bar__container">
      <Bar className="chart" data={userData} />
    </div>
  );
}

export default BarChart;
