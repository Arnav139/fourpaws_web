"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function SearchBar({
  className,
  placeholder,
}: {
  className?: string;
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleClear = () => {
    setSearchTerm("");
    handleSearch("");
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, pathname, replace, searchParams]);

  return (
    <div className={cn("relative flex flex-1 flex-shrink-0", className)}>
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        className="peer px-10"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary/60 peer-focus:text-primary" />
      <Button
        onClick={handleClear}
        variant="outline"
        className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary/60 peer-focus:text-primary"
      >
        <XIcon className="text-destructive" />
      </Button>
    </div>
  );
}
