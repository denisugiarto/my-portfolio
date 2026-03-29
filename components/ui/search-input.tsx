// SearchInput.tsx
import { useDebounce } from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "./input";

type SearchInputProps = {
  onSearch: (query: string) => void;
  delay?: number;
  initialValue?: string;
  showClearButton?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

const SearchInput = ({
  onSearch,
  delay = 300,
  initialValue = "",
  showClearButton = true,
  ...props
}: SearchInputProps) => {
  const [query, setQuery] = useState(initialValue);
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    try {
      onSearch(debouncedQuery);
    } catch (error) {
      console.error("Search callback error:", error);
    }
  }, [debouncedQuery, onSearch]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  const hasQuery = query.length > 0;

  return (
    <div className="relative w-full flex-grow md:max-w-sm" role="search">
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-foreground stroke-[3] md:left-4 md:h-5 md:w-5"
        aria-hidden="true"
      />
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        aria-label="Search"
        aria-describedby="search-help"
        className="h-12 w-full rounded-none border-[3px] border-foreground pl-10 pr-10 text-base font-black uppercase tracking-wider transition-none placeholder:font-bold placeholder:normal-case focus-visible:ring-0 md:h-14 md:border-4 md:pl-12 md:pr-12 md:text-lg"
        placeholder="Search..."
        {...props}
      />
      {showClearButton && hasQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center text-foreground transition-none hover:text-destructive md:right-4"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 stroke-[3] md:h-5 md:w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
