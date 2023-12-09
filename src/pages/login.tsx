import { FormEvent, useState } from "react";
import { Input } from "@/components/Inputfields/Inputfield";
import { Button } from "@/components/Button/Button";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as z from "zod";
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
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const router = useRouter();

  //   const supabase = createClientComponentClient();
  const [user, setUser] = useState({ email: "", password: "" });
  const supabase = createClient(
    "https://zwcshwxjwoffkdrdvbtp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y3Nod3hqd29mZmtkcmR2YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzg5NzgsImV4cCI6MjAxNjY1NDk3OH0.yq0erC0CIBZmUG9uMC8u1YVyG4g2dsf3PrpekxJDq34"
  );

  const formSchema = z.object({
    email: z.string().email("Indtast en gyldig email"),
    password: z.string().min(6, { message: "Password er min 6 langt" }),
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log("user", user);
    try {
      await signInWithEmail();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      let errorMessage = "An error occurred during login.";
      throw new Error(errorMessage);
    }

    if (data) {
      router.push("/admin");
    }
  }
  return (
    <>
      <main className="flex justify-center pb-10 ">
        <section className=" bg-contrastCol/50 backdrop-blur-sm mt-28 mx-4 px-4 py-6 rounded-sm h-fit  ">
          <h3 className=" mb-4">
            Login to acess <span className="text-accentCol">admin page</span>
          </h3>
          <Form {...form}>
            <form
              onSubmit={handleLogin}
              className="w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        value={user.email}
                        id="email"
                        type="email"
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
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
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        value={user.password}
                        id="password"
                        type="password"
                        className="mb-4"
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
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
              <Button>Login</Button>
            </form>
          </Form>
        </section>
      </main>
    </>
  );
};

export default Login;
