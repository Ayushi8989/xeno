"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pastCampaign.css";

interface Campaign {
  _id: string;
  name: string;
  message: string;
  segmentId: string;
  audienceSize: number; 
  createdAt: string;
}

interface CommunicationLog {
  _id: string;
  customerId: string;
  message: string;
  status: string;
  createdAt: string;
}

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const PastCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignResponse, logResponse] = await Promise.all([
          axios.get(`${apiUrl}/pastcampaign`),
          axios.get(`${apiUrl}/communicationLogs`),
        ]);

        setCampaigns(campaignResponse.data.campaigns);
        setCommunicationLogs(logResponse.data);
      } catch (err) {
        setError("Error fetching data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const segmentId = "6738e57dec597b7523501b13"; 

      const response = await axios.post(`${apiUrl}/sendMessage`, {
        segmentId,
        message,
      });

      console.log(54, response.data);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message.");
    }
  };

  const fetchAudienceSize = async (segmentId: string): Promise<number | null> => {
    try {
      const response = await axios.post(`${apiUrl}/segments/${segmentId}`, {});
      const audienceSize = response.data.audienceSize;
      return audienceSize; 
    } catch (error) {
      console.error("Error fetching segment audience size:", error);
      return null;
    }
  };
  
console.log(fetchAudienceSize)

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="past-campaigns">
      <h1>Past Campaigns</h1>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Message</th>
            <th>Segment Name</th>
            <th>Audience Size</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>{campaign.name}</td>
              <td>{campaign.message}</td>
              <td>{campaign.segmentId}</td>
              <td>{campaign.audienceSize || "N/A"}</td>
              <td>{new Date(campaign.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1>Personalized Messages for the Selected Audience</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message here"
        />
        <button onClick={handleSubmit}>Send Message</button>
      </div>
      <div>
        <h2>Communication Logs</h2>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Message</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {communicationLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.customerId}</td>
                <td>{log.message}</td>
                <td>{log.status}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastCampaigns;
