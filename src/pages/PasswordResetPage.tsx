import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPasswordAction } from "@/lib/slice/authAction";
import type { AppDispatch, RootState } from "@/lib/store";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

function PasswordResetPage() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.auth)

    const passwordResetFormSchema = z.object({
        verificationCode: z.string().min(6).max(6),
        newPassword: z.string().min(8),
        confirmNewPassword: z.string().min(8),
    });


    const form = useForm({
        defaultValues: {
            verificationCode: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validators: {
            onSubmit: passwordResetFormSchema,
        },
        onSubmit: async ({ value }) => {
            const { confirmNewPassword, ...resetPasswordData } = value;
            dispatch(resetPasswordAction({ data: resetPasswordData, userId: userId || "" }));
            navigate("/");


        }


    })
    const [searchParams] = useSearchParams();

    const userId = searchParams.get('userId');
    const code = searchParams.get('code');

    useEffect(() => {
        if (code) {
            form.setFieldValue("verificationCode", code);
        }

        if (!userId || !code) {
            toast.error("Invalid reset link. Missing User ID or Security Code.");
        }
    }, [code, userId, form]);
    return (

        <div className="flex justify-center items-center w-full m-auto h-full mt-30" >
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>
                        Enter verification Code and set new password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <form
                            id="creset_password_form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit()
                            }}
                        >
                            <FieldGroup>
                                <form.Field
                                    name="verificationCode"
                                    children={(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    placeholder="Code"
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
                                    name="newPassword"
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
                                                    placeholder="new password"
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
                                    name="confirmNewPassword"
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
                                                    placeholder="confirm new password"
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
                                    <Button type="submit" form="creset_password_form"
                                        disabled={loading}>
                                        Reset Password
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div >

    )
}

export default PasswordResetPage