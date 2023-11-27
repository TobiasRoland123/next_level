import { FormEvent, useState } from "react";
import { Input } from "@/components/Inputfields/Inputfield";
import { Button } from "@/components/Button/Button";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Hello Jonas");
    console.log(user);
  };
  return (
    <>
      <main className="max-w-screen-xl max-w-main w-full pb-10 ">
        <section className=" bg-contrastCol/50 backdrop-blur-sm mt-28 mx-4 px-4 py-6 rounded-sm h-fit md:max-w-[66%]  lg:max-w-3xl  ">
          <h3>
            Login to acess <span className="text-accentCol">admin page</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <Input value={user.email} id="email" labelText="Email" type="email" onChange={(e) => setUser({ ...user, email: e.target.value })}></Input>
            <Input value={user.password} id="password" labelText="Password" type="password" className="mb-4" onChange={(e) => setUser({ ...user, password: e.target.value })}></Input>
            <Button>Login</Button>
          </form>
        </section>
      </main>
    </>
  );
}
