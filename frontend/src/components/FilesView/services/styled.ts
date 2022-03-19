import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const rowStyles = css`
    align-items: center;
    border-bottom: 1px solid #dadce0;
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

export const ItemRow = styled(Link)`
    ${rowStyles}
    text-decoration: none;
`;

export const IconWrapper = styled.div`
    display: flex;
    padding-inline: 16px;
    color: rgba(0, 0, 0, 0.54);
    align-items: center;
`;

export const Cell = styled.div`
    display: flex;
    color: rgba(0, 0, 0, 0.54);
`;

export const ColumnName = styled.div`
    font-weight: bold;
    color: rgba(0, 0, 0, 0.54);
`;

export const Name = styled.div`
    font-weight: 500;
    color: rgba(0, 0, 0, 0.72);
`;
