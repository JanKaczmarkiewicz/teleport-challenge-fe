import { MdArrowUpward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import colors from '../../../colors';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import Input from '../../Input/Input';

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const rowStyles = css`
    align-items: center;
    border-bottom: 1px solid ${colors.iron};
    display: grid;
    gap: 8px;
    padding-inline: 6px;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    height: 48px;
`;

export const HeaderRow = styled.div`
    ${rowStyles}
`;

export const FileRow = styled.div`
    ${rowStyles}
    cursor: not-allowed;
`;

export const FolderRow = styled(Link)`
    ${rowStyles}
    text-decoration: none;
`;

export const IconWrapper = styled.div`
    display: flex;
    padding-inline: 16px;
    color: ${colors.boulder};
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

export const NameButton = styled.button`
    border: none;
    display: flex;
    cursor: pointer;
    gap: 8px;
    align-items: center;
    background-color: inherit;
    padding: 0;
`;

export const InputWithSpace = styled(Input)`
    margin-bottom: 16px;
`;

export const BreadcrumbsWithSpace = styled(Breadcrumbs)`
    margin-bottom: 32px;
`;
