import { MdSentimentDissatisfied } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import iconSizes from '../../styleTokens/iconSizes';
import Button from '../Button/Button';
import { NotFoundPageContainer, MessageContainer } from './services/styled';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <NotFoundPageContainer>
            <MessageContainer>
                <MdSentimentDissatisfied size={iconSizes.extraLarge} />
                Page not found
            </MessageContainer>
            <Button onClick={handleBackClick} type="button">
                Take me back
            </Button>
        </NotFoundPageContainer>
    );
};

export default NotFoundPage;
