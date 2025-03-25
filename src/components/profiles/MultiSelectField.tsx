import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface MultiSelectFieldProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  defaultOption?: string;
  hierarchical?: boolean;
  useCheckboxes?: boolean;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
  defaultOption,
  hierarchical = false,
  useCheckboxes = false
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValues.length > 0 ? (
            selectedValues.join(", ")
          ) : (
            <>
              {placeholder}
              {defaultOption ? ` (${defaultOption})` : ''}
            </>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    handleSelect(option);
                    if (!useCheckboxes) {
                      setOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center">
                    {useCheckboxes ? (
                      <Checkbox
                        checked={selectedValues.includes(option)}
                        onCheckedChange={() => handleSelect(option)}
                        className="mr-2"
                      />
                    ) : (
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(option) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                    {option}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectField;

import { Button } from "@/components/ui/button"
