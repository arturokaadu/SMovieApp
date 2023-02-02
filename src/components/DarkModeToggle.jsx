import { Icon } from '@iconify/react';
import { useState } from 'react';

import styles from '../css/DarkModeToggle.module.css'
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleChange = (event) => {
    setIsDarkMode(event.target.checked);
    document.body.classList.toggle(styles.darkMode, event.target.checked);
  }
  return (
    <label className={styles.container}>
      <input
        className={styles.toggleCheckbox}
        type='checkbox'
        checked={isDarkMode}
        onClick={handleChange}
      />
      <div className={`${styles.toggleSlot} ${isDarkMode ? styles.darkMode : ''}`}>
        <div className={styles.sunIconWrapper}>
          <Icon icon='feather-sun'/>
        </div>
        <div className={styles.toggleButton}></div>
        <div className={styles.moonIconWrapper}>
          <Icon icon='feather-moon'/>
        </div>
      </div>
    </label>
  );
}

export default DarkModeToggle;