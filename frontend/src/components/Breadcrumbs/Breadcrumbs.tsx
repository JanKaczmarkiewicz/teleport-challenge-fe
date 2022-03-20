import { Fragment } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import iconSizes from '../../iconSizes';
import { Breadcrumb, Containter } from './services/styled';

type BreadcrumbProps = { items: { label: string; to: string }[] };

const Breadcrumbs = ({ items }: BreadcrumbProps) => {
    const lastIndex = items.length - 1;

    return (
        <Containter>
            {items.map(({ to, label }, index) => (
                <Fragment key={to}>
                    <Breadcrumb to={to}>{label}</Breadcrumb>
                    {index !== lastIndex && (
                        <MdKeyboardArrowRight size={iconSizes.large} />
                    )}
                </Fragment>
            ))}
        </Containter>
    );
};

export default Breadcrumbs;
