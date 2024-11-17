"use client";
import { useState } from "react";
import axios from "axios";
import { useSegment } from "../../context/SegmentContext"; 
import "./audienceCreator.css";
import { useRouter } from "next/navigation"; 

const apiUrl = process.env.API_URL || "http://localhost:5000";

const AudienceCreator = () => {
  const { setCreatedSegmentId } = useSegment(); 
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [amountOperator, setAmountOperator] = useState(">=");
  const [visits, setVisits] = useState("");
  const [visitOperator, setVisitOperator] = useState(">=");
  const [logic, setLogic] = useState("AND");

  const router = useRouter();

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

      const createdSegmentId = response.data.segmentId;
      alert("Segment created successfully!");

      // Set the createdSegmentId in context
      setCreatedSegmentId(createdSegmentId);

      router.push('/pastCampaign')

    } catch (error) {
      console.error("Error creating segment:", error);
      alert("Error creating segment.");
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
          placeholder="Enter segment name"
        />
      </div>
      <div className="input-group">
        <label>Customers with total spending (INR):</label>
        <div className="input-fields">
          <select
            value={amountOperator}
            onChange={(e) => setAmountOperator(e.target.value)}
          >
            <option value=">=">Greater than or equal</option>
            <option value="<=">Less than or equal</option>
            <option value="<">Less than</option>
            <option value=">">Greater than</option>
            <option value="=">Equal</option>
            <option value="!=">Not Equal</option>
          </select>
          <input
            type="Number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10000"
          />
        </div>
      </div>

      <div className="input-group">
        <label>Number of visits:</label>
        <div className="input-fields">
          <select
            value={visitOperator}
            onChange={(e) => setVisitOperator(e.target.value)}
          >
            <option value=">=">Greater than or equal</option>
            <option value="<=">Less than or equal</option>
            <option value="<">Less than</option>
            <option value=">">Greater than</option>
            <option value="=">Equal</option>
            <option value="!=">Not Equal</option>
          </select>
          <input
            type="number"
            value={visits}
            onChange={(e) => setVisits(e.target.value)}
            placeholder="5"
          />
        </div>
      </div>

      <div>
        <label>Logic:</label>
        <select value={logic} onChange={(e) => setLogic(e.target.value)}>
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
