import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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
  const pages = Array.from({ length: iteration }, (_, i) => i);
  return (
    <Pagination>
      <PaginationContent className="w-full flex justify-between">
        <div></div>
        <PaginationItem className="flex gap-2">
          <Button
            variant={"outline"}
            disabled={page === 1}
            onClick={() => router.push(`?page=${Math.max(page - 1, 1)}`)}
          >
            <ArrowLeft /> Prev
          </Button>
          {pages.map((_, i) => (
            <div key={i}>
              <Button
                variant={i + 1 !== page ? "outline" : "default"}
                onClick={() => {
                  router.push(`?page=${i + 1}`);
                }}
              >
                {i + 1}
              </Button>
            </div>
          ))}
          <Button
            variant={"outline"}
            onClick={() =>
              router.push(`?page=${Math.min(page + 1, iteration)}`)
            }
            disabled={page === iteration}
          >
            Next
            <ArrowRight />
          </Button>
        </PaginationItem>
        <div className="">
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Page Length" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Page length</SelectLabel>
                <SelectItem value="apple">5</SelectItem>
                <SelectItem value="banana">10</SelectItem>
                <SelectItem value="blueberry">15</SelectItem>
                <SelectItem value="grapes">20</SelectItem>
                <SelectItem value="pineapple">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
