import { useState, useEffect } from "react";
import { useModal } from "../../context/modelContext";
import { useRequestContext } from "../../context/requestContext"
import { useUserContext } from "../../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { CodeBlock } from "../ui/code-block"
import CodeEditor from "./CodeEditor";
import { Button } from "../ui/button";
import { Textarea} from "@heroui/react";
//set solution mode to false when user wants to update
export function CarouselCode() {
  const {
      selectedRequest,
      solutions, 
      pullSolution,
      currentSlideIndex, 
      setCurrentSlideIndex,
      isEditMode,
      toggleEditMode,
      isSolutionMode,
      toggleSolutionMode
} =useRequestContext()
const {currentUser}=useUserContext()
  const {closeModal,setFooterButtons,setFooterUtils,modalType} =useModal()
  const [api, setApi] = useState(null); //acts as a bridge bw embla's internal state and react's compo state. Let's the component know...which slide the user is currently on
  const [explanation, setExplanation] = useState("");
  const [allSlides, setAllSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(null);


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
useEffect(() => {
  if (currentSlide?.isOriginal && selectedRequest.user_id === currentUser.id) {
    if (isEditMode) {
      setFooterUtils([
        // { label: "Cancel", onClick: closeModal, variant: "secondary" },
        { label: "View Original", onClick:toggleEditMode, variant: "secondary" ,disabled:false}
      ]);
    } else {
      setFooterButtons([
        { label: "Cancel", onClick: closeModal, variant: "secondary",disabled:false },
        { label: "Make Changes", onClick:toggleEditMode, variant: "primary",disabled:false }
      ]);
    }
  } else if (currentSlide?.isOriginal && selectedRequest.user_id !== currentUser.id && !currentSlide.helper_id) {
    setFooterButtons([
      { label: "Cancel", onClick: closeModal, variant: "secondary",disabled:false },
      { label: "Help Solve", onClick: toggleEditMode, variant: "primary",disabled:false }
    ]);
  } else if (!currentSlide?.isOriginal && selectedRequest.user_id === currentUser.id) {
    setFooterButtons([
      { label: "Cancel", onClick: closeModal, variant: "secondary",disabled:false },
      { 
        label: "Pull Solution", 
        onClick: () => handlePullSolution(currentSlide), 
        variant: "primary",
        disabled: !selectedRequest.is_open
      }
    ]);
  }
}, [currentSlide, isEditMode, selectedRequest]);



//changing the solution mode forever
useEffect(()=>
    {
      (selectedRequest&&  selectedRequest.user_id===currentUser.id)?toggleSolutionMode(false):toggleSolutionMode(true)

  },[selectedRequest])



  const handlePullSolution = async (slide) => {
    console.log("The helper's Slide : ",slide)
    console.log("The OP's Reqeuest : ",selectedRequest)
    try{
      await pullSolution(selectedRequest,slide)
      closeModal()
    }
    catch(err){
      console.log("Solution Pull Failed")
    }
  };

  if (allSlides.length === 0) {
    return <div className="p-4">Loading...</div>;
  }
  return (
    // <div className="flex flex-col gap-4">
    <div className=" min-w-[90%] max-w-[95%] min-h-[360px] max-h-[400px]">
    <Carousel opts={{loop:true,align:"start"}} setApi={setApi} className="max-w-full" > {/*again no constraint here ,redundant class here */}
      <CarouselContent  >
        {allSlides.map((slide, index) => (
          <CarouselItem key={index}   >
            <div className="p-1">
              <Card >
                <CardContent className="p-2" > {/*how did removing flex fixed the issue? */}
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
                            initialLanguage={slide.language}
                            onComplete={closeModal}
                            readOnly={false}
                            isSolutionMode={isSolutionMode}
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
                {/*{currentSlideIndex === index && slide.isOriginal && !isEditMode && (
                    <div className="p-4 flex justify-end">
                      {selectedRequest.user_id === currentUser.id?(
                        <Button onClick={toggleEditMode}>Make Changes</Button>
                      ):(<Button onClick={toggleEditMode}>Help Solve</Button>)}
                    </div>
                  )}
                  
                  {currentSlideIndex === index && slide.isOriginal && isEditMode && (
                    <div className="p-4 flex justify-between">
                      <Button variant="outline" onClick={toggleEditMode}>
                        View Original
                      </Button>
                      <Button >Submit Solution</Button>
                    </div>
                  )}
                  {currentSlideIndex === index && !slide.isOriginal && (
                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        {slide.explanation || "No explanation provided"}
                      </p>
                    </div>
                  )}
                  {!isSolutionMode?(
                    <div className="m-3 flex justify-end">
                    <Button onClick={()=>handlePullSolution(slide)} disabled={!selectedRequest.is_open}>Pull Solution</Button>
                    </div>
                  ):""}*/}
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
