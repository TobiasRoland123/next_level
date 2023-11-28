import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Cards/Card';
import { GameCard } from '@/components/GameCard/GameCard';

export default function Home() {
  return (
    <div className="m-auto max-w-7xl flex flex-col gap-12 my-5">
      <h1>Hello World</h1>

      <Button className="bg-green-500">test button</Button>
      {/*  <div className="flex flex-col gap-20 m-auto justify-center ">
        <div className="flex gap-16 justify-center">
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
            timeAntal={15}
            totalPris={150}
            oprettelseInkl
          ></Card>
        </div>
        <div className="flex gap-16 justify-center">
          <Card
            variant={'expert'}
            header="Expert"
            timeAntal={50}
            totalPris={450}
            oprettelseInkl
          ></Card>
          <Card
            variant={'master'}
            header="Master"
            timeAntal={100}
            totalPris={700}
            oprettelseInkl
          ></Card>
        </div>
      </div>
      <div className="m-auto">
        <Card
          variant={'nlp'}
          header="nlp"
          timePris={30}
          oprettelseInkl
        ></Card>
      </div>
      <div className="m-auto flex w-full justify-evenly">
        <Card
          variant={'bday1'}
          header="Fødselsdag"
          totalPris={120}
        ></Card>
        <Card
          variant={'bday2'}
          header="Fødselsdag"
          totalPris={150}
        ></Card>
      </div> */}
      <GameCard
        Name="Counter-Strike 2"
        Console={['PC', 'PS5']}
        Tags={['FPS', 'COMPETITIVE', 'SHOOTER']}
        Image_="https://media.rawg.io/media/games/ec4/ec4b02bdb3eb5c6212992c19bc05697e.jpg"
      ></GameCard>
    </div>
  );
}
