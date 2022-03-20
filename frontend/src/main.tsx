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
import routes from './routes';
import { IconContext } from 'react-icons';
import colors from './colors';

const iconContextConfig = { color: colors.grey };

ReactDOM.render(
    <React.StrictMode>
        <IconContext.Provider value={iconContextConfig}>
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
                    <Route element={<NotFound />} path={routes.notFound} />
                </Routes>
            </BrowserRouter>
        </IconContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
