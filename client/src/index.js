import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceworker';

ReactDOM.render(<App />, document.getElementById('root')); 
serviceWorker.unregister(); 

