"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  user: {
    email: string;
    avatar: string;
    name: string;
  };
  hasSidebar: boolean;
}

// Define the shape of the context
interface AppContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const defaultAppState: AppState = {
  hasSidebar: false,
  user: {
    name: "Abhay",
    email: "abhay@gmail.com",
    avatar: "/imgs/avator.png",
  },
};

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component to wrap the app
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState>(
    JSON.parse(JSON.stringify(defaultAppState))
  );

  return (
    <AppContext.Provider value={{ setAppState, appState }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
