//from serenity
import React from 'react'
import {StarTestimonial} from '../ui/star-rating-testimonial'


const testimonials = [
  {
    image: 'https://i.pinimg.com/736x/3a/61/bc/3a61bc7428d8947242e803a01f4cd8cb.jpg',
    text: `You Talkin' To Me?`,
    name: 'Travis Bickle',
    jobtitle: 'Taxi Driver',
    rating: 2
  },
  {
    image: 'https://i.pinimg.com/474x/57/8e/d0/578ed02b26049bae6860b266fd193fcd.jpg',
    text: `What's the most you ever lost on a coin toss? ....The most. You ever lost. On a coin toss`,
    name: 'Anton Chigurh',
    jobtitle: 'Maniac',
    rating: 2
  },
  {
    image: 'https://i.pinimg.com/474x/17/5f/8e/175f8efaa0384e1afd5646c537bab369.jpg',
    text: ` like these calm little moments before the storm. It reminds me of Beethoven. Can you hear it? It's like when you put your head to the grass and you can hear the growin' and you can hear the insects. Do you like Beethoven?`,
    name: 'Norman Stensfield',
    jobtitle: 'The unpredictable cop',
    rating: 5
  },
  {
    image: 'https://i.pinimg.com/736x/30/fd/35/30fd3549a78e93ae2fad65e81f7a0e0e.jpg',
    text: `Something horrible is happening inside of me and I don't know why. My nightly bloodlust has overflown into my days. I feel lethal, on the verge of frenzy. I think my mask of sanity is about to slip.`,
    name: 'Patrick Bateman',
    jobtitle: 'Some Kind of abstraction',
    rating: 5
  },
  {
    image: 'https://i.pinimg.com/736x/c6/b6/3e/c6b63e6b70691881c4e0c10b75f6939d.jpg',
    text: `I don't tip because society says I have to. All right, if someone deserves a tip, if they really put forth an effort, I'll give them something a little something extra. But this tipping automatically, it's for the birds. As far as I'm concerned, they're just doing their job`,
    name: 'Mr.Pink',
    jobtitle: 'Cynic',
    rating: 5
  },
  {
    image: 'https://i.pinimg.com/474x/14/f7/5e/14f75eecb71fd64c01e0b719ec7ee01d.jpg',
    text: `You got one part of that wrong....This is not meth.`,
    name: 'Walter White',
    jobtitle: 'The Cook',
    rating: 5
  },
  {
    image: 'https://i.pinimg.com/736x/9f/95/61/9f95618482812d906f564d281e1769c7.jpg',
    text: 'This Is Just Myself, Talking To Myself, About Myself.',
    name: 'Thomas Shelby',
    jobtitle: 'Blinder',
    rating: 4
  },
  {
    image: 'https://i.pinimg.com/474x/ca/0b/03/ca0b03d3098d3b92d2404895f6c34edb.jpg',
    text: `It's Not Personal, Sonny. It's Strictly Business.`,
    name: 'Michael Corleone',
    jobtitle: 'Godfather',
    rating: 5
  },
  
];


function Testimonials() {
  return (
    <div>
      <StarTestimonial mode='light' testimonials={testimonials}/>
    </div>
  )
}

export {Testimonials};
