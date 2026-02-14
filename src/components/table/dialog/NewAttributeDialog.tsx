import { Dialog } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { TableAction } from "@/types/tableTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { createData } from "@/lib/slice/tableAction";


const formSchema = z.object({
  type: z.string().min(2, "Type must be at least 2 Characters"),
  desc: z.string().optional(),
  values: z.array(z.object({
    value: z.string().min(1, "Value cannot be empty")
  })).min(1, "At least one value is required")
})
type FormValues = z.infer<typeof formSchema>;


type EditAttributeProps = {
  action: TableAction;
};
function NewAttributeDialog({ action }: EditAttributeProps) {

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.table.currentData);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      desc: "",
      values: [{ value: "" }],

    },
  })
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "values", });

  const [isOpen, setOpen] = useState(false);

  function handleOpenChange(state: boolean) {
    form.reset(form.formState.defaultValues);//rest form on open/close
    setOpen(state)
  }

  async function onSubmitFn(values: z.infer<typeof formSchema>) {
    const payload = {
      type: values.type,
      desc: values.desc,
      values: values.values.map(v => v.value),
    };
    const result = await dispatch(createData(payload));

    if (result.meta.requestStatus == "fulfilled") {
      handleOpenChange(false); // close after submit
      form.reset();
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <Form {...form}>
          <DialogTrigger asChild>
            <Button className="h-8 w-18 p-0">{action?.displayText}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-100">
            <form onSubmit={form.handleSubmit(onSubmitFn)}>
              <DialogHeader>
                <DialogTitle>New </DialogTitle>
                <DialogDescription>
                  Create new Attribute.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-7 mt-5">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Color" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is type/name of the attribute.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Items primary colour" {...field} />
                        </FormControl>
                        <FormDescription>
                          This describes attribute.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormLabel>Values</FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <Input {...form.register(`values.${index}.value`)} placeholder={`Value ${index + 1}`} />
                      <button type="button" onClick={() => remove(index)} > ✕ </button>
                    </div>
                  )
                  )}
                  <Button className="mt-5" type="button" variant="outline" onClick={() => append([{ value: "" }])}  >
                    + Add Value
                  </Button>
                </div>
              </div>
              <DialogFooter className="mt-5 ">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">{loading ? "Saving..." : "Save changes"}</Button>
              </DialogFooter>

            </form>
          </DialogContent>
        </Form>
      </Dialog>
    </div>
  )
}

export default NewAttributeDialog;