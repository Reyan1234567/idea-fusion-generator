"use client";
import { SearchIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );
  const handleSearch = () => {
    const current = new URLSearchParams(searchParams.toString());
    current.set("search", searchValue);
    router.replace("?" + current.toString());
  };
  const handleClose = () => {
    setSearchValue("");
    const current = new URLSearchParams(searchParams.toString());
    if (searchParams.has("search")) {
      current.delete("search");
      router.replace(`${pathName}?${current}`);
    }
  };
  return (
    <div className="flex w-full items-center gap-2">
      <Input
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button variant="outline" onClick={handleSearch} disabled={!searchValue}>
        <SearchIcon />
      </Button>
      <Button onClick={handleClose} disabled={!searchParams.has('search')}>
        <X />
      </Button>
    </div>
  );
};

export default Search;
