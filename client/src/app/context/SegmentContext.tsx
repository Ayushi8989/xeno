// context/SegmentContext.tsx
"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Context and provider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SegmentContext = createContext<any>(null);

export const SegmentProvider = ({ children }: { children: ReactNode }) => {
  const [createdSegmentId, setCreatedSegmentId] = useState<string | null>(null);
  return (
    <SegmentContext.Provider value={{ createdSegmentId, setCreatedSegmentId }}>
      {children}
    </SegmentContext.Provider>
  );
};

export const useSegment = () => useContext(SegmentContext);
