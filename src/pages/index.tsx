import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Cards/Card';

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>

      <Button className="bg-green-500">test button</Button>
      <div className="flex gap-5">
        <Card
          variant={'level1'}
          header="Level 1"
          timeAntal={5}
          totalPris={70}
        ></Card>
        <Card
          variant={'level2'}
          header="Level 2"
          timeAntal={10}
          totalPris={120}
        ></Card>
        <Card
          variant={'level3'}
          header="Level 3"
          oprettelseInkl
        ></Card>
        <Card
          variant={'expert'}
          header="Expert"
          oprettelseInkl
        ></Card>
        <Card
          variant={'master'}
          header="Master"
          oprettelseInkl
        ></Card>
      </div>
    </>
  );
}
