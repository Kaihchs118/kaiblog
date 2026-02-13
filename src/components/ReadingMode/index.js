import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ReadingModeToggle() {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (isFocus) {
      document.body.classList.add('reading-mode-active');
    } else {
      document.body.classList.remove('reading-mode-active');
    }
  }, [isFocus]);

  return (
    <button 
      className={styles.toggleBtn} 
      onClick={() => setIsFocus(!isFocus)}
    >
      {isFocus ? '📖 退出專注模式' : '👓 開啟專注模式'}
    </button>
  );
}
