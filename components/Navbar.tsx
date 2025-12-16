import React from "react";

const Navbar = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-sm bg-transparent backdrop-blur-md flex justify-center items-center p-5 border-b-2 border-grey-500">
      <p>{text}</p>
    </div>
  );
};

export default Navbar;
