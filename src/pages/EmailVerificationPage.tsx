import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { emailVerificationAction } from "@/lib/slice/authAction";
import type { AppDispatch, RootState } from "@/lib/store";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

function EmailVerificationPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth)

  const verificationCodeFormSchema = z.object({
    verificationCode: z.string().min(6).max(6),
  });


  const form = useForm({
    defaultValues: {
      verificationCode: "",
    },
    validators: {
      onSubmit: verificationCodeFormSchema,
    },
    onSubmit: async ({ value }) => {

      dispatch(emailVerificationAction({ data: value, userId: userId || "" })).then(() => {
        navigate("/");
      });

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
          <CardTitle className="text-xl">Verify Email</CardTitle>
          <CardDescription>
            Enter Verification code to verify email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <form
              id="code_verification_form"
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


                <Field orientation="horizontal">
                  <Button type="submit" form="code_verification_form"
                    disabled={loading}>
                    Verify
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

export default EmailVerificationPage