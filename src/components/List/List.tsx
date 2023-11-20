interface ListProps {
  item: string;
}

export const List = ({ item }: ListProps) => {
  return (
    <>
      <ul>
        <li>{item}</li>
        <li>{item}</li>
        <li>{item}</li>
        <li>{item}</li>
      </ul>
    </>
  );
};
