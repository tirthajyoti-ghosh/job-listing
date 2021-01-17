import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidenav from './components/Sidenav';
import FindJobs from './pages/FindJobs';
import './styles/main.sass';

const App = () => (
  <Router>
    <main>
      <Sidenav />
      <Route exact path="/jobs" component={FindJobs} />
    </main>
  </Router>
);

export default App;
