// SearchInput.tsx
import { useDebounce } from "@/hooks/useDebounce";
import React, { useState, useCallback, useEffect } from "react";
import { Input } from "./input";
import { Search, X } from "lucide-react";

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

  // Memoize onSearch to prevent unnecessary effect triggers
  const stableOnSearch = useCallback(onSearch, [onSearch]);

  useEffect(() => {
    try {
      stableOnSearch(debouncedQuery);
    } catch (error) {
      console.error("Search callback error:", error);
    }
  }, [debouncedQuery, stableOnSearch]);

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
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        aria-label="Search"
        aria-describedby="search-help"
        className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-10 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        placeholder="Search..."
        {...props}
      />
      {showClearButton && hasQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
