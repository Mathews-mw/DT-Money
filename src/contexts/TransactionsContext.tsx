import React, { createContext, useEffect, useState } from "react";

export interface Transactions {
  id: number,
  description: string,
  type: "income" | "outcome",
  price: number,
  category: string,
  createdAt: string,
}

interface TransactionContextType {
  transactions: Transactions[],
}

interface TransactionContextProviderProps {
  children: React.ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsContextProvider({ children }: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  
  useEffect(() => {
    const url = "http://localhost:3333/transactions";

    fetch(url)
      .then(response => { return response.json() })
      .then(data => { return setTransactions(data) })
      .catch(error => console.error(error))

  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}