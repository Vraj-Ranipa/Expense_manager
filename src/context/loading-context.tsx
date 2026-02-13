"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
    isLoading: boolean;
    message: string;
    showLoader: (message?: string) => void;
    hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("Loading...");

    const showLoader = (customMessage?: string) => {
        setMessage(customMessage || "Loading...");
        setIsLoading(true);
    };

    const hideLoader = () => {
        setIsLoading(false);
    };

    React.useEffect(() => {
        showLoader("Preparing your dashboard...");
        const timer = setTimeout(() => {
            hideLoader();
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, message, showLoader, hideLoader }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
