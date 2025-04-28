'use client'
import { useRef, useState } from "react"

const FaqsCard = ({ faqsList, idx }) => {
    const answerElRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [answerHeight, setAnswerHeight] = useState('0px')

    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current?.childNodes[0]?.scrollHeight || 0
        setIsOpen(!isOpen)
        setAnswerHeight(isOpen ? '0px' : `${answerElH + 20}px`)
    }

    return (
        <div 
            className="space-y-3 mt-5 overflow-hidden border-b"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
                {faqsList.q}
                {
                    isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef}
                className="duration-300"
                style={{ height: answerHeight }}
            >
                <div>
                    <p className="text-gray-500">
                        {faqsList.a}
                    </p>
                </div>
            </div>
        </div>
    )
}

function FAQSection () {
    const faqsList = [
        {
            q: "Why should I bother joining when I can just Google stuff?",
            a: "Sure, Google’s got answers, but here you get real people who get your struggle—free help from a community that vibes with you, not just cold search results"
        },
        {
            q: "What if I’m new and suck at coding—will I fit in?",
            a: "No worries, mate! We’re all learning—newbies and pros alike. Our free platform’s built for everyone, and you’ll grow with folks who’ve been there."
        },
        {
            q: "I’m already in a ton of coding groups—why join another?",
            a: "Fair, but those groups can be chaotic. Code-Sockets is your chill MVP spot—free, focused, and packed with coders who actually care about your growth."
        },
        {
            q: "What if I don't wanna use my real name?",
            a: "Totally cool! Use Anonymous Mode, pick a fun alias, and code without pressure—our free community’s all about comfort."
        },
        {
            q: "Why trust this over big coding platforms",
            a: "Big platforms are crowded and impersonal. Code-Sockets is your tight-knit crew—free, human, and focused on your growth, not just profit."
        }
    ];
    
  
    return (
        <section className="leading-relaxed max-w-screen-xl my-12 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-neutral-900 font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto text-lg">
                    Answered most of the frequently asked questions, Still confused? feel free to contact me.
                </p>
            </div>
            <div className="mt-14 max-w-5xl mx-auto">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            key={idx}
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    )
}
export {FAQSection};