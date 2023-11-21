import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Inputfields/Inputfield";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>

      <Button className="bg-green-500">test button</Button>
      <Input
        labelText=""
        placeholder=""
        type=""
      ></Input>
    </>
  );
}
