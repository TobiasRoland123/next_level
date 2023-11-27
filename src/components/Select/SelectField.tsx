import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SelectField = () => {
  return (
    <>
      <Select>
        <Label>Vælg din forespørgsel</Label>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Emne" />
        </SelectTrigger>
        <SelectContent className="border-none bg-contrastCol/50">
          <SelectItem value="fødselsdag">Fødselsdag</SelectItem>
          <SelectItem value="firma-event">Firma event</SelectItem>
          <SelectItem value="turnering">Turnering</SelectItem>
          <SelectItem value="andet">Andet</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
