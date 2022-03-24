import { MdSentimentDissatisfied } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import iconSizes from '../../styleTokens/iconSizes';
import Button from '../Button/Button';
import PageContainer from '../PageContainer/PageContainer';
import { Container, MessageContainer } from './services/styled';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <PageContainer>
            <Container>
                <MessageContainer>
                    <MdSentimentDissatisfied size={iconSizes.extraLarge} />
                    Page not found
                </MessageContainer>
                <Button onClick={handleBackClick} type="button">
                    Take me back
                </Button>
            </Container>
        </PageContainer>
    );
};

export default NotFoundPage;
