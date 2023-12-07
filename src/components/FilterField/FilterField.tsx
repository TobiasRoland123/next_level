import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input, InputProps } from "../Inputfields/Inputfield";
import { on } from "stream";
import { useState } from "react";

interface filterFieldProps {
  filterType: "dropDown" | "search";
  dropDownHeader: string;
  dropDownItems: Array<string>;
  inputProps?: InputProps;

  onChange: (value: string, type: string) => void;
}

export const FilterField = ({ filterType, dropDownHeader, dropDownItems, inputProps, onChange }: filterFieldProps) => {
  const [chosenValue, setChosenValue] = useState("");
  const valueType = dropDownHeader?.toLowerCase();

  // console.log("This is valueType", valueType);

  return (
    <>
      {filterType === "dropDown" ? (
        <Select
          onValueChange={(chosenValue) => {
            onChange(chosenValue, valueType);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder={dropDownHeader ? dropDownHeader : "Filips dejlige mor"} />
          </SelectTrigger>
          <SelectContent>
            {dropDownItems?.map((item) => {
              return <SelectItem value={item}>{item}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      ) : (
        <Input
          isSearch
          {...inputProps}
        />
      )}
    </>
  );
};
