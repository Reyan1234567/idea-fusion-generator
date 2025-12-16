import { ModeToggle } from "@/components/ModeToggle";
import Prompt from "@/components/Prompt";

const page = () => {
  return (
    <div className="">
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
      <Prompt isNew={true} />
    </div>
  );
};

export default page;
