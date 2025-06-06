'use client';
// import Image from 'next/image';
import  { useState } from 'react';



const StarTestimonial = ({ testimonials, mode = 'light' }) => {
  const [showAll, setShowAll] = useState(false);
  const maxDisplayedTestimonials = 6;

  const handleLoadMore = () => {
    setShowAll(true);
  };

  
  return (
    <div className='max-w-7xl mx-auto mb-24'>
      <div className='flex flex-col items-center justify-center pt-5'>
        <div className='flex flex-col gap-5 mb-8'>
          <span className='text-center text-4xl text-neutral-900 font-medium'>Read what people are saying</span>
          <span className='text-center text-neutral-500'>Dummy feedback for Testimonials <br /> with a flavour of famous movies.</span>
        </div>
      </div>
      <div className='relative'>
        <div className={`flex justify-center items-center gap-5 flex-wrap shadow-black overflow-hidden ${showAll || testimonials.length <= maxDisplayedTestimonials ? '' : 'max-h-[720px]'} relative`}>
          {testimonials.slice(0, showAll || testimonials.length <= maxDisplayedTestimonials ? testimonials.length : maxDisplayedTestimonials).map((testimonial, index) => (
            <div
              key={index}
              className={`${mode === 'dark' ? 'bg-black' : 'bg-white'} border border-slate-400 w-80 h-auto rounded-2xl p-5 relative`}
            >
              <div className='flex items-center'>
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`w-7 h-7 ${mode === 'dark' ? 'text-yellow-300' : 'text-neutral-900'}`}
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                      clipRule='evenodd'
                    />
                  </svg>
                ))}
                {[...Array(Math.max(0, 5 - testimonial.rating))].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-7 h-7 text-slate-300'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                      clipRule='evenodd'
                    />
                  </svg>
                ))}
              </div>
              <div className='mt-5 mb-5'>
                <span className={`${mode === 'dark' ? 'text-slate-100' : 'text-neutral-700'}`}>
                  {testimonial.text}
                </span>
              </div>
              <hr />
              <div className='flex items-center mt-5'>
                <img
                  src={testimonial.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  alt='profile'
                  // width={50}
                  // height={50}
                  className='size-14  rounded-full'
                />
                <div className='flex flex-col pl-4'>
                  <span className={`${mode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {testimonial.name}
                  </span>
                  <span className={`text-sm ${mode === 'dark' ? 'text-slate-400' : 'text-neutral-500'}`}>
                    {testimonial.jobtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {testimonials.length > maxDisplayedTestimonials && !showAll && (
          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'>
            <button
              className='px-4 py-2 rounded-md button bg-amber-500 text-white text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center hover:bg-amber-300 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]'
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
        {!showAll && (
          <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent'></div>
        )}
      </div>
    </div>
  );
};

export {StarTestimonial};