"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pastCampaign.css';

interface Campaign {
  _id: string;
  name: string;
  message: string;
  segmentId: string;
  createdAt: string; 
}

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PastCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPastCampaigns = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pastcampaign`);
        setCampaigns(response.data.campaigns);
      } catch (err) {
        setError('Error fetching past campaigns');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPastCampaigns();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="past-campaigns">
      <h1>Past Campaigns</h1>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Message</th>
            <th>Segment ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>{campaign.name}</td>
              <td>{campaign.message}</td>
              <td>{campaign.segmentId}</td>
              <td>{new Date(campaign.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastCampaigns;
