'use client'; 
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AudienceCreator from './pages/audienceCreation/audienceCreator';
import PastCampaigns from './pages/pastCampaigns/pastCampaign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AudienceCreator />} />
        <Route path="/pastCampaign" element={<PastCampaigns />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
