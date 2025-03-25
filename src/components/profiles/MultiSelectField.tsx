
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
  options = [], 
  selectedValues = [], 
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
    // Prevent event bubbling
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

  // For logging
  useEffect(() => {
    console.log("MultiSelect - Selected Values:", values);
  }, [values]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10 bg-white border border-purple-100 hover:border-purple-300 focus:ring-purple-500 shadow-sm rounded-lg"
        >
          <div className="flex flex-wrap gap-1 py-1">
            {values.length > 0 ? (
              values.map((value) => (
                <Badge key={value} className="mr-1 mb-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                  {hierarchical ? getDisplayName(value) : value}
                  <button
                    type="button"
                    className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-purple-500"
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
      <PopoverContent className="w-[300px] p-0 rounded-lg border border-purple-100 shadow-lg bg-white">
        <Command className="rounded-lg">
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="border-purple-100" />
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              {useCheckboxes ? (
                // Checkbox version
                <div className="p-2 space-y-2">
                  {safeOptions.map((option) => (
                    <div 
                      key={option} 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-50"
                      style={{ 
                        paddingLeft: hierarchical ? `${getIndentation(option) * 12 + 8}px` : '8px'
                      }}
                    >
                      <Checkbox 
                        id={`option-${option}`}
                        checked={values.includes(option)}
                        onCheckedChange={() => {
                          handleSelect(option);
                        }}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <label 
                        htmlFor={`option-${option}`}
                        className="text-sm cursor-pointer flex-1"
                        onClick={(e) => {
                          e.preventDefault(); 
                          handleSelect(option);
                        }}
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
                    className={cn(
                      "rounded-md hover:bg-purple-50",
                      hierarchical ? `pl-${getIndentation(option) * 4 + 2}` : ''
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-purple-600",
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
            <div className="border-t border-purple-100 p-2 flex gap-2">
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
                className="border-purple-100 focus-visible:ring-purple-400"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  addCustomOption();
                }}
                disabled={!customOption}
                className="border-purple-100 hover:bg-purple-50 hover:text-purple-700"
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
