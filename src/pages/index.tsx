import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Cards/Card';
import { GameCard } from '@/components/GameCard/GameCard';

export default function Home() {
  return (
    <div className="m-auto max-w-7xl flex flex-col gap-12 my-5">
      <h1>Hello World</h1>

      <Button className="bg-green-500">test button</Button>
    </div>
  );
}
