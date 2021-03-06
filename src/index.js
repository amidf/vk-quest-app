import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

import App from './App';
import registerServiceWorker from './sw';

import './styles/Home.css';
import './styles/index.css';

// Init VK App
connect.send('VKWebAppInit', {});

// Service Worker For Cache
registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
