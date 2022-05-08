import React from 'react';
function Header() {
  return (
    <div className='header'>
      <div className='menuIcon'>
        <div className='dashTop'></div>
        <div className='dashBottom'></div>
        <div className='circle'></div>
      </div>

      <h3 className='title'>Expense Tracker</h3>
    </div>
  );
}

export default Header;
