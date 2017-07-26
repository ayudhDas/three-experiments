import './index.css';

import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const pixel = require('./pixel.png');

render(<App im={pixel} />, document.getElementById('root'));