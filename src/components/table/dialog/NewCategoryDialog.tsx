import { Dialog } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import type { TableAction } from "@/types/tableTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { createData } from "@/lib/slice/tableAction";

type EditCategoryProps = {
  action: TableAction;
};
function NewCategoryDialog({ action }: EditCategoryProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.table.currentData);



  const formSchema = z.object({
    name: z.string(),
    parentId: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      parentId: "",

    },
  })

  const [isOpen, setOpen] = useState(false);

  function handleOpenChange(state: boolean) {
    form.reset(form.formState.defaultValues);//rest form on open/close
    setOpen(state)
  }

  async function onSubmitFn(values: z.infer<typeof formSchema>) {
    const payload = {
      name: values.name,
      parentId: values.parentId,
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is type/name of the category.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="parentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Search..." {...field} />
                        </FormControl>
                        <FormDescription>
                          This is Parent Category
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

export default NewCategoryDialog;