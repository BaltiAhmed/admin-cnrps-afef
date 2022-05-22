import { useState, useCallback, useEffect } from "react";



export const FinanciereAuth = () => {
  const [tokenFinanciere, setTokenFinanciere] = useState(false);
  const [financiere, setFinanciere] = useState(false);

  const loginFinanciere = useCallback((financiere, tokenFinanciere) => {
    setTokenFinanciere(tokenFinanciere);
    setFinanciere(financiere);

    localStorage.setItem(
      "financiereData",
      JSON.stringify({
        financiere: financiere,
        tokenFinanciere: tokenFinanciere
      })
    );
  }, []);

  const logoutFinanciere = useCallback(() => {
    setTokenFinanciere(null);
    setFinanciere(null);
    localStorage.removeItem("financiereData");
  }, []);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("financiereData"));
    if (
      storedData &&
      storedData.tokenFinanciere 
    ) {
      loginFinanciere(
        storedData.financiere,
        storedData.tokenFinanciere
      );
    }
  }, [loginFinanciere]);

  return { tokenFinanciere, loginFinanciere, logoutFinanciere, financiere };
};
