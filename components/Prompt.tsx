"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ArrowUpIcon } from "lucide-react";

const Prompt = () => {
  return (
    <InputGroup className="p-4 w-full rounded-xl">
      <InputGroupTextarea placeholder="Ask, Search or Chat..." />
      <InputGroupAddon align="block-end">
        <InputGroupText className="ml-auto">52% used</InputGroupText>
        <Separator className="!h-4" />
        <InputGroupButton
          variant="default"
          className="rounded-full"
          size="icon-xs"
          disabled
        >
          <ArrowUpIcon />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default Prompt;
