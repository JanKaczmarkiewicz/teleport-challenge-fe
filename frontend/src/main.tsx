import React from 'react';
import {
    BrowserRouter,
    generatePath,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './global.css';
import App from './components/App/App';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import routes from './routes';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <Navigate
                            to={generatePath(routes.folder, { '*': '' })}
                        />
                    }
                    path={routes.root}
                />
                <Route element={<App />} path={routes.folder} />
                <Route element={<Login />} path={routes.login} />
                <Route element={<NotFound />} path={routes.notFound} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
