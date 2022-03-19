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
import { generatePath } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useCurrentDirectory } from './services/helpers';
import routes from '../../routes';

const typeToIcon = {
    file: <MdInsertDriveFile />,
    dir: <MdFolder />,
};

const FilesView = () => {
    const {
        isLoading,
        directory: { data, directoryParts },
    } = useCurrentDirectory();

    if (isLoading) return null;

    if (!data) return <Navigate replace to={routes.notFound} />;

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

            {data.items.map(({ name, sizeKb, type }) => (
                <ItemRow
                    key={name}
                    to={generatePath(routes.folder, {
                        '*': [...directoryParts, name].join('/'),
                    })}
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
