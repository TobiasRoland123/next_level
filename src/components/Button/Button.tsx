interface ButtonProps {
  type?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const Button = ({ type = "primary", size = "sm", label }: ButtonProps) => {
  const btnSize = size === "sm" ? "px-7 py-3" : size === "md" ? "px-10 py-6" : "";

  return (
    <button
      className={`${
        type && type === "primary" ? "bg-red-600" : type === "secondary" ? "bg-blue-500" : "text-black"
      } rounded-sm ${btnSize} px-7 py-3 font-semibold uppercase text-white hover:border-red-600 hover:border-2 hover:bg-white hover:text-red-600`}
    >
      {label ? label : "test"}
    </button>
  );
};
