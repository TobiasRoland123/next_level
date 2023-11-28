import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormField,
  Form,
  useFormField,
} from "../../../components/ui/form";
import { Input } from "../../../components/Inputfields/Inputfield";
import { Button } from "../../../components/Button/Button";

export const ContactForm = () => {
  const formSchema = z.object({
    navn: z.string().min(1, {
      message: "Dit navn skal minimum have 1 tegn",
    }),
    email: z.string({}).email("Indtast en gyldig email"),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      navn: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="navn"
            render={({ field }) => {
              const { error } = useFormField();
              const isValid = field.value ? !error : null;
              return (
                <FormItem>
                  <FormLabel>Dit navn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Navn"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-transparent">
                    Placeholder text
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indtast din email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-transparent">
                  Placeholder text
                  {/* Remove text-transparent if you need to use the field description */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
