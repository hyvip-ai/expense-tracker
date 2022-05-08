import dayjs from 'dayjs';
import React from 'react';
import { months } from '../utils';

function Month() {
  return (
    <h3 className='month'>Month of {months[dayjs().month()]} is going on</h3>
  );
}

export default Month;
