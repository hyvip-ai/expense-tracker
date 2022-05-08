import create from 'zustand';
import { persist } from 'zustand/middleware';
import { EXPENSE_KEY } from '../utils';

export const useExpenseByDate = create((set) => ({
  date: '',
  setDate: (date) => set((prev) => ({ ...prev, date })),
}));

export const useExpenseByDateRange = create((set) => ({
  startDate: '',
  endDate: '',
  setDateRange: (startDate, endDate) =>
    set((prev) => ({ ...prev, startDate, endDate })),
}));

export const useExpenses = create(
  persist(
    (set) => ({
      expenses: {},
      setExpenses: (expenses) => set((prev) => ({ ...prev, expenses })),
    }),
    { name: EXPENSE_KEY }
  )
);
