import { createElement } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/App';
import store from './shared/store';
import registerServiceWorker from './shared/registerServiceWorker';

registerServiceWorker();

render(
  createElement(Router, {}, createElement(App, { store })),
  document.getElementById('root'),
);
