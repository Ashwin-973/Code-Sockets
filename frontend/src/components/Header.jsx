//rename this as main
import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBellFilled,
} from "@tabler/icons-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { AnonymousToggle } from "./AnonymousToggle";
import { GradientText } from "./ui/gradient-text";

export function Header() {
  const links = [
    {
      title: "Anonymous Mode",
      icon: (
        <AnonymousToggle/>
      ),
      href: "#",
    },

    {
      title: "Notifications",
      icon: (
        <IconBellFilled className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Info",
      icon: (
        <ProfileDropdown/>
      ),
      href: "#",
    },
  ];
  return (
            <div className="flex justify-between items-center my-4">
              <div className="flex items-center gap-4">
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false} className="custom-class">Name</GradientText>
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false} className="custom-class">Current Page</GradientText>
              </div>
              <div className="flex items-center justify-center ">
              <FloatingDock
              // only for demo, remove for production
              mobileClassName="translate-y-20"
                items={links} />
              </div>
            </div>
  );
}
