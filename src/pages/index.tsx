import { Button } from "@/components/Button/Button";
import { List } from "@/components/List/List";
import { Modal } from "@/components/Modal/Modal";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <Button label="okok" />

      <List item="test item" />

      <Modal title="Open modal" />
    </>
  );
}
