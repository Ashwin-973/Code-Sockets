"use client";
//from ace
import { StickyScroll } from "../ui/sticky-scroll-reveal";


const content = [
  {
    title: "AI Answers Feel So One-Dimensional",
    description:
      "Okay, let’s be real—AI tools these days can spit out a coding solution in, like, 60 seconds. It’s awesome… until you realize you’re just copying one answer, nodding at it, and moving on. Where’s the depth? You’re missing out on different ways to tackle the problem, especially from people you actually vibe with in a tight community.",
    content: (
      <div
        className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "CodeBuddy Requests - A Free Spot to Swap Ideas",
    description:
      "That’s where Code-Sockets comes in! With CodeBuddy Requests, you post your coding question and get answers from a real community of coders—folks who get the struggle. It’s all free, and you’re not just getting one solution; you’re seeing different angles from people you can actually connect with. Think of it as a group chat where everyone’s hyped to help you grow.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo" />
      </div>
    ),
  },
  {
    title: "Debugging Alone Is the Worst",
    description:
      "Ever been stuck on a bug for hours, just you and your screen, ready to chuck your laptop out the window? You’re digging through error messages, trying random fixes, and getting nowhere. There’s no one to point you in the right direction—it’s lonely and straight-up frustrating.",
    content: (
      <div
        className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Shadow Debugging – Like a Free Coding Buddy Watching Your Back",
    description:
      "Imagine this: you’re on Code-Sockets, and with Shadow Debugging, it’s like having a coding buddy quietly watching your screen, dropping tips and fixes as you go—no pressure, no awkward video calls. It’s a free feature in our community, giving you that extra set of eyes to help you squash bugs faster. It’s like having a wingman who’s got your back while you code!",
    content: (
      <div
        className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Running out of content
      </div>
    ),
  },
];
export function ProblemSolutionSection() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
