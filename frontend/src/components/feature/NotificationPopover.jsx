import { useState,useEffect } from "react"
import { BellIcon } from "lucide-react"
import {
  IconBellFilled,
} from "@tabler/icons-react";
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { formatDistanceToNow } from 'date-fns';
import { useNotifications } from "../../hooks/useNotifications";
import { updateNotification } from "../../services/notificationService"



const initialNotifications = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/b7/ec/9e/b7ec9e12d321ae77d631635632e75a48.jpg",
    user: "Kim Wexler",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/3a/61/bc/3a61bc7428d8947242e803a01f4cd8cb.jpg",
    user: "Travis Bickle",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    read: false,
  },
  {
    id: 3,
    image: "https://i.pinimg.com/474x/85/db/9e/85db9e373e772297a39e0c40b7fd04f3.jpg",
    user: "Henry Hill",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    read: true,
  },
  {
    id: 4,
    image: "/avatar-80-04.jpg",
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    read: true,
  },
  {
    id: 5,
    image: "/avatar-80-05.jpg",
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: 6,
    image: "/avatar-80-06.jpg",
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    read: true,
  },
]

function Dot({
  className
}) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true">
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export function NotificationPopover({userId}) {
  const notificationSnapshot=useNotifications(userId)
  const [notifications, setNotifications] = useState(notificationSnapshot)  //should I get this from context? , does it create a overhead for this component..handling all the logic here
  //notification snapshot is returned async  
  //listen to offline data if possible
  useEffect(() => {
    setNotifications(notificationSnapshot);
  }, [notificationSnapshot]);

  function formatRelativeTime(date) {
    return formatDistanceToNow(date, { addSuffix: true }); // e.g., "less than a minute ago","15 minutes ago" etc
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({
      ...notification,
      read: true,
    })))
  }

  const handleNotificationClick = async (id) => {
    setNotifications(notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true}
        : notification)) //handle read:true logic for firebase here
    try{
      await updateNotification(id)
    }
    catch(err){
      console.log("Update Notification failed")
    }
    
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative"
          aria-label="Open notifications">
          <IconBellFilled size={16} aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {/*change to onHover */}
          {unreadCount > 0 && (
            <button
              className="text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"></div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors">
            <div className="relative flex items-start gap-3 pe-3">
              <img
                className="size-9 rounded-md"
                src={notification.meta.profile ||"https://i.pinimg.com/736x/b7/ec/9e/b7ec9e12d321ae77d631635632e75a48.jpg"}
                width={32}
                height={32}
                alt={notification.type==='solution_submitted'?
                  notification.meta.helperName : notification.meta.opName
                } />
              <div className="flex-1 space-y-1">
                <button
                  className="text-foreground/80 text-left after:absolute after:inset-0"
                  onClick={() => handleNotificationClick(notification.id)}>
                  <span className="text-foreground font-medium hover:underline">
                  {notification.type==='solution_submitted'?
                    notification.meta.helperName : notification.meta.opName
                  }
                  </span>{" "}
                  {notification.type==='solution_submitted'?
                  "Helped you !!" : "accepted your solution"
                    }{" "}
                  <span className="text-foreground font-medium hover:underline">
                    {/* {notification.target} */}
                    {/* maybe have the request id here , or clicking here takes you to the post */}
                    {/*notification.type==='solution_submitted'?
                      "for your request" : "for his request"
                    */}
                  </span>
                  .
                </button>
                <div className="text-muted-foreground text-xs">
                  {formatRelativeTime(notification.createdAt.toDate())}
                </div>
              </div>
              {!notification.read && (
                <div className="absolute end-0 self-center">
                  <Dot />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
