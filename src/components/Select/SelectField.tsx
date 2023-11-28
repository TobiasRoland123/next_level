import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface SelectFieldProps {
  onSelectChange: (selectValue: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ onSelectChange }) => {
  return (
    <>
      <Select
        // Add "open" for easier access to options
        onValueChange={(selectValue) => {
          onSelectChange(selectValue);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Emne" />
        </SelectTrigger>
        <SelectContent className="border-none bg-contrastCol">
          <SelectItem value="fødselsdag">Fødselsdag</SelectItem>
          <SelectItem value="firma-event">Firma event</SelectItem>
          <SelectItem value="turnering">Turnering</SelectItem>
          <SelectItem value="andet">Andet</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
