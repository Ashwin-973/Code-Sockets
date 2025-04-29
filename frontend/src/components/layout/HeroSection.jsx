"use client";
//from ace
import { useAuth0 } from "@auth0/auth0-react";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { motion } from "motion/react";

export function HeroSection() {
  const {iLoading,loginWithRedirect} = useAuth0()
  return (
    // <BackgroundBeamsWithCollision>
    <div
      className="relative mx-auto my-32 max-w-full flex flex-col items-center justify-center">
      {/* <Navbar /> */}
      <div
        className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div
          className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-900 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Your Safe Space to Learn, Share, and Grow"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block">
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-500 dark:text-neutral-400">
          Struggling with code or feeling like you don't belong? Join a community that gets it—no judgment, just support.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">  {/*I guess it'd be better to place one button */}
          <button onClick={() => loginWithRedirect({
           appState: { returnTo: '/onboarding' }})} 
            className="w-60 transform rounded-lg bg-amber-500 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Start Coding Together
          </button>
          {/*<button
            className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>*/}
        </motion.div>
        {/*<motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
          <div
            className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000} />
          </div>
        </motion.div>*/}
      </div>
    </div>
    //  </BackgroundBeamsWithCollision> 
  );
}

/*const Navbar = () => {
  return (
    <nav
      className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div
          className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Aceternity UI</h1>
      </div>
      <button
        className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
    </nav>
  );
};
*/