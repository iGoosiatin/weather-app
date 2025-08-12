import { useState, type FC } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { debounce } from 'es-toolkit';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRecentSearch } from '@/hooks/useRecentSearch';
import { useLocationSearch } from '@/hooks/useLocationSearch';

type Props = {
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
};

export const LocationSearch: FC<Props> = ({ selectedLocation, onLocationSelect }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { recentSearches, addToRecentSearch } = useRecentSearch();
  const { data: locations, status, refetch } = useLocationSearch(inputValue);

  const debouncedRefetch = debounce(refetch, 200);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedLocation ? selectedLocation : 'Select location...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search location..."
            className="h-9"
            value={inputValue}
            onValueChange={(value) => {
              setInputValue(value);
              if (value?.length > 1) {
                debouncedRefetch();
              }
            }}
          />
          <CommandList>
            {status === 'success' && <CommandEmpty>No such location found...</CommandEmpty>}
            {!locations && !!recentSearches.length && (
              <CommandGroup heading="Recent searches">
                {recentSearches.map((location) => (
                  <CommandItem
                    key={location}
                    value={location}
                    onSelect={(currentLocation) => {
                      if (currentLocation !== selectedLocation) {
                        onLocationSelect(currentLocation);
                        setOpen(false);
                        setInputValue('');
                      }
                    }}
                  >
                    {location}
                    <Check
                      className={cn(
                        'ml-auto',
                        location === selectedLocation ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {!!locations?.length && (
              <CommandGroup>
                {locations?.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.name}
                    onSelect={(currentLocation) => {
                      if (currentLocation !== selectedLocation) {
                        setInputValue('');
                        addToRecentSearch(currentLocation);
                        onLocationSelect(currentLocation);
                        setOpen(false);
                      }
                    }}
                  >
                    {location.name}
                    <Check
                      className={cn(
                        'ml-auto',
                        location.name === selectedLocation ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
