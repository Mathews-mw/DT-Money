import React, { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../libs/axios";

export interface Transactions {
  id: number,
  description: string,
  type: "income" | "outcome",
  price: number,
  category: string,
  createdAt: string,
}

interface createTransactionInput {
  description: string,
  price: number,
  category: string,
  type: string,
}

interface TransactionContextType {
  transactions: Transactions[],
  fetchTransactions: (query?: string) => Promise<void>,
  createTransaction: (data: createTransactionInput) => Promise<void>
}

interface TransactionContextProviderProps {
  children: React.ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsContextProvider({ children }: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  
  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        }
      })
  
      setTransactions(response.data);
    }, []
  );

  const createTransaction = useCallback(
    async (data: createTransactionInput) => {
      const { description, category, price, type } = data;

      const response = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions(state => [response.data, ...state]);
    }, []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}