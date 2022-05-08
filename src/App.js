import DateRangePicker from './component/DateRangePicker';
import Header from './component/Header';
import Month from './component/Month';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DatePicker from './component/DatePicker';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import AddExpenses from './component/AddExpenses';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import AllOfMonth from './component/AllOfMonth';

function App() {
  const [selection, setSelection] = useState('');

  return (
    <>
      <Header />
      <Month />

      <h6>Select any one to start</h6>
      <Form>
        <Form.Check
          name='something'
          type='radio'
          id='single'
          label='Add expenses to today'
          value='add'
          onInput={(e) => setSelection(e.target.value)}
        />

        <Form.Check
          type='radio'
          onInput={(e) => setSelection(e.target.value)}
          name='something'
          id='watchRange'
          value='watchRange'
          label='Watch expenses for a date range'
        />
        <Form.Check
          name='something'
          onInput={(e) => setSelection(e.target.value)}
          type='radio'
          id='watchSingle'
          value='watchSingle'
          label='Watch expenses for a single date'
        />
        <Form.Check
          name='something'
          onInput={(e) => setSelection(e.target.value)}
          type='radio'
          id='allOfMonth'
          value='allOfMonth'
          label='Watch all expenses of this month'
        />
      </Form>
      {selection === 'add' ? <AddExpenses /> : null}
      {selection === 'watchRange' ? <DateRangePicker /> : null}
      {selection === 'watchSingle' ? <DatePicker /> : null}
      {selection === 'allOfMonth' ? <AllOfMonth /> : null}
    </>
  );
}

export default App;
