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
import { SelectField } from "../../../components/Select/SelectField";
import { Textarea } from "../../../components/Textarea/textarea";
import InputMask from "react-input-mask";

interface ContactFormProps {
  // Add any additional props if needed
}

export const ContactForm: React.FC<ContactFormProps> = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const formSchema = z.object({
    subject: z.string().min(1, {
      message: "Vælg venligst et emne",
    }),

    // Fødselsdag
    amountOfKids:
      selectedValue === "fødselsdag"
        ? z.string().min(1, {
            message: "Du skal vælge et antal børn",
          })
        : z.string(),
    amountOfAdults:
      selectedValue === "fødselsdag"
        ? z.string().min(1, {
            message: "Du skal vælge et antal voksne",
          })
        : z.string(),

    //   Firma event
    amountOfParticipants:
      selectedValue === "firma-event"
        ? z.string().min(1, {
            message: "Du skal vælge et antal voksne",
          })
        : z.string(),

    // Turnering and Andet
    navn: z.string().min(1, {
      message: "Dit navn skal minimum have 1 tegn ",
    }),
    email: z.string().email("Indtast en gyldig email"),
    phoneNum: z
      .union([
        z
          .string()
          .length(0, { message: "Indtast venligst et gyldigt telefonnummer" }),
        z.string().min(11),
      ])
      .optional(),

    textFieldMessage: z.string().min(1, {
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
      phoneNum: "",
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
          {/* SUBJECT */}
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

          {/* FØDSELSDAG */}
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
                        className="remove-arrow"
                        type="number"
                        placeholder="24"
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
                        className="remove-arrow"
                        type="number"
                        placeholder="4"
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
          {/* FIRMA EVENT */}
          {selectedValue === "firma-event" && (
            <FormField
              control={form.control}
              name="amountOfParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antal deltagende</FormLabel>
                  <FormControl>
                    <Input
                      className="remove-arrow"
                      type="number"
                      placeholder="24"
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

          {/* NAME */}
          <FormField
            control={form.control}
            name="navn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dit navn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Jensen"
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
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@jensen.dk"
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
          {/* PHONE */}
          <FormField
            control={form.control}
            name="phoneNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon nr.</FormLabel>
                <FormControl>
                  <InputMask
                    placeholder="12 34 56 78"
                    type="tel"
                    mask="99 99 99 99"
                    maskChar=""
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {(inputProps: any) => <Input {...inputProps} />}
                  </InputMask>

                  {/* <Input
                    className="remove-arrow"
                    type="number"
                    placeholder="12 34 56 78"
                    {...field}
                  /> */}
                </FormControl>
                <FormDescription className="text-transparent">
                  Placeholder text
                  {/* Remove "text-transparent" if you need to use the field description */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* MESSAGE */}
          <FormField
            control={form.control}
            name="textFieldMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Din besked</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jeg vil gerne høre om..."
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
