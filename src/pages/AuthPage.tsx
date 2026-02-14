import { useState } from "react";
import LoginForm from "@/components/auth/Login";
import SignupForm from "@/components/auth/Signup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { setToken } from '@/lib/slice/authSlice';
import { initializeAuth } from "@/lib/slice/authAction";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";

const LoginCardHeader = () => {
    return (<CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
            Login with your Google account
        </CardDescription>
    </CardHeader>)
}

const SignupCardHeader = () => {
    return (<CardHeader className="text-center">
        <CardTitle className="text-xl">Hi there!!!</CardTitle>
        <CardDescription>
            Create your account and get started
        </CardDescription>
    </CardHeader>)
}

export default function AuthPage() {

    const [isNewUser, setIsNewUser] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        if (urlToken) {

            dispatch(setToken(urlToken));


            window.history.replaceState({}, document.title, "/");


            dispatch(initializeAuth());
        } else {
            // If no URL token, still try to initialize from LocalStorage
            dispatch(initializeAuth());
        }
    }, [dispatch]);



    return (
        <div className="flex justify-center items-center w-full m-auto h-full mt-30">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{isNewUser ? <SignupCardHeader /> : <LoginCardHeader />}</CardTitle>
                </CardHeader>
                <CardContent>

                    {isNewUser ? <SignupForm /> : <LoginForm />}
                </CardContent>
                <CardFooter>
                    <Button variant="link" onClick={() => setIsNewUser((prev) => !prev)}>
                        {isNewUser ? "Already have an account? Log in" : "New user? Sign up"}
                    </Button></CardFooter>
            </Card>
        </div>
    )
}