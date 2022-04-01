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
        const formValues = new FormData(e.currentTarget);

        const password = formValues.get(PASSWORD);
        const username = formValues.get(USERNAME);

        if (!password || !username) return; //show error to user

        const body = {
            password: password.toString(),
            username: username.toString(),
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
                    <Button type="submit">Login</Button>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default LoginPage;
