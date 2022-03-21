import { IconContext } from 'react-icons';
import { Navigate, Route, Routes } from 'react-router-dom';
import colors from '../../colors';
import routes, { generateFolderPath } from '../../routes';
import FilesPage from '../FilesPage/FilesPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const iconContextConfig = { color: colors.grey };

const App = () => (
    <IconContext.Provider value={iconContextConfig}>
        <Routes>
            <Route
                element={<Navigate to={generateFolderPath()} />}
                path={routes.root}
            />
            <Route element={<FilesPage />} path={routes.folder} />
            <Route element={<NotFoundPage />} path={routes.any} />
        </Routes>
    </IconContext.Provider>
);

export default App;
