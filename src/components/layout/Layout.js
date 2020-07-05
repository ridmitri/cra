import React from 'react';
import styles from './Layout';

export default function Layout(props) {
    return <div className={styles.Layout}>{props.children}</div>;
}
