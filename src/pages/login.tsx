import { FormEvent, useState } from "react";
import { Input } from "@/components/Inputfields/Inputfield";
import { Button } from "@/components/Button/Button";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Layout } from "@/Layout";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormField,  
  Form,
  useFormField,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [isLoginValid, setIsLoginValid] = useState<boolean | null>(null);
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const router = useRouter();

  //   const supabase = createClientComponentClient();
  const [user, setUser] = useState({ email: "", password: "" });

  const supabase = createClient(
    "https://zwcshwxjwoffkdrdvbtp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y3Nod3hqd29mZmtkcmR2YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzg5NzgsImV4cCI6MjAxNjY1NDk3OH0.yq0erC0CIBZmUG9uMC8u1YVyG4g2dsf3PrpekxJDq34"
  );

  // Errormessages for validation of the string in the input field.
  const formSchema = z.object({
    email: z.string().email("Indtast en gyldig email"),
    password: z.string().min(6, { message: "Password skal være min 6 tegn" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      password: user.password,
    },
  });
  getSession();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) {
      return;
    }
    router.push("/admin");
  }

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      setSupabaseError(null);
      setIsLoginValid(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      // ! Set errormessage for Supabase here.
      if (error) {
        let errorMessage = "Forkert password eller email!";
        setSupabaseError(errorMessage); // Set the error message
        setIsLoginValid(false);
        throw new Error(errorMessage);
      }

      if (data) {
        setIsLoginValid(true);
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="flex justify-center pb-10 ">
        <AnimatePresence>
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
            <section className=" bg-contrastCol/50 backdrop-blur-sm mt-28 mx-4 px-4 py-6 rounded-sm h-fit  ">
              <motion.div
                initial={{ opacity: 0, y: "-90%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <h3>Login to access admin page</h3>
              </motion.div>
              {isLoginValid === false ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    duration: 0.1,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <h4 className="text-accentCol shake">{supabaseError}</h4>
                </motion.div>
              ) : (
                <h4 className="text-transparent">Placeholder text</h4>
              )}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLogin)}
                  className="w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: "-60%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div
                              style={{ position: "relative" }}
                              className={
                                form.formState.errors.email ||
                                isLoginValid === false
                                  ? "shake"
                                  : ""
                              }
                            >
                              <Input
                                style={{
                                  borderColor:
                                    form.formState.isSubmitted &&
                                    (form.formState.errors.email ||
                                      isLoginValid === false)
                                      ? "red"
                                      : isLoginValid === true
                                      ? "green"
                                      : "none",
                                }}
                                {...field}
                                id="email"
                                type="email"
                              />
                              {form.formState.errors.email ||
                              isLoginValid === false ? (
                                <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
                                  <div>
                                    <MdError
                                      className={"text-red-500 text-2xl"}
                                    />
                                  </div>
                                </div>
                              ) : form.formState.isSubmitted &&
                                !form.formState.errors.email ? (
                                <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
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
                    initial={{ opacity: 0, y: "-80%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 100,
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="mt-5">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div
                              style={{ position: "relative" }}
                              className={
                                form.formState.errors.password ||
                                isLoginValid === false
                                  ? "shake"
                                  : ""
                              }
                            >
                              <Input
                                style={{
                                  borderColor:
                                    form.formState.isSubmitted &&
                                    (form.formState.errors.password ||
                                      isLoginValid === false)
                                      ? "red"
                                      : isLoginValid === true
                                      ? "green"
                                      : "none",
                                }}
                                {...field}
                                id="password"
                                type="password"
                              />
                              {form.formState.errors.password ||
                              isLoginValid === false ? (
                                <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
                                  <div>
                                    <MdError
                                      className={"text-red-500 text-2xl"}
                                    />
                                  </div>
                                </div>
                              ) : form.formState.isSubmitted &&
                                !form.formState.errors.password ? (
                                <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
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
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 100,
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <Button>Login</Button>
                  </motion.div>
                </form>
              </Form>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

export default Login;
