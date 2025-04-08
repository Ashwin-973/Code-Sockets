


function NavBar(){
    return(
        <div>
        <nav className="grid grid-rows-[1fr] grid-cols-custom gap-2.5 sticky z-25 inset-bs-0 max-inline-290 ms-auto me-auto
        ps-10 pe-10 pb-start-5 font-Jakarta">
            <div className="flex justify-center items-center p-1.25 block-size-46 border-1 border-solid border-grey shadow-own w-53 ps-3.25 pe-3.25 rounded-xl">
                <a className="flex items-center w-full gap-x-2.5 text-inherit cursor-pointer">
                    <picture className="block">
                        <img src="https://clickup.com/assets/brand/logo-v3-clickup-light.svg" alt="clickup" loading="eager" decoding="async" className="block min-w-21 max-w-full "/>
                    </picture>
                    <span className="font-medium text-2xs leading-[1.2] ps-2.25 border-s border-solid border-grey">The everything app, for work.</span>
                </a>
            </div>
            <div className="flex justify-center items-center p-1.25 block-size-46 border-1 border-solid border-grey shadow-own ps-3.25 pe-3.25 rounded-xl">
              <span className="block font-bold">Ask & Help</span>
            </div>
            <div className="flex justify-between items-center p-1.25 gap-x-2.5 block-size-46 border-1 border-solid border-grey shadow-own  ps-2.25 pe-2.25 rounded-xl">
                <a className="flex items-center justify-center cursor-pointer">
                    <span className="block font-medium p-2 rounded-md hover:bg-gray-100">FAQ</span>
                </a>
                <a className="flex items-center justify-center cursor-pointer">
                    <button className="bg-blue-400 ps-1.5 pe-1.5 block-size-conatiner border-1 border-solid border-indigo-800 rounded-md">
                        <span className="block font-medium">Sign out</span>
                    </button>
                </a>
            </div>
        </nav>
        </div>
    )
}



export {NavBar}