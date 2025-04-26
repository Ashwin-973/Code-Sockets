import { cn } from "../lib/utils";

export default function RootLayout({ children }) {  //why was html and body removed?
  return (
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >{children}</div>
  );
}