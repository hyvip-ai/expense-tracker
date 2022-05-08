import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import shallow from 'zustand/shallow';
import { useExpenseByDate, useExpenses } from '../store';
import { months } from '../utils';
import NoData from './NoData';
import ShowExpense from './ShowExpense';

function DatePicker() {
  const [expenseByDate, setExpenseByDate] = useState([]);

  const expenses = useExpenses((state) => state.expenses);

  const { date, setDate } = useExpenseByDate(
    (state) => ({ date: state.date, setDate: state.setDate }),
    shallow
  );

  useEffect(() => {
    if (date) {
      const month = months[dayjs(date).month()].toLowerCase();
      const expenseByMonth = expenses[month];

      const expenseByDate = expenseByMonth
        ? expenseByMonth.filter((expense) => expense.date === date)
        : [];
      setExpenseByDate(expenseByDate);
    }
  }, [date, expenses]);

  function handleSelect(date) {
    setDate(dayjs(date).format('MM/DD/YYYY')); // native Date object
  }

  return (
    <>
      <div className='date-picker'>
        <Calendar
          date={date ? new Date(date) : null}
          onChange={handleSelect}
          color={'#fbca2b'}
        />
      </div>
      {date ? (
        expenseByDate.length ? (
          <ShowExpense expenseArray={expenseByDate} />
        ) : (
          <NoData msg='No expense found on this day' />
        )
      ) : (
        <NoData msg='Please select a date to see expenses' />
      )}
    </>
  );
}

export default DatePicker;
