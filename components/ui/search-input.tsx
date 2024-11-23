// SearchInput.tsx
import { useDebounce } from "@/hooks/useDebounce";
import React, { useState, useCallback, useEffect } from "react";
import { Input } from "./input";

type SearchInputProps = {
  onSearch: (query: string) => void;
  delay?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ onSearch, delay = 300, ...props }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [onSearch, debouncedQuery]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  return (
    <Input
      type="search"
      value={query}
      onChange={handleChange}
      aria-label="Search"
      {...props}
    />
  );
};

export default SearchInput;
