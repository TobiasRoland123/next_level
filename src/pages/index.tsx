import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Cards/Card';

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>

      <Button className="bg-green-500">test button</Button>

      <Card
        variant={'level1'}
        header="ye mum"
      ></Card>
      <Card
        variant={'level2'}
        header="ye mum"
      ></Card>
      <Card
        variant={'level2'}
        header="ye mum"
      ></Card>
      <Card
        variant={'expert'}
        header="ye mum"
      ></Card>
      <Card
        variant={'master'}
        header="ye mum"
      ></Card>
    </>
  );
}
