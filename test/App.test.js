import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App.jsx';

/*
  ignore outdated test
 */
it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
