import {
    Cell,
    ColumnName,
    HeaderRow,
    IconWrapper,
    ItemRow,
    ListContainer,
    Name,
} from './services/styled';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { findFolder } from './services/helpers';

const typeToIcon = {
    file: <MdInsertDriveFile />,
    dir: <MdFolder />,
};

const FilesView = () => {
    const location = useLocation();

    const currentLocation = findFolder(location.pathname);

    if (!currentLocation) return <Navigate to="/not-found" />;

    return (
        <ListContainer>
            <HeaderRow>
                <Cell>
                    <ColumnName>Name</ColumnName>
                </Cell>
                <Cell>
                    <ColumnName>Size</ColumnName>
                </Cell>
            </HeaderRow>

            {currentLocation.items.map(({ name, sizeKb, type }) => (
                <ItemRow
                    key={name}
                    to={`${location.pathname}/${name}`
                        // in case location.pathname is /
                        .replaceAll('//', '/')}
                >
                    <Cell>
                        <IconWrapper>{typeToIcon[type]}</IconWrapper>
                        <Name>{name}</Name>
                    </Cell>
                    <Cell>{sizeKb}</Cell>
                </ItemRow>
            ))}
        </ListContainer>
    );
};

export default FilesView;
