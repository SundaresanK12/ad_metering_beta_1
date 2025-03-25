
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  allowCustomOption?: boolean;
  useCheckboxes?: boolean;
  defaultOption?: string;
  hierarchical?: boolean;
}

const MultiSelectField: React.FC<MultiSelectProps> = ({
  options = [], // Ensure options is always an array
  selectedValues = [], // Ensure selectedValues is always an array
  onChange,
  placeholder,
  allowCustomOption = false,
  useCheckboxes = false,
  defaultOption = "",
  hierarchical = false,
}) => {
  const [open, setOpen] = useState(false);
  const [customOption, setCustomOption] = useState('');
  
  // Ensure values is always an array, never undefined
  const values = Array.isArray(selectedValues) ? selectedValues : [];

  // Initialize with default option if provided and no values exist
  useEffect(() => {
    if (defaultOption && values.length === 0) {
      onChange([defaultOption]);
    }
  }, [defaultOption, onChange, values.length]);

  const handleSelect = (value: string) => {
    const selected = values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];
    onChange(selected);
  };

  const handleRemove = (value: string) => {
    onChange(values.filter((item) => item !== value));
  };

  const addCustomOption = () => {
    if (customOption && !values.includes(customOption)) {
      const newValues = [...values, customOption];
      onChange(newValues);
      setCustomOption('');
    }
  };

  // Get indentation level for hierarchical options
  const getIndentation = (option: string) => {
    if (!hierarchical) return 0;
    return (option.match(/ - /g) || []).length;
  };

  // Format display name for hierarchical options
  const getDisplayName = (option: string) => {
    if (!hierarchical) return option;
    const parts = option.split(' - ');
    return parts[parts.length - 1];
  };

  // Close popover when clicking outside
  useEffect(() => {
    if (!open) {
      setCustomOption('');
    }
  }, [open]);

  // Make sure we always have valid options to display
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10"
        >
          <div className="flex flex-wrap gap-1 py-1">
            {values.length > 0 ? (
              values.map((value) => (
                <Badge key={value} className="mr-1 mb-1">
                  {hierarchical ? getDisplayName(value) : value}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(value);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              {useCheckboxes ? (
                // Checkbox version
                <div className="p-2 space-y-2">
                  {safeOptions.map((option) => (
                    <div 
                      key={option} 
                      className="flex items-center space-x-2"
                      style={{ 
                        paddingLeft: hierarchical ? `${getIndentation(option) * 12}px` : '0'
                      }}
                    >
                      <Checkbox 
                        id={`option-${option}`}
                        checked={values.includes(option)}
                        onCheckedChange={() => handleSelect(option)}
                      />
                      <label 
                        htmlFor={`option-${option}`}
                        className="text-sm cursor-pointer flex-1"
                        onClick={() => handleSelect(option)}
                      >
                        {hierarchical ? getDisplayName(option) : option}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                // Regular CommandItem version
                safeOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                    className={hierarchical ? `pl-${getIndentation(option) * 4 + 2}` : ''}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        values.includes(option) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {hierarchical ? getDisplayName(option) : option}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
          
          {allowCustomOption && (
            <div className="border-t p-2 flex gap-2">
              <Input
                placeholder="Add custom option..."
                value={customOption}
                onChange={(e) => setCustomOption(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomOption();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addCustomOption}
                disabled={!customOption}
              >
                Add
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectField;
