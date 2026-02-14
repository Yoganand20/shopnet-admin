
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPasswordAction } from "@/lib/slice/authAction";
import type { AppDispatch, RootState } from "@/lib/store";
import type { ForgotPasswordRequest } from "@/types/authTypes";
import { useForm } from "@tanstack/react-form";
import { useDispatch, useSelector } from "react-redux";
import z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.auth)

    const forgotPasswordFormSchema = z.object({
        email: z.email(),
    });


    const form = useForm({
        defaultValues: {
            email: "",
        },
        validators: {
            onSubmit: forgotPasswordFormSchema,
        },
        onSubmit: async ({ value }) => {
            dispatch(forgotPasswordAction(value as ForgotPasswordRequest)).then(() => {
                setTimeout(() => {
                    setOpenDialog(true)
                }, 100)
            })
        }
    })

    const [openDialog, setOpenDialog] = useState(false);
    function handleBackToLoginPage(): void {
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center w-full m-auto h-full mt-30" >
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter you email to identify and send verification code if email is registerd
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <form
                            id="forgot_password_form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit()
                            }}
                        >
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
                                <Field orientation="horizontal">
                                    <Button type="submit" form="forgot_password_form"
                                        disabled={loading}>
                                        Reset Password
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </div>
                </CardContent>
            </Card>
            <AlertDialog onOpenChange={setOpenDialog} open={openDialog} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Password Reset Link sent?</AlertDialogTitle>
                        <AlertDialogDescription>
                            A Password reset link has been sent to the registed email address if an account exists.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleBackToLoginPage}>Go back to Login Page</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    )
}

export default ForgotPasswordPage
