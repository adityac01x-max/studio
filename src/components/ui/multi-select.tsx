'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const multiSelectVariants = cva(
    'm-1 transition-all duration-200 ease-in-out',
    {
        variants: {
            variant: {
                default: 'border-foreground text-foreground bg-secondary',
                secondary: 'border-secondary-foreground/80 text-secondary-foreground bg-secondary/80',
                destructive: 'border-destructive-foreground/80 text-destructive-foreground bg-destructive/80',
                inverted: 'border-inverted-foreground/80 text-inverted-foreground bg-inverted/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

interface MultiSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof multiSelectVariants> {
  placeholder: string;
  options: { label: string; value: string; }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  (
    {
      placeholder,
      options,
      selected,
      onChange,
      className,
      variant,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleSelect = (value: string) => {
        onChange([...selected, value]);
        setInputValue('');
    };

    const handleDeselect = (value: string) => {
        onChange(selected.filter((v) => v !== value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && inputValue === '') {
            handleDeselect(selected[selected.length - 1]);
        }
    };
    
    const filteredOptions = options.filter(option => 
        !selected.includes(option.value) && 
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex flex-wrap gap-1">
                {selected.map((value) => {
                    const label = options.find(o => o.value === value)?.label;
                    return (
                        <Badge key={value} variant="secondary">
                            {label}
                            <button
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleDeselect(value);
                                    }
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onClick={() => handleDeselect(value)}
                            >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            </button>
                        </Badge>
                    )
                })}
                 <CommandPrimitive.Input
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                />
            </div>
        </div>
         <div className="relative mt-2">
            {open && filteredOptions.length > 0 ? (
                 <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <CommandList>
                        <CommandGroup>
                            {filteredOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onSelect={() => handleSelect(option.value)}
                                    className="cursor-pointer"
                                >
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                 </div>
            ) : null}
         </div>
      </Command>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
