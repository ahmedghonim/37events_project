"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios"; // Or your preferred HTTP client

export const ApiContext = createContext({
  data: null,
  setData: () => {},
});

export function ApiProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  // Replace with your actual API endpoint and parameters
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://thirtysevenevents.perpetualbuild.com/wp-json/v1/get/themeOptionsData?lang=${language}`
      );
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguage = () => {
    // console.log("Helloi Langgg");
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    fetchData();

    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [language]);

  const contextValue = {
    data,
    isLoading,
    error,
    setData,
    language,
    handleLanguage,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}
