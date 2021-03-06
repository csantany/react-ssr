// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from './Home.scss';

class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        Home

        <p className={styles.link}>
          <Link to="/blog">Blog</Link>
        </p>
      </div>
    );
  }
}

export default Home;
