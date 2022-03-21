import { ChangeEventHandler, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { MdFolder, MdOutlineInsertDriveFile, MdSearch } from 'react-icons/md';
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
    InputWithSpace,
    BreadcrumbsWithSpace,
} from './services/styled';
import {
    by,
    formatSize,
    getBreadcrumbs,
    useCurrentDirectory,
} from './services/helpers';
import routes, { generateFolderPath } from '../../routes';
import iconSizes from '../../styleTokens/iconSizes';
import PageContainer from '../PageContainer/PageContainer';

const FilesPage = () => {
    const {
        isLoading,
        directory: { data, directoryParts },
    } = useCurrentDirectory();

    const [inputValue, setInputValue] = useState('');

    const [isDescending, setIsDescending] = useState(false);

    if (isLoading) return null;

    if (!data) return <Navigate replace to={routes.notFound} />;

    // NOTE: Sorting and filtering is an expensive operation on big data sets.
    // Right now, we don't need a memorization since every component update causes a change in options order or number.
    // Please verify that every time component functionality changes.
    const sortedItems = [...data.items]
        .filter(({ name }) => name.startsWith(inputValue))
        .sort(by('name'));
    const orderedSortedItems = isDescending
        ? sortedItems.reverse()
        : sortedItems;

    const files = orderedSortedItems.filter(({ type }) => type === 'file');
    const folders = orderedSortedItems.filter(({ type }) => type === 'dir');

    const handleToggleOrder = () => {
        setIsDescending((current) => !current);
    };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <PageContainer>
            <BreadcrumbsWithSpace items={getBreadcrumbs(directoryParts)} />

            <InputWithSpace
                icon={<MdSearch size={iconSizes.medium} />}
                onChange={handleInputChange}
                placeholder={`Search in current folder`}
                value={inputValue}
            />

            <ListContainer>
                <HeaderRow>
                    <Cell>
                        <NameButton onClick={handleToggleOrder} type="button">
                            <ColumnName>Name</ColumnName>
                            <SortIcon
                                isRotated={isDescending}
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
                                <MdOutlineInsertDriveFile
                                    size={iconSizes.large}
                                />
                            </IconWrapper>
                            <Name>{name}</Name>
                        </Cell>

                        <Cell>{formatSize(sizeKb)}</Cell>
                    </FileRow>
                ))}
            </ListContainer>
        </PageContainer>
    );
};

export default FilesPage;
