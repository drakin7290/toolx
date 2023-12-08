
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Container from '~/components/base/Container';
import { TwitterLoginButton } from 'react-social-login-buttons';

const LoginContainer = () => {
    const router = useRouter();
    const onFinish = async (values) => {
        await signIn('credentials', {
            twitter_name: values.username,
            password: values.password,
            redirect: false
        })
            .then((callback) => {
                if (callback?.error) {
                    toast.error(callback?.error);
                }

                if (callback?.ok) {
                    router.push("/groups");
                }
            })
            .finally(() => { })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Container className="flex flex-col w-full min-h-screen items-center justify-center">
            <div>
                <img src='/imgs/logo.png' className='w-full max-w-[160px]' />
            </div>
            <TwitterLoginButton className='max-w-[430px]' onClick={() => {
                signIn('twitter')
            }} />
        </Container>
    )
};

export default LoginContainer;