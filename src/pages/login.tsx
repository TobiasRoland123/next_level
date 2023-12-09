import { FormEvent, useState } from "react";
import { Input } from "@/components/Inputfields/Inputfield";
import { Button } from "@/components/Button/Button";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Layout } from "@/Layout";

export default function Login() {
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const router = useRouter();

  //   const supabase = createClientComponentClient();
  const [user, setUser] = useState({ email: "", password: "" });
  const supabase = createClient(
    "https://zwcshwxjwoffkdrdvbtp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y3Nod3hqd29mZmtkcmR2YnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNzg5NzgsImV4cCI6MjAxNjY1NDk3OH0.yq0erC0CIBZmUG9uMC8u1YVyG4g2dsf3PrpekxJDq34"
  );
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
      console.error("Error during login:", error);
      // You can also display the error to the user or perform other actions here
    }
  };

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      throw new Error(error.message); // Throw an error if there is an error during sign-in
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
          <form
            onSubmit={handleLogin}
            className="w-full"
          >
            <Input
              value={user.email}
              id="email"
              labelText="Email"
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            ></Input>
            <Input
              value={user.password}
              id="password"
              labelText="Password"
              type="password"
              className="mb-4"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></Input>
            <Button>Login</Button>
          </form>
        </section>
      </main>
    </>
  );
}
