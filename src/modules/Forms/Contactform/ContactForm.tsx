import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import { SelectField } from "@/components/Select/SelectField";
import { Textarea } from "@/components/Textarea/textarea";

interface ContactFormProps {
  // Add any additional props if needed
}

export const ContactForm: React.FC<ContactFormProps> = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const formSchema = z.object({
    subject: z.string({}).min(1, {
      message: "Vælg venligst et emne",
    }),

    // Fødselsdag
    amountOfKids:
      selectedValue === "fødselsdag"
        ? z.string({}).min(1, {
            message: "Du skal vælge et antal børn",
          })
        : z.string({}),
    amountOfAdults:
      selectedValue === "fødselsdag"
        ? z.string({}).min(1, {
            message: "Du skal vælge et antal voksne",
          })
        : z.string({}),

    //   Firma event
    amountOfParticipants:
      selectedValue === "firma-event"
        ? z.string({}).min(1, {
            message: "Du skal vælge et antal voksne",
          })
        : z.string({}),

    // Turnering and Andet
    navn: z.string({}).min(1, {
      message: "Dit navn skal minimum have 1 tegn ",
    }),
    email: z.string({}).email("Indtast en gyldig email"),

    textFieldMessage: z.string({}).min(1, {
      message: "Uddyb venligst hvorfor du henvender dig",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: selectedValue,
      navn: "",
      email: "",
      amountOfKids: "",
      amountOfAdults: "",
      amountOfParticipants: "",
      textFieldMessage: "",
    },
  });

  //   Used for updating the value of the selected value
  useEffect(() => {
    form.setValue("subject", selectedValue);
  }, [selectedValue]);
  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(selectedValue);
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
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hvad vil du gerne kontakt os omkring?</FormLabel>
                <FormControl>
                  <SelectField
                    onSelectChange={(selectedValue) => {
                      //console.log("Value from contact", selectedValue);
                      setSelectedValue(selectedValue);
                    }}
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

          {/* Fødselsdag */}
          {selectedValue === "fødselsdag" && (
            <>
              <FormField
                control={form.control}
                name="amountOfKids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Antal børn</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Antal børn"
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
              <FormField
                control={form.control}
                name="amountOfAdults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Antal voksne</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Antal voksne"
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
            </>
          )}
          {/* Firma event */}
          {selectedValue === "firma-event" && (
            <FormField
              control={form.control}
              name="amountOfParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antal deltagende</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Antal deltagende"
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
          )}

          <FormField
            control={form.control}
            name="navn"
            render={({ field }) => (
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
                  {/* Remove text-transparent if you need to use the field description */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
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

          <FormField
            control={form.control}
            name="textFieldMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Din besked</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Hvad vil du spørge om?"
                    {...field}
                  ></Textarea>
                </FormControl>
                <FormDescription className="text-transparent">
                  Placeholder text
                  {/* Remove text-transparent if you need to use the field description */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Send Besked</Button>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
