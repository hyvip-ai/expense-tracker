import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { months } from '../utils';
import { useExpenses } from '../store';
import { v4 as uuid } from 'uuid';

const schema = yup.object().shape({
  expense: yup.string().trim().required('Name is required'),
  cost: yup
    .number()
    .typeError('Cost should be a number')
    .test('val test', 'Cost must be greater than 0', (value) =>
      value > 0 ? value : false
    ),
  quantity: yup
    .number()
    .typeError('Quantity should be a number')
    .test('val test', 'Cost must be greater than 0', (value) =>
      value > 0 ? value : false
    ),
  date: yup.string().trim(),
});

function AddExpenses() {
  const { expenses, setExpenses } = useExpenses((state) => ({
    setExpenses: state.setExpenses,
    expenses: state.expenses,
  }));

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (formData) => {
    let monthIdx = '';

    if (formData.date) {
      monthIdx = dayjs(formData.date).month();
    }

    const payload = {
      ...formData,
      date: monthIdx
        ? dayjs(formData.date).format('MM-DD-YYYY')
        : dayjs().format('MM/DD/YYYY'),
      id: uuid(),
    };

    const month = months[monthIdx || dayjs().month()].toLowerCase();
    if (expenses[month]) {
      setExpenses({ ...expenses, [month]: [...expenses[month], payload] });
    } else {
      setExpenses({ ...expenses, [month]: [payload] });
    }
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        type='text'
        placeholder='Where do you spend it?'
        {...register('expense')}
      ></Form.Control>
      <p className='text-danger'>{errors.expense?.message}</p>
      <Form.Control
        type='number'
        placeholder='cost'
        {...register('cost')}
      ></Form.Control>
      <p className='text-danger'>{errors.cost?.message}</p>
      <Form.Control
        type='number'
        placeholder='Quantity'
        {...register('quantity')}
      ></Form.Control>
      <p className='text-danger'>{errors.quantity?.message}</p>
      <Form.Control
        type='date'
        placeholder='Date'
        {...register('date')}
      ></Form.Control>
      <Button variant='warning' type='submit'>
        Submit
      </Button>
    </Form>
  );
}

export default AddExpenses;
