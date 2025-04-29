//rename this as main
import { useUserState } from "../../context/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { FloatingDock } from "../ui/floating-dock";
import {
  IconBellFilled,
} from "@tabler/icons-react";
import { ProfileDropdown } from "../common/ProfileDropdown";
import { NotificationPopover } from "../feature/NotificationPopover";
import { AnonymousToggle } from "../feature/AnonymousToggle";
import { GradientText } from "../ui/gradient-text";

export function Header() {
  const {currentUserData,currentUser}=useUserState()
  const {isLoading,logout}=useAuth0()
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
        // <IconBellFilled className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        <NotificationPopover userId={currentUser.id}/>
      ),
      href: "#",
    },
    {
      title: "Info",
      icon: (
        <ProfileDropdown logout={logout}  profile={currentUserData?.profile} name={currentUserData?.name}/>
      ),
      href: "#",
    },
  ];
  return (
            <div className="flex justify-between items-center my-4">
              <div className="flex items-center gap-8">
                <GradientText colors={["#808080", "#FFD700", "#FFA500", "#FFD700", "#808080"]} animationSpeed={3} showBorder={false} className="custom-class">{currentUserData.name}</GradientText>
                <GradientText colors={["#808080", "#FFD700", "#FFA500", "#FFD700", "#808080"]} animationSpeed={3} showBorder={false} className="custom-class">Code Requests</GradientText>
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
