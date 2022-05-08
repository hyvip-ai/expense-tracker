import dayjs from 'dayjs';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useExpenses } from '../store';
import { months } from '../utils';
import NoData from './NoData';

function AllOfMonth() {
  const expenses = useExpenses((state) => state.expenses);

  const month = months[dayjs().month()].toLowerCase();

  const expenseByMonth = expenses[month];

  return expenseByMonth ? (
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
            </tr>
          ))}
          <tr>
            <td colSpan={5} className='text-center'>
              Total
            </td>
            <td>
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
  );
}

export default AllOfMonth;
