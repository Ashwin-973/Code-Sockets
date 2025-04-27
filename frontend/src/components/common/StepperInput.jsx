"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function StepperInput({header}) {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <div className="h-[20rem] flex flex-col justify-center  items-center px-4">
      <h5
        className="mb-10 sm:mb-20 text-xl text-center sm:text-2xl dark:text-white text-black">
        {header}
      </h5>
      <PlaceholdersAndVanishInput  onChange={handleChange} onSubmit={onSubmit} />
    </div>
  );
}
