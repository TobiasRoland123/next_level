import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input, InputProps } from '../Inputfields/Inputfield';
import { on } from 'stream';
import { useEffect, useState } from 'react';

interface filterFieldProps {
  filterType: 'dropDown' | 'search';
  dropDownHeader?: string;
  dropDownItems?: Array<string>;
  inputPlaceholder?: string;

  onChange: (value: string, type: string) => void;
}

export const FilterField = ({
  filterType,
  dropDownHeader,
  dropDownItems,
  inputPlaceholder,
  onChange,
}: filterFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const valueType = dropDownHeader?.toLowerCase() || inputPlaceholder?.toLowerCase() || '';

  // console.log("This is valueType", valueType);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    onChange(inputValue, 'search');
  }, [inputValue]);

  return (
    <>
      {filterType === 'dropDown' ? (
        <Select
          onValueChange={chosenValue => {
            onChange(chosenValue, valueType);
          }}
        >
          <SelectTrigger className=' max-w-[250px] '>
            <SelectValue placeholder={dropDownHeader ? dropDownHeader : 'Filips dejlige mor'} />
          </SelectTrigger>
          <SelectContent className='border-none'>
            {dropDownItems?.map(item => {
              return (
                <SelectItem
                  className='duration-50'
                  value={item}
                >
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type='search'
          isSearch
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={handleInputChange}
          isEmpty={inputValue === ''}
        />
      )}
    </>
  );
};
