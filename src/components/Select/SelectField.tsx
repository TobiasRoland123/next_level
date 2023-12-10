import { useAnimate, stagger } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface SelectFieldProps {
  selectedValue: string;
  onSelectChange: (selectValue: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  onSelectChange,
  selectedValue,
}) => {
  return (
    <>
      <Select
        // Add "open" for easier access to options
        onValueChange={(selectValue) => {
          onSelectChange(selectValue);
        }}
        value={selectedValue}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Emne" />
        </SelectTrigger>
        <SelectContent className="border-none bg-contrastCol">
          <SelectItem value="fødselsdag">Fødselsdag</SelectItem>
          <SelectItem value="firma-event">Firma event</SelectItem>
          <SelectItem value="turnering">Turnering</SelectItem>
          <SelectItem value="andet">Andet</SelectItem>
          <SelectItem value="nlp">NLP-rummet</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
