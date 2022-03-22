import { MdArrowUpward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import colors from '../../../styleTokens/colors';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import Input from '../../Input/Input';

const rowStyles = css`
    align-items: center;
    border-bottom: 1px solid ${colors.iron};
    display: grid;
    gap: 0.5rem;
    padding-inline: 0.5rem;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    height: 48px;
`;

export const ListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
`;

export const FileRow = styled.li`
    ${rowStyles}
    cursor: not-allowed;
`;

export const FolderRow = styled.li``;

export const HeaderRow = styled.li`
    ${rowStyles}
`;

export const FolderLink = styled(Link)`
    ${rowStyles}
    text-decoration: none;
`;

export const IconWrapper = styled.div`
    display: flex;
    padding-inline: 1rem;
    align-items: center;
`;

export const Cell = styled.div`
    display: flex;
    align-items: center;
    color: ${colors.boulder};
`;

export const ColumnName = styled.div`
    font-weight: bold;
    color: ${colors.boulder};
`;

export const Name = styled.div`
    font-weight: 500;
    color: ${colors.tundora};
`;

export const SortIcon = styled(MdArrowUpward).withConfig<{
    isRotated: boolean;
}>({
    shouldForwardProp: (prop) => prop !== 'isRotated',
})`
    transform: rotate(${({ isRotated }) => (isRotated ? '180deg' : '0')});
`;

export const ColumnNameButton = styled.button`
    border: none;
    display: flex;
    cursor: pointer;
    gap: 0.5rem;
    align-items: center;
    background-color: inherit;
    padding: 0;
`;

export const InputWithSpace = styled(Input)`
    margin-bottom: 1rem;
`;

export const BreadcrumbsWithSpace = styled(Breadcrumbs)`
    margin-bottom: 2rem;
`;
