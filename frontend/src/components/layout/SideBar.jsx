"use client";
import logo from "../../assets/code-sockets-high-resolution-logo.png"
import React, { useState } from "react";
import { useUserState } from "../../context/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconHome
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { Header } from "./Header";
import { Dexter } from "./Dexter";

export function TheSidebar() {
  const {currentUserData}=useUserState()
  const{isLoading,logout}=useAuth0()

  const links = [
    {
      label: "Code Requests",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Your Requests",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label:"Home",
      href:"/",
      icon:(
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      )

    },
    {
      label: "Logout",
      href:() => logout({ logoutParams: { returnTo: window.location.origin } }),
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full max-w-full flex-1 flex-col rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-full"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-84">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label:currentUserData?.name,
                href: "#",
                icon: (
                  <img
                    src={currentUserData?.profile}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dexter />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <img
        className="size-6" src={logo} alt="logo" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white">
        Code Sockets
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <img
        className="size-6" src={logo} alt="logo" />
    </a>
  );
};

// Dummy dashboard component with content
/*const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div
        className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex justify-between items-center my-4">
          <div className="flex items-center gap-4">
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false} className="custom-class">Name</GradientText>
            <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false} className="custom-class">Current Page</GradientText>
          </div>
          <Header/>
        </div>
      </div>
    </div>
  );
};*/
