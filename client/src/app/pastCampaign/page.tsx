"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pastCampaign.css";

import { useSegment } from "../context/SegmentContext";

interface Campaign {
    _id: string;
    name: string;
    message: string;
    segmentName: string,
    audienceSize: number;
    numberSent: number,
    numberFailed: number,
    createdAt: string;
}

interface CommunicationLog {
    _id: string;
    customerId: string;
    message: string;
    status: string;
    createdAt: string;
}


const PastCampaigns: React.FC = () => {
      const { createdSegmentId } = useSegment();
      const [segmentId, setSegmId] = useState("")
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);

    console.log(13245678, createdSegmentId)
    useEffect(() => {
        if (!createdSegmentId) return;
        const fetchData = async () => {
            try {
                const [campaignResponse, logResponse] = await Promise.all([
                    axios.get(`https://aux.server.lera.cloud/pastcampaign`),
                    axios.get(`https://aux.server.lera.cloud/communicationLogs`),
                ]);
                
                setSegmId(createdSegmentId);
                setCampaigns(campaignResponse.data.campaigns);
                setCommunicationLogs(logResponse.data);
            } catch (err) {
                setError("Error fetching data. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        console.log(503)
        fetchData();
    }, [createdSegmentId]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`https://aux.server.lera.cloud/sendMessage`, {
                segmentId: segmentId,
                message,
            });

            const logResponse = await axios.get(`https://aux.server.lera.cloud/communicationLogs`);
            setCommunicationLogs(logResponse.data);
            console.log(54, response.data);
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error sending message.");
        }
    };

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
                        <th>Number Sent</th>
                        <th>Number Failed</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign._id}>
                            <td>{campaign.name}</td>
                            <td>{campaign.message}</td>
                            <td>{campaign.segmentName}</td>
                            <td>{campaign.audienceSize}</td>
                            <td>{campaign.numberSent}</td>
                            <td>{campaign.numberFailed}</td>
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




