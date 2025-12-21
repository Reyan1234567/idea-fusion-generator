import Navbar from "@/components/Navbar";
import Prompt from "@/components/Prompt";

const page = () => {
  return (
    <div className="w-full h-full">
      <Navbar text={"Spit in your ideas"} />
      <Prompt isNew={true} />
    </div>
  );
};

export default page;
