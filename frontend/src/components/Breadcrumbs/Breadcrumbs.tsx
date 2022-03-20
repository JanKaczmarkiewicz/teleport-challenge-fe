import { Fragment } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import iconSizes from '../../iconSizes';
import { Breadcrumb, Containter } from './services/styled';

type BreadcrumbProps = { items: { label: string; to: string }[] };

const Breadcrumbs = ({ items }: BreadcrumbProps) => {
    const lastIndex = items.length - 1;

    return (
        <Containter aria-label="Breadcrumb">
            {items.map(({ to, label }, index) => (
                <Fragment key={to}>
                    {index !== lastIndex ? (
                        <>
                            <Breadcrumb to={to}>{label}</Breadcrumb>
                            <MdKeyboardArrowRight size={iconSizes.large} />
                        </>
                    ) : (
                        <Breadcrumb aria-current="page" to={to}>
                            {label}
                        </Breadcrumb>
                    )}
                </Fragment>
            ))}
        </Containter>
    );
};

export default Breadcrumbs;
