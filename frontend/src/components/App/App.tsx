import { IconContext } from 'react-icons';
import { Navigate, Route, Routes } from 'react-router-dom';
import colors from '../../styleTokens/colors';
import routes, { generateFolderPath } from '../../routes';
import FolderPage from '../FolderPage/FolderPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import AuthenticationProvider from '../AuthenticationProvider/AuthenticationProvider';
import LoggedOnlyRoute from '../AuthenticationProvider/parts/LoggedOnlyRoute';
import LoginPage from '../LoginPage/LoginPage';
import NotLoggedOnlyRoute from '../AuthenticationProvider/parts/NotLoggedOnlyRoute';

const iconContextConfig = { color: colors.boulder };

const App = () => (
    <AuthenticationProvider>
        <IconContext.Provider value={iconContextConfig}>
            <Routes>
                <Route
                    element={<Navigate to={generateFolderPath()} />}
                    path={routes.root}
                />
                <Route
                    element={
                        <LoggedOnlyRoute>
                            <FolderPage />
                        </LoggedOnlyRoute>
                    }
                    path={routes.folder}
                />
                <Route
                    element={
                        <NotLoggedOnlyRoute>
                            <LoginPage />
                        </NotLoggedOnlyRoute>
                    }
                    path={routes.login}
                />
                <Route
                    element={
                        <LoggedOnlyRoute>
                            <NotFoundPage />
                        </LoggedOnlyRoute>
                    }
                    path={routes.any}
                />
            </Routes>
        </IconContext.Provider>
    </AuthenticationProvider>
);

export default App;
