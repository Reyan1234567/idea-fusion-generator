"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Close } from "@radix-ui/react-dialog";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );
  const handleSearch = () => {
    console.log("SEARCH");
    console.log(searchValue);
    const current = new URLSearchParams(searchParams.toString());
    console.log(current.toString());
    current.set("search", searchValue);
    console.log(current.toString());
    router.replace("?"+current.toString());
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
    </div>
  );
};

export default Search;
