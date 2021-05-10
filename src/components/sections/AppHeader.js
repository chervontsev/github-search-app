import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Hidden,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';

export function AppHeader() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const { search } = useLocation();

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/results',
      search: query,
    });
  };

  const handleHome = () => {
    history.push({
      pathname: '/',
      search: '',
    });
  };

  useEffect(() => {
    setQuery(search.substr(1));
  }, [search]);

  return (
    <div className="app-header">
      <AppBar position="relative">
        <Box p={2}>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <Hidden xsDown>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" onClick={handleHome} className="logo">
                  Github Search
                </Typography>
              </Grid>
            </Hidden>

            <Grid item xs={12} sm={6}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  autoFocus
                  label="Repo name..."
                  variant="filled"
                  inputProps={{ value: query, onChange: handleInput }}
                />
              </form>
            </Grid>
          </Grid>
        </Box>
      </AppBar>
    </div>
  );
}
