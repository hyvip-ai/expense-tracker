import React, { useEffect, useMemo, useState } from 'react';
import { DateRangePicker as DatePicker } from 'react-date-range';
import { useExpenseByDateRange, useExpenses } from '../store';
import shallow from 'zustand/shallow';
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';
import isBetween from 'dayjs/plugin/isBetween';
import { months } from '../utils';
import ShowExpense from './ShowExpense';
import NoData from './NoData';

dayjs.extend(isBetween);

function DateRangePicker() {
  const { startDate, endDate, setDateRange } = useExpenseByDateRange(
    (state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
      setDateRange: state.setDateRange,
    }),
    shallow
  );
  const expenses = useExpenses((state) => state.expenses);

  const [maxDate, setMaxDate] = useState('');
  const [expenseByRange, setExpenseByRange] = useState([]);

  function handleSelect(ranges) {
    setDateRange(
      dayjs(ranges.selection.startDate).format('MM/DD/YYYY'),
      dayjs(ranges.selection.endDate).format('MM/DD/YYYY')
    );
  }
  const selectionRange = useMemo(
    () => ({
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : new Date(''),
      key: 'selection',
    }),
    [startDate, endDate]
  );

  useEffect(() => {
    if (startDate) {
      setMaxDate(dayjs(startDate).endOf('month'));
    }
    if (startDate && endDate) {
      const month = months[dayjs(startDate).month()].toLowerCase();
      const expenseByMonth = expenses[month];
      const expenseInDateRange = expenseByMonth
        ? expenseByMonth.filter((expense) =>
            dayjs(expense.date).isBetween(startDate, endDate, null, '[]')
          )
        : [];
      setExpenseByRange(expenseInDateRange);
    }
  }, [startDate, endDate, expenses]);

  const resetToStart = () => {
    setDateRange('', '');
    setMaxDate('');
  };

  return (
    <>
      <div className='range_picker'>
        {maxDate ? (
          <DatePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            rangeColors={['#fbca2b']}
            maxDate={maxDate ? new Date(maxDate) : null}
          />
        ) : (
          <DatePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            rangeColors={['#fbca2b']}
          />
        )}
      </div>
      <Button
        variant='outline-info'
        className='mx-auto d-block my-3'
        onClick={resetToStart}
      >
        Reset
      </Button>
      {maxDate ? (
        expenseByRange.length ? (
          <ShowExpense expenseArray={expenseByRange} />
        ) : (
          <NoData msg='No expense found on this day' />
        )
      ) : (
        <NoData msg='Please select a date to see expenses' />
      )}
    </>
  );
}

export default DateRangePicker;
