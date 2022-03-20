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
import routes from './routes';
import { IconContext } from 'react-icons';
import colors from './colors';
import FilesPage from './components/FilesPage/FilesPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

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
                    <Route element={<FilesPage />} path={routes.folder} />
                    <Route element={<NotFoundPage />} path={routes.notFound} />
                </Routes>
            </BrowserRouter>
        </IconContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
