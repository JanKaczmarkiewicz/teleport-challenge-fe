import { FormEventHandler } from 'react';
import { useAuth } from '../AuthenticationProvider/services/helpers';
import Button from '../Button/Button';
import Input from '../Input/Input';
import PageContainer from '../PageContainer/PageContainer';
import { Form, Text, Wrapper } from './services/styled';

const USERNAME = 'username';
const PASSWORD = 'password';

const LoginPage = () => {
    const { login } = useAuth();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formValues = Object.fromEntries(new FormData(e.currentTarget));

        const body = {
            password: formValues[PASSWORD].toString(),
            username: formValues[USERNAME].toString(),
        };

        login(body).catch(() => {
            //show error to user
        });
    };

    return (
        <PageContainer>
            <Wrapper>
                <Form onSubmit={onSubmit}>
                    <Text>Welcome back!</Text>
                    <Input
                        isFullWidth
                        name={USERNAME}
                        placeholder="username"
                        type="text"
                    />
                    <Input
                        isFullWidth
                        name={PASSWORD}
                        placeholder="password"
                        type="password"
                    />
                    <Button>Login</Button>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default LoginPage;
