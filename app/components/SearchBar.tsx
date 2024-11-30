import { useState, useCallback, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

export default function SearchBar({
                                    onSearch,
                                    placeholder = 'Search...',
                                    debounceTime = 500
                                  }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, debounceTime);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>('');

  useEffect(() => {
    if (onSearch && debouncedSearchTerm.trim() && debouncedSearchTerm != lastSearchTerm) {
      onSearch(debouncedSearchTerm);
      setLastSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch, lastSearchTerm]);

  return (
    <div className={`w-full`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startContent={<Search className="text-gray-400" />}
        classNames={{
          input: 'text-gray-700',
          inputWrapper: 'border-1 border-gray-300 hover:border-primary-500 focus-within:border-primary-500'
        }}
        endContent={
          searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                if (onSearch) onSearch('');
                setLastSearchTerm('');
              }}
              className="text-gray-500 hover:text-primary-500 transition-colors"
            >
              ✕
            </button>
          )
        }
      />
    </div>
  );
};