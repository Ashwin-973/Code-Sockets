import { useState, useEffect } from "react";
import { useModal } from "../context/modelContext";
import { useRequestContext } from "../context/requestContext"
import { useUserContext } from "../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { CodeBlock } from "./ui/code-block"
import CodeEditor from "./CodeEditor";
import { Button } from "./ui/button";
import { Textarea} from "@heroui/react";

export function CarouselCode() {
  const {
      selectedRequest,
      solutions, 
      currentSlideIndex, 
      setCurrentSlideIndex,
      isEditMode,
      toggleEditMode} =useRequestContext()
  const {closeModal} =useModal()
  const [api, setApi] = useState(null); //acts as a bridge bw embla's internal state and react's compo state. Let's the component know...which slide the user is currently on
  const [explanation, setExplanation] = useState("");
  const [allSlides, setAllSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [initialized, setInitialized] = useState(false);

  /*useEffect(() => {
    if (open && api) {
      // Small delay to ensure the modal is fully rendered
      setTimeout(() => {
        api.reInit();
        setInitialized(true);
      }, 50);
    }
  }, [open, api]);*/


    // Prepare slides: solutions before request, request, solutions after
    useEffect(() => {
      if (selectedRequest) {
        // Create a combined array with the request in the middle
        const combinedSlides = [
          ...solutions.slice(0, Math.floor(solutions.length / 2)),
          { ...selectedRequest, isOriginal: true },
          ...solutions.slice(Math.floor(solutions.length / 2))
        ];
        setAllSlides(combinedSlides);
        setCurrentSlide(combinedSlides[currentSlideIndex]);
      }
    }, [selectedRequest, solutions, currentSlideIndex]);
    // Update current slide when API changes slides -> introduces body scroll bar

 // Update current slide when API changes slides
useEffect(() => {
  if (!api) return;
  
  const onSelect = () => {
    const currentIndex = api.selectedScrollSnap();
    setCurrentSlideIndex(currentIndex);
    setCurrentSlide(allSlides[currentIndex]);
  };
  
  api.on("select", onSelect);
  
  // Create a resize observer to handle dimension changes
  /*const resizeObserver = new ResizeObserver(() => {
    if (api) {
      api.reInit();
    }
  });
  
  // Find the carousel container
  const carouselContainer = document.querySelector('[data-slot="carousel-content"]');
  if (carouselContainer) {
    resizeObserver.observe(carouselContainer);
  }*/
  
  return () => {
    api.off("select", onSelect);
    // resizeObserver.disconnect();
  };
}, [api, allSlides,setCurrentSlideIndex]);

console.log(allSlides)


  const handleHelp = () => {
    toggleEditMode();
  };
  const handleSubmitSolution = async () => {
    // Implementation for submitting solution
  };


  if (allSlides.length === 0) {
    return <div className="p-4">Loading...</div>;
  }
  return (
    // <div className="flex flex-col gap-4">
    <div className="max-w-full">
    <Carousel opts={{loop:true,align:"start"}} setApi={setApi} className="max-w-full" > {/*again no constraint here ,redundant class here */}
      <CarouselContent  >
        {allSlides.map((slide, index) => (
          <CarouselItem key={index}   >
            <div className="p-1">
              <Card >
                <CardContent className="p-2 " > {/*how did removing flex fixed the issue? */}
                {currentSlideIndex === index && slide.isOriginal && isEditMode ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key="editor"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CodeEditor 
                            initialCode={slide.content} 
                            language={slide.language}
                            // onComplete={handleSubmitSolution}
                            onComplete={closeModal}
                            readOnly={false}
                          />
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key="codeblock"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CodeBlock 
                            language={slide.language || "jsx"}  //language is not set properly ; always falls back to jsx
                            filename={slide.isOriginal ? "Original Request" : `Solution ${index}`} 
                            code={slide.content || slide.solution || ""}
                          />
                        </motion.div>
                      </AnimatePresence>
                    )}
                </CardContent>
                {currentSlideIndex === index && slide.isOriginal && !isEditMode && (
                    <div className="p-4 flex justify-end">
                      <Button onClick={handleHelp}>Help Solve</Button>
                    </div>
                  )}
                  
                  {currentSlideIndex === index && slide.isOriginal && isEditMode && (
                    <div className="p-4 flex justify-between">
                      <Button variant="outline" onClick={toggleEditMode}>
                        View Original
                      </Button>
                      <Button onClick={handleSubmitSolution}>Submit Solution</Button>
                    </div>
                  )}
                  {currentSlideIndex === index && !slide.isOriginal && (
                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        {slide.explanation || "No explanation provided"}
                      </p>
                    </div>
                  )}
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    {/*{isEditMode && (             //appears in all slides
      <div className="mt-4">
        <Textarea
          label="Solution Explanation"
          placeholder="Explain your solution..."
          value={explanation}
          onValueChange={setExplanation}
        />
      </div>
    )} */}
    </div>
  )
}
