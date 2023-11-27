import { Input } from "../../components/Inputfields/Inputfield";
import { Button } from "../../components/Button/Button";

interface FormProps {
  handlerFunction?: () => void | undefined;
}

export const LoginModule = ({ handlerFunction }: FormProps) => {
  return (
    <>
      <form onSubmit={handlerFunction}>
        <Input labelText="Email"></Input>
        <Input labelText="Password" className="mb-4"></Input>
        <Button>Login</Button>
      </form>
    </>
  );
};
