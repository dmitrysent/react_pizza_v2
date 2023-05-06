import React from 'react';

import styles from './NotFoundComponent.module.scss'

const NotFoundComponent: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>К сожалению, данная страница отсутствует в нашем интрнет-магазине</p>
    </div>
  );
};

export default NotFoundComponent;