import { useForm } from '@tanstack/react-form'

import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store';
import { signupAction } from '@/lib/slice/authAction';
import type { SignupRequest } from '@/types/authTypes';
import { useNavigate } from 'react-router';


function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.auth)


    const signupFormSchema = z.object({
        fullName: z.string(),
        email: z.email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),

    }).refine(data => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"],
    });

    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validators: {
            onSubmit: signupFormSchema,
        },
        onSubmit: async ({ value }) => {
            const { confirmPassword, ...signupData } = value;
            const signupWithRole = { ...signupData, role: 'ROLE_ADMIN' } as SignupRequest;
            dispatch(signupAction(signupWithRole)).then(() => {
                navigate("/email-verification");
            })

        }
    });


    return (
        <div>
            <form
                id="signup_form"
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}
            >
                <FieldGroup>
                    <form.Field
                        name="fullName"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="John"
                                        autoComplete="on"
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
                        name="email"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
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
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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

                    <form.Field
                        name="confirmPassword"
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="confirm password"
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
                        <Button type="submit" form="signup_form" disabled={loading}>
                            Create Account
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default SignupForm