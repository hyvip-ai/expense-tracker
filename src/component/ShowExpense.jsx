import dayjs from 'dayjs';
import React from 'react';
import { Table } from 'react-bootstrap';
import { weekDays } from '../utils';
import NoData from './NoData';

function ShowExpense({ expenseArray }) {
  return expenseArray.length ? (
    <Table striped bordered hover size='sm' variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Day</th>
          <th>Expense Name</th>
          <th>Cost</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {expenseArray.map((expense, index) => (
          <tr key={expense.id}>
            <td>{index + 1}</td>
            <td>{dayjs(expense.date).format('DD/MM/YYYY')}</td>
            <td>{weekDays[dayjs(expense.date).day()]}</td>
            <td>{expense.expense}</td>
            <td>{expense.cost}</td>
            <td>{expense.quantity}</td>
            <td>{expense.cost * expense.quantity}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={6} className='text-center'>
            Total
          </td>
          <td>
            {expenseArray.reduce((acc, expense) => {
              return acc + expense.cost * expense.quantity;
            }, 0)}
          </td>
        </tr>
      </tbody>
    </Table>
  ) : (
    <NoData msg='No Records Found' />
  );
}

export default ShowExpense;
