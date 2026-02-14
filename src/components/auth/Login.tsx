import { useForm } from '@tanstack/react-form'
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store';
import { loginAction } from '@/lib/slice/authAction';
import { useNavigate } from 'react-router';
import type { LoginRequest } from '@/types/authTypes';
import { clearAuth } from '@/lib/slice/authSlice';
import { useEffect } from 'react';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const { loading, success } = useSelector((state: RootState) => state.auth)


    const loginFormSchema = z.object({
        email: z.email(),
        password: z.string().min(8),
    });


    const form = useForm({
        defaultValues: {
            email: "",
            password: "",

        },
        validators: {
            onSubmit: loginFormSchema,
        },
        onSubmit: async ({ value }) => {
            dispatch(clearAuth());
            dispatch(loginAction(value as LoginRequest));
        }
    })
    useEffect(() => {
        if (success) {
            navigate("/dashboard");
        }
    }, [success])

    function handleGoogleOAuth2() {
        window.location.href = "http://localhost:8080/api/v1/oauth2/authorization/google";
    }

    function handleForgotPassword(): void {

        navigate("/forgot-password");
    }
    return (
        <div>
            <form
                id="login_form"
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}
            >
                <Field>
                    <Button variant="outline" type="button" onClick={handleGoogleOAuth2}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card py-10">
                    Or continue with
                </FieldSeparator>
                <FieldGroup>
                    <form.Field
                        name="email"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="john.doe@email.com"
                                        autoComplete="off"
                                        disabled={loading}
                                    />
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )
                        }}
                    />
                    <form.Field
                        name="password"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid


                            return (
                                <Field data-invalid={isInvalid}>
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Button variant="link" type='button'
                                            onClick={handleForgotPassword}
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Button>
                                    </div>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="password"
                                        autoComplete="off"
                                        disabled={loading}
                                    />
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )
                        }}
                    />

                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="login_form"
                            disabled={loading}>
                            Login
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default LoginForm