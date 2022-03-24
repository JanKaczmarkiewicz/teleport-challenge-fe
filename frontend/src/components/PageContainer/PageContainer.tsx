import { useAuth } from '../AuthenticationProvider/services/helpers';
import Button from '../Button/Button';
import { Container } from './services/styled';
import { PageContainerProps } from './services/types';

const PageContainer = ({ className, children }: PageContainerProps) => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Container className={className}>
            {isAuthenticated && <Button onClick={logout}>Logout</Button>}
            {children}
        </Container>
    );
};

export default PageContainer;
