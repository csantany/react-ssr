import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Home.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        Home2

        <p className="link">
          <Link to="/blog">Blog</Link>
        </p>
      </div>
    );
  }
}

export default Home;
