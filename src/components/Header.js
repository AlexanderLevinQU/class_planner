import React from 'react';
import styles from './components-styles/header.css';
 
const Header = () => {
   return (
       <header style={styles} className='headerBackground'>
           <h1 style={styles} className='headerText'>Enter Your Classes!</h1>
       </header>
   );
};
export default Header;