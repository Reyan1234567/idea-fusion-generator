"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PaginationDemo({
  length,
  perPage,
  page,
}: {
  length: number;
  perPage: number;
  page: number;
}) {
  const iteration = Math.ceil(length / perPage);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = Array.from({ length: iteration }, (_, i) => i);
  const handleRouting = (pageNumber?: string, pageLength?: string) => {
    const search = searchParams.get("search");
    if (search) {
      router.replace(
        `?page=${pageNumber ?? page}&length=${
          pageLength ?? perPage
        }&search=${search}`
      );
    } else {
      router.replace(
        `?page=${pageNumber ?? page}&length=${pageLength ?? perPage}`
      );
    }
  };
  const handleSelectChange = (value: string) => {
    const numValue = Number(value) || 10;
    handleRouting("1", numValue.toString());
  };
  return (
    <Pagination>
      <PaginationContent className="w-full flex justify-between">
        <div></div>
        <PaginationItem className="flex gap-2">
          <Button
            variant={"outline"}
            disabled={page === 1}
            onClick={() => handleRouting(Math.max(page - 1, 1).toString())}
          >
            <ArrowLeft /> Prev
          </Button>
          {pages.map((_, i) => (
            <div key={i}>
              <Button
                variant={i + 1 !== page ? "outline" : "default"}
                onClick={() => {
                  handleRouting((i + 1).toString());
                }}
              >
                {i + 1}
              </Button>
            </div>
          ))}
          <Button
            variant={"outline"}
            onClick={() =>
              handleRouting(Math.min(page + 1, iteration).toString())
            }
            disabled={page === iteration}
          >
            Next
            <ArrowRight />
          </Button>
        </PaginationItem>
        <div className="">
          <Select value={perPage.toString()} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Page Length" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Page length</SelectLabel>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
