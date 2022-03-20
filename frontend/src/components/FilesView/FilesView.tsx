import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';
import {
    Cell,
    ColumnName,
    FileRow,
    FolderRow,
    HeaderRow,
    IconWrapper,
    ListContainer,
    Name,
    SortIcon,
    NameButton,
} from './services/styled';
import {
    by,
    generateFolderPath,
    getBreadcumbs,
    useCurrentDirectory,
} from './services/helpers';
import routes from '../../routes';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import iconSizes from '../../iconSizes';

const FilesView = () => {
    const {
        isLoading,
        directory: { data, directoryParts },
    } = useCurrentDirectory();

    const [order, setOrder] = useState<'desc' | 'asc'>('asc');

    if (isLoading) return null;

    if (!data) return <Navigate replace to={routes.notFound} />;

    // NOTE: Sorting and filtering is an expensive operation on big data sets.
    // Right now, we don't need a memorization since every component update causes a change in options order or number.
    // Please verify that every time component functionality changes.
    const sortedItems = [...data.items].sort(by('name'));
    const orderedSortedItems =
        order === 'desc' ? sortedItems.reverse() : sortedItems;

    const files = orderedSortedItems.filter(({ type }) => type === 'file');
    const folders = orderedSortedItems.filter(({ type }) => type === 'dir');

    const handleToogleOrder = () => {
        setOrder((current) => (current === 'desc' ? 'asc' : 'desc'));
    };

    return (
        <>
            <Breadcrumbs items={getBreadcumbs(directoryParts)} />

            <ListContainer>
                <HeaderRow>
                    <Cell>
                        <NameButton onClick={handleToogleOrder} type="button">
                            <ColumnName>Name</ColumnName>
                            <SortIcon
                                isRotated={order === 'desc'}
                                size={iconSizes.medium}
                            />
                        </NameButton>
                    </Cell>

                    <Cell>
                        <ColumnName>Size</ColumnName>
                    </Cell>
                </HeaderRow>

                {folders.map(({ name }) => (
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
                ))}

                {files.map(({ name, sizeKb }) => (
                    <FileRow key={name}>
                        <Cell>
                            <IconWrapper>
                                <MdInsertDriveFile size={iconSizes.large} />
                            </IconWrapper>
                            <Name>{name}</Name>
                        </Cell>

                        <Cell>{sizeKb}</Cell>
                    </FileRow>
                ))}
            </ListContainer>
        </>
    );
};

export default FilesView;
