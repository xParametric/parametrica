import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  list: string[];
  activeItem: string;
  category: string;
  onChange: (item: string) => void;
}

export const Filter: React.FC<Props> = ({
  list,
  activeItem,
  category,
  onChange,
}) => {
  const handleChange = (item: string) => {
    onChange(item);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={activeItem}>
      <SelectTrigger className="flex items-center w-fit">
        <SelectValue placeholder={`${category}: ${activeItem}`} />
      </SelectTrigger>
      <SelectContent>
        {list.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
