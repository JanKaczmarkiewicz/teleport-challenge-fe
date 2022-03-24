import { useAuth } from '../AuthenticationProvider/services/helpers';
import Button from '../Button/Button';
import { Container } from './services/styled';
import { PageContainerProps } from './services/types';

const PageContainer = ({ children }: PageContainerProps) => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Container>
            {isAuthenticated && <Button onClick={logout}>Logout</Button>}
            {children}
        </Container>
    );
};

export default PageContainer;
