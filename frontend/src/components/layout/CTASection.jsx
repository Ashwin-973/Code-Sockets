"use client";
//from shapex
//include features in the cards provided

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    // <section
    //   className=" py-12 bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 relative overflow-hidden">
    <section className="w-full py-12 bg-gradient-to-br relative overflow-hidden " 
    style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.75) 1px, transparent 0)`,
    }}>
      <div className="absolute inset-0 opacity-10">
        {/* <img
          src="https://www.shapexui.site/placeholder.svg"
          alt="Background pattern"
          layout="fill"
          objectFit="cover" /> */}
      </div>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl font-extrabold leading-tight text-neutral-700 sm:text-5xl lg:text-6xl ">
            Unlock the Power of{" "}
            <span className="text-amber-400">CodeSockets</span>
          </h2>
          <p className="max-w-xl mx-auto mt-6 text-center text-lg leading-relaxed text-neutral-500">
          Tap into a vibrant community to solve coding challenges together.
          Join fellow developers and start collaborating today.
          </p>
        </motion.div>
          {/*feature cards would come here */}
        {/*<div className="mt-12 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Customizable Styles",
              text: "Tailor every component to fit your brand",
            },
            { title: "Responsive Design", text: "Optimized for all devices" },
            { title: "Regular Updates", text: "Stay ahead with new features" },
            {
              title: "Detailed Documentation",
              text: "Comprehensive guides for easy setup",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-200">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </div>*/}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          action="#"
          method="POST"
          className="max-w-xl mx-auto mt-12">
          <div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/*<div className="relative w-full sm:w-auto">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-6 py-4 text-white bg-white bg-opacity-20 rounded-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-opacity-30 transition duration-300"
                required />
            </div>*/}
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto px-12 py-7 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-700 transition duration-300">
              Start Coding Together
            </Button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center mt-8">
          <Lock className="size-4 text-white" />
          <span className="ml-2 text-sm text-neutral-400">
            Your data is secure. We never share your information.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export {CTASection};
