import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './global.css';
import { IconContext } from 'react-icons';
import colors from './colors';
import App from './components/App/App';

const iconContextConfig = { color: colors.grey };

ReactDOM.render(
    <React.StrictMode>
        <IconContext.Provider value={iconContextConfig}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </IconContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
