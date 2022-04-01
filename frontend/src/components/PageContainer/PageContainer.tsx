import { useAuth } from '../AuthenticationProvider/services/helpers';
import Button from '../Button/Button';
import { Container, ButtonWrapper } from './services/styled';
import { PageContainerProps } from './services/types';

const PageContainer = ({ children }: PageContainerProps) => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Container>
            {isAuthenticated && (
                <ButtonWrapper>
                    <Button onClick={logout}>Logout</Button>
                </ButtonWrapper>
            )}
            {children}
        </Container>
    );
};

export default PageContainer;
