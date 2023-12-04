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
import InputMask from "react-input-mask";
import { Input } from "../../../components/Inputfields/Inputfield";
import { Button } from "../../../components/Button/Button";
import { SelectField } from "../../../components/Select/SelectField";
import { Textarea } from "../../../components/Textarea/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface ContactFormProps {
  // Add any additional props if needed
  selectedValue: string;
  onSelectChange: (value: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  selectedValue,
  onSelectChange,
}) => {
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(selectedValue);
    console.log(values);
  };
  return (
    <AnimatePresence>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* SUBJECT */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Hvad vil du gerne kontakt os omkring?</FormLabel>
                <FormControl>
                  <div
                    className={
                      form.formState.errors.amountOfKids ? "shake" : ""
                    }
                  >
                    <SelectField
                      onSelectChange={(selectedValue) => {
                        onSelectChange(selectedValue);
                      }}
                      {...field}
                    />
                  </div>
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
              <motion.div
                initial={{ opacity: 0, y: "-5%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                {Object.keys(form.formState.errors).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: "-5%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <p>* = Skal udfyldes</p>
                  </motion.div>
                )}
                <FormField
                  control={form.control}
                  name="amountOfKids"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Antal børn*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.amountOfKids ? "shake" : ""
                          }
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.amountOfKids
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            className="remove-arrow"
                            type="number"
                            placeholder="15"
                            {...field}
                          />
                          {form.formState.errors.amountOfKids ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.amountOfKids ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: "-15%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="amountOfAdults"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Antal voksne* </FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.amountOfAdults ? "shake" : ""
                          }
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.amountOfAdults
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            className="remove-arrow"
                            type="number"
                            placeholder="24"
                            {...field}
                          />
                          {form.formState.errors.amountOfAdults ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.amountOfAdults ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* NAME */}
              <motion.div
                initial={{ opacity: 0, y: "-10%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="navn"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Dit navn*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.navn ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.navn
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John Jensen"
                            {...field}
                          />
                          {form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* EMAIL */}
              <motion.div
                initial={{ opacity: 0, y: "-20%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.email ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.email
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John@jensen.dk"
                            {...field}
                          />
                          {form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* PHONE */}
              <motion.div
                initial={{ opacity: 0, y: "-30%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="phoneNum"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Telefon nr.</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.phoneNum ? "shake" : ""
                          }
                        >
                          <InputMask
                            name="phoneNum"
                            className="flex h-10 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="12 34 56 78"
                            type="tel"
                            mask="99 99 99 99"
                            maskChar=""
                            value={field.value}
                            onChange={field.onChange}
                            style={{
                              borderColor: form.formState.errors.phoneNum
                                ? "red"
                                : form.formState.touchedFields.phoneNum
                                ? "green"
                                : "",
                            }}
                          />
                          {form.formState.errors.phoneNum ? (
                            <div
                              className="absolute 
                            top-1.5
                            right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.touchedFields.phoneNum ? (
                            <div
                              className="absolute 
                          top-1.5
                          right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove "text-transparent" if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* MESSAGE */}
              <motion.div
                initial={{ opacity: 0, y: "-25%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="textFieldMessage"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>* Din besked</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.textFieldMessage
                              ? "shake"
                              : ""
                          }
                        >
                          <Textarea
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.textFieldMessage
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="Jeg vil gerne høre om..."
                            {...field}
                          />
                          {form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-0">Send Besked</Button>
              </motion.div>
            </>
          )}

          {/* FIRMA EVENT */}
          {selectedValue === "firma-event" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: "-5%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                {Object.keys(form.formState.errors).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: "-5%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <p>* = Skal udfyldes</p>
                  </motion.div>
                )}
                <FormField
                  control={form.control}
                  name="amountOfParticipants"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Antal deltagende*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.amountOfParticipants
                              ? "shake"
                              : ""
                          }
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.amountOfParticipants
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            className="remove-arrow"
                            type="number"
                            placeholder="15"
                            {...field}
                          />
                          {form.formState.errors.amountOfParticipants ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.amountOfParticipants ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* NAME */}
              <motion.div
                initial={{ opacity: 0, y: "-10%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="navn"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Dit navn*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.navn ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.navn
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John Jensen"
                            {...field}
                          />
                          {form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* EMAIL */}
              <motion.div
                initial={{ opacity: 0, y: "-20%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.email ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.email
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John@jensen.dk"
                            {...field}
                          />
                          {form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* PHONE */}
              <motion.div
                initial={{ opacity: 0, y: "-30%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="phoneNum"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Telefon nr.</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.phoneNum ? "shake" : ""
                          }
                        >
                          <InputMask
                            name="phoneNum"
                            className="flex h-10 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="12 34 56 78"
                            type="tel"
                            mask="99 99 99 99"
                            maskChar=""
                            value={field.value}
                            onChange={field.onChange}
                            style={{
                              borderColor: form.formState.errors.phoneNum
                                ? "red"
                                : form.formState.touchedFields.phoneNum
                                ? "green"
                                : "",
                            }}
                          />
                          {form.formState.errors.phoneNum ? (
                            <div
                              className="absolute 
                            top-1.5
                            right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.touchedFields.phoneNum ? (
                            <div
                              className="absolute 
                          top-1.5
                          right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove "text-transparent" if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* MESSAGE */}
              <motion.div
                initial={{ opacity: 0, y: "-25%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="textFieldMessage"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Din besked*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.textFieldMessage
                              ? "shake"
                              : ""
                          }
                        >
                          <Textarea
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.textFieldMessage
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="Jeg vil gerne høre om..."
                            {...field}
                          />
                          {form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-0">Send Besked</Button>
              </motion.div>
            </>
          )}

          {selectedValue === "andet" && (
            <>
              {Object.keys(form.formState.errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: "-5%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <p>* = Skal udfyldes</p>
                </motion.div>
              )}
              {/* NAME */}
              <motion.div
                initial={{ opacity: 0, y: "-10%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="navn"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Dit navn*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.navn ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.navn
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John Jensen"
                            {...field}
                          />
                          {form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* EMAIL */}
              <motion.div
                initial={{ opacity: 0, y: "-20%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.email ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.email
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John@jensen.dk"
                            {...field}
                          />
                          {form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* PHONE */}
              <motion.div
                initial={{ opacity: 0, y: "-30%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="phoneNum"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Telefon nr.</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.phoneNum ? "shake" : ""
                          }
                        >
                          <InputMask
                            name="phoneNum"
                            className="flex h-10 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="12 34 56 78"
                            type="tel"
                            mask="99 99 99 99"
                            maskChar=""
                            value={field.value}
                            onChange={field.onChange}
                            style={{
                              borderColor: form.formState.errors.phoneNum
                                ? "red"
                                : form.formState.touchedFields.phoneNum
                                ? "green"
                                : "",
                            }}
                          />
                          {form.formState.errors.phoneNum ? (
                            <div
                              className="absolute 
                            top-1.5
                            right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.touchedFields.phoneNum ? (
                            <div
                              className="absolute 
                          top-1.5
                          right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove "text-transparent" if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* MESSAGE */}
              <motion.div
                initial={{ opacity: 0, y: "-25%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="textFieldMessage"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Din besked*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.textFieldMessage
                              ? "shake"
                              : ""
                          }
                        >
                          <Textarea
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.textFieldMessage
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="Jeg vil gerne høre om..."
                            {...field}
                          />
                          {form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-0">Send Besked</Button>
              </motion.div>
            </>
          )}
          {selectedValue === "turnering" && (
            <>
              {Object.keys(form.formState.errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: "-5%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <p>* = Skal udfyldes</p>
                </motion.div>
              )}
              {/* NAME */}
              <motion.div
                initial={{ opacity: 0, y: "-10%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="navn"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Dit navn*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.navn ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.navn
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John Jensen"
                            {...field}
                          />
                          {form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.navn ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* EMAIL */}
              <motion.div
                initial={{ opacity: 0, y: "-20%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={form.formState.errors.email ? "shake" : ""}
                        >
                          <Input
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.email
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="John@jensen.dk"
                            {...field}
                          />
                          {form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.email ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* PHONE */}
              <motion.div
                initial={{ opacity: 0, y: "-30%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="phoneNum"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Telefon nr.</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.phoneNum ? "shake" : ""
                          }
                        >
                          <InputMask
                            name="phoneNum"
                            className="flex h-10 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="12 34 56 78"
                            type="tel"
                            mask="99 99 99 99"
                            maskChar=""
                            value={field.value}
                            onChange={field.onChange}
                            style={{
                              borderColor: form.formState.errors.phoneNum
                                ? "red"
                                : form.formState.touchedFields.phoneNum
                                ? "green"
                                : "",
                            }}
                          />
                          {form.formState.errors.phoneNum ? (
                            <div
                              className="absolute 
                            top-1.5
                            right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.touchedFields.phoneNum ? (
                            <div
                              className="absolute 
                          top-1.5
                          right-0 pr-3 flex items-center pointer-events-none"
                            >
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove "text-transparent" if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* MESSAGE */}
              <motion.div
                initial={{ opacity: 0, y: "-25%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <FormField
                  control={form.control}
                  name="textFieldMessage"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Din besked*</FormLabel>
                      <FormControl>
                        <div
                          style={{ position: "relative" }}
                          className={
                            form.formState.errors.textFieldMessage
                              ? "shake"
                              : ""
                          }
                        >
                          <Textarea
                            style={{
                              borderColor: form.formState.isSubmitted
                                ? form.formState.errors.textFieldMessage
                                  ? "red"
                                  : "green"
                                : "none",
                            }}
                            placeholder="Jeg vil gerne høre om..."
                            {...field}
                          />
                          {form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <MdError className={"text-red-500 text-2xl"} />
                              </div>
                            </div>
                          ) : form.formState.isSubmitted &&
                            !form.formState.errors.textFieldMessage ? (
                            <div className="absolute top-1.5 right-0 pr-3 flex items-center pointer-events-none">
                              <div>
                                <IoIosCheckmarkCircle
                                  className={"text-green-500 text-2xl"}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-transparent">
                        Placeholder text
                        {/* Remove text-transparent if you need to use the field description */}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-0">Send Besked</Button>
              </motion.div>
            </>
          )}
        </form>
      </Form>
    </AnimatePresence>
  );
};

export default ContactForm;
