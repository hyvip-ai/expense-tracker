import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useExpenses } from '../store';
import { months } from '../utils';
import NoData from './NoData';
import shallow from 'zustand/shallow';

function AllOfMonth() {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const { expenses, setExpenses } = useExpenses(
    (state) => ({
      expenses: state.expenses,
      setExpenses: state.setExpenses,
    }),
    shallow
  );

  const month = months[monthIndex].toLowerCase();

  const expenseByMonth = expenses[month];

  const deleteHandler = (id, date) => {
    const month = months[dayjs(date).month()].toLowerCase();
    const filteredExpenses = expenseByMonth.filter((item) => item.id !== id);
    const newExpenses = { ...expenses, [month]: [...filteredExpenses] };
    setExpenses(newExpenses);
  };

  return (
    <>
      <NoData msg='Select a month' />
      <div className='d-flex justify-content-center flex-wrap'>
        {months.map((item, index) => (
          <button
            key={item}
            className={` ${
              index === monthIndex ? 'btn-info' : 'btn-primary'
            } btn m-2`}
            onClick={() => setMonthIndex(index)}
          >
            {item}
          </button>
        ))}
      </div>
      {expenseByMonth ? (
        expenseByMonth.length ? (
          <Table striped bordered hover size='sm' variant='dark'>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Expense Name</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {expenseByMonth.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{dayjs(expense.date).format('DD/MM/YYYY')}</td>
                  <td>{expense.expense}</td>
                  <td>{expense.cost}</td>
                  <td>{expense.quantity}</td>
                  <td>{expense.cost * expense.quantity}</td>
                  <td>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => deleteHandler(expense.id, expense.date)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className='text-center'>
                  Total
                </td>
                <td colSpan={2}>
                  {expenseByMonth.reduce((acc, expense) => {
                    return acc + expense.cost * expense.quantity;
                  }, 0)}
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <NoData msg='No expenses on this month' />
        )
      ) : (
        <NoData msg='No Records Found' />
      )}
    </>
  );
}

export default AllOfMonth;
