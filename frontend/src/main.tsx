import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './components/App/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*">
                    <App />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
