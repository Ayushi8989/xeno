"use client";
import { useState } from 'react';
import axios from 'axios';
import './audienceCreator.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AudienceCreator = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('');
  const [amountOperator, setAmountOperator] = useState('>=');
  const [visits, setVisits] = useState('');
  const [visitOperator, setVisitOperator] = useState('>=');
  const [logic, setLogic] = useState('AND');

  const handleSubmit = async () => {
    try {
      const amountNumber = Number(amount);
      const visitsNumber = Number(visits);

      const response = await axios.post(`${apiUrl}/segments/create`, {
        name,
        totalSpending: amountNumber, 
        totalSpendingOperator: amountOperator,
        visits: visitsNumber, 
        visitOperator,
        logic,
      });
      alert('Segment created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating segment:', error);
      alert('Error creating segment.');
    }
  };

  return (
    <div className="audience-creator">
      <h1>Create Audience Segment</h1>

      <div>
        <label>Segment name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
      </div>
      <div>
        <label>Customers with total spending (INR):</label>
        <input
          type="text"
          value={amountOperator}
          onChange={(e) => setAmountOperator(e.target.value)}
          placeholder=">="
        />
        <input
          type="Number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10000"
        />
      </div>

      <div>
        <label>Number of visits:</label>
        <input
          type="text"
          value={visitOperator}
          onChange={(e) => setVisitOperator(e.target.value)}
          placeholder=">="
        />
        <input
          type="number"
          value={visits}
          onChange={(e) => setVisits(e.target.value)}
          placeholder="5"
        />
      </div>

      <div>
        <label>Logic:</label>
        <select
          value={logic}
          onChange={(e) => setLogic(e.target.value)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>Create Segment</button>
      </div>
    </div>
  );
};

export default AudienceCreator;
