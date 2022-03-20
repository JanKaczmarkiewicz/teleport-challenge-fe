import {
    Cell,
    ColumnName,
    FileRow,
    FolderRow,
    HeaderRow,
    IconWrapper,
    ListContainer,
    Name,
} from './services/styled';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';
import { generatePath } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useCurrentDirectory } from './services/helpers';
import routes from '../../routes';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import iconSizes from '../../iconSizes';

const generateFolderPath = (parts: string[]) =>
    generatePath(routes.folder, {
        '*': parts.join('/'),
    });

const FilesView = () => {
    const {
        isLoading,
        directory: { data, directoryParts },
    } = useCurrentDirectory();

    if (isLoading) return null;

    if (!data) return <Navigate replace to={routes.notFound} />;

    const breadcrumbs = directoryParts.map((label, index) => ({
        label: label,
        to: generateFolderPath(directoryParts.slice(0, index + 1)),
    }));

    breadcrumbs.unshift({
        label: 'My folder',
        to: generateFolderPath(['']),
    });

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />

            <ListContainer>
                <HeaderRow>
                    <Cell>
                        <ColumnName>Name</ColumnName>
                    </Cell>

                    <Cell>
                        <ColumnName>Size</ColumnName>
                    </Cell>
                </HeaderRow>

                {data.items.map(({ name, sizeKb, type }) =>
                    type === 'dir' ? (
                        <FolderRow
                            key={name}
                            to={generateFolderPath([...directoryParts, name])}
                        >
                            <Cell>
                                <IconWrapper>
                                    <MdFolder size={iconSizes.large} />
                                </IconWrapper>
                                <Name>{name}</Name>
                            </Cell>

                            <Cell>-</Cell>
                        </FolderRow>
                    ) : (
                        <FileRow key={name}>
                            <Cell>
                                <IconWrapper>
                                    <MdInsertDriveFile size={iconSizes.large} />
                                </IconWrapper>
                                <Name>{name}</Name>
                            </Cell>

                            <Cell>{sizeKb}</Cell>
                        </FileRow>
                    )
                )}
            </ListContainer>
        </>
    );
};

export default FilesView;
