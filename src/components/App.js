import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Results, Repo } from './pages';
import { AppHeader } from './sections';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../assets/theme';
import '../assets/styles.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/github-search-app/">
        <AppHeader />
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/:user/:repo" component={Repo} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
