import { Button } from "../Button/Button";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <nav className="mx-4 mt-6 backdrop-blur-sm bg-contrastCol/50  flex justify-between  items-center  px-4 py-3 gap-6 rounded-sm">
      <div className=" w-8 flex flex-col gap-2 justify-center items-center  h-14">
        <span className=" h-1 bg-secondaryCol w-full"></span>
        <span className=" h-1 bg-secondaryCol w-full"></span>
        <span className=" h-1 bg-secondaryCol w-full"></span>
      </div>

      <Button>Book tid</Button>
    </nav>
  );
};
