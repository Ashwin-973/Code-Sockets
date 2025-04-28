import { HoverEffect } from "../ui/card-hover-effect";

export function BenefitsSection() {
  return (
    <div className="max-w-6xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Feel the Rush of Getting Real Help from Friends",
    description:
      "With CodeBuddy Requests, you toss your coding question into our free community, and folks you know jump in with answers. It’s a chill space to swap ideas and get that personal touch AI can’t deliver.",
    link: "#",
  },
  {
    title: "Banish That Bug Stress with a Silent Sidekick",
    description:
      "Jump into Shadow Debugging—our free feature where a pro coder shadows your screen, dropping hints in real-time. No pressure, just pure help to smash those bugs.",
    link: "#",
  },
  {
    title: "Unlock a Treasure Chest of Knowledge Anytime",
    description:
      "The Resource Time Capsule is your free vault of community-shared tips, tutorials, and hacks. It’s a living archive, built by us, for us, to level up together.",
    link: "",
  },
  {
    title: "Code with Confidence, No Judgment Here",
    description:
      "Anonymous Mode lets you post and collaborate without showing your face. Flip the switch, pick a fun alias, and dive into the community—no pressure, all support.",
    link: "#",
  },
  {
    title: "Let Go of Guilt with a Confession Wall",
    description:
      "The Error Ledger, or Confession Wall, is your free space to share coding blunders. Post your mistakes, get advice, and see you’re not the only one tripping up—pure community vibes",
    link: "#",
  },
  {
    title: "Find Your Coding Crew That Gets You",
    description:
      "Interest-Based Matching pairs you with coders at your skill level for CodeBuddy Requests or chats. It’s a free way to match with your perfect coding pals in our community",
    link: "#",
  },
];
