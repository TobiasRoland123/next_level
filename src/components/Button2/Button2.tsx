interface Button2props {
  label?: string;
}

export const Button2 = ({ label }: Button2props) => {
  return <button>{label}</button>;
};
