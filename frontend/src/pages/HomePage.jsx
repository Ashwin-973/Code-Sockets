// import { useState } from "react";
import {Routes,Route} from "react-router-dom"


function Router(){
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/code-help" element={<CodeHelp/>}/>
    </Routes>
  )
}

 function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col  gap-20">
      {/* Navbar */}
      <div className="mx-90 my-10">
        <div>
            <nav className="w-full flex justify-between items-center p-4 border-3 border-green-900 rounded-2xl">
                <div className="flex items-center border-2 border-green-900 rounded-full px-3 py-1">
                    <span className="text-lg font-medium">Logo</span>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-3 font-medium bg-yellow-400 rounded-lg">Login</button>
                    <button className="px-4 py-3 font-medium bg-yellow-400 rounded-lg">Signup</button>
                </div>
            </nav>
         </div>
      </div>

      {/* Hero Section */}
      <section className="text-center mx-64 my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black font-serif">
          You Cannot Get Different Perspective Using AI As You Do With
          Experienced Pros Around You
        </h1>
      </section>

      {/* Action Buttons */}
      <div className="m-8 flex flex-col justify-center items-center md:flex-row gap-4">
        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105">
          Connect with Like Peers
        </button>
        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105">
          Code Help
        </button>
      </div>
    </div>
  );
}
function CodeHelp(){
  return <h1 className="mx-72 my-80 text-lime-600 font-mono text-3xl">Struggling with an incomplete code?</h1>
}



export default Router