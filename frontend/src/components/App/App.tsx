import { IconContext } from 'react-icons';
import { Navigate, Route, Routes } from 'react-router-dom';
import colors from '../../styleTokens/colors';
import routes, { generateFolderPath } from '../../routes';
import FolderPage from '../FolderPage/FolderPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const iconContextConfig = { color: colors.boulder };

const App = () => (
    <IconContext.Provider value={iconContextConfig}>
        <Routes>
            <Route
                element={<Navigate to={generateFolderPath()} />}
                path={routes.root}
            />
            <Route element={<FolderPage />} path={routes.folder} />
            <Route element={<NotFoundPage />} path={routes.any} />
        </Routes>
    </IconContext.Provider>
);

export default App;
