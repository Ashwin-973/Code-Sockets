import { useRef, useState,useEffect } from "react";
import { useRequestContext } from "../context/requestContext";
import { skill_level } from "../constants/skill";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../constants/editor"
import { IconUrgent } from "@tabler/icons-react";  //urgent toggle
import { Toggle } from "./ui/toggle";
import { Textarea } from "@heroui/react"   //problem desc
import {Slider} from "./ui/slider" //swap this with eldora's slider later, it provides built-in step
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"; //swap this with hero's avatar later as it offers group avatars && Hold this for now

const mapLanguage = (dbLanguage) => {
  // Create a mapping of possible DB values to your select values
  const languageMap = {
    'javascript': 'javascript',
    'js': 'javascript',
    'python': 'python',
    'py': 'python',
    'java': 'java',
    'typescript': 'typescript',
    'ts': 'typescript',
    'csharp': 'csharp',
    'c#': 'csharp',
    'php': 'php'
  };
  
  // Return the mapped value or default to javascript
  return languageMap[dbLanguage?.toLowerCase()];
};
const CodeEditor = ({ 
  onComplete, 
  initialCode = "", 
  language: initialLanguage = "javascript", 
  readOnly = false,
  isSolutionMode = true  //who sets the solution mode?
}) => {
  const editorRef = useRef();  //don't allow submit when slider is untouched
  const [value, setValue] = useState(initialCode || "");
  const [language, setLanguage] = useState("javascript");
  const [toggle,setToggle]=useState(false)
  const [slider,setSlider]=useState([0])
  const [description,setDescription]=useState("")
  const { addRequest, isLoading ,selectedRequest,submitSolution} = useRequestContext();
      //are these two effects redundant?
    // Use effect to update editor when selectedRequest changes              why does the two effects run like 12 times but not infinitely?
  useEffect(() => {
      if (selectedRequest && !isSolutionMode) {  //wtf is the use of solution mode?
        // if(selectedRequest){
        if(selectedRequest.content){
          setValue(selectedRequest.content);

        }
        const mappedLanguage = mapLanguage(selectedRequest.language);
        setLanguage(mappedLanguage);
           // If content is empty but we have a language, set default snippet , wtf is the use of this
    if (!selectedRequest.content && mappedLanguage) {
      setValue(CODE_SNIPPETS[mappedLanguage] || "");
    }
      }
    }, [selectedRequest]);

     // Use effect to initialize with provided initial values
  useEffect(() => {
    if (initialCode) {
      setValue(initialCode);
    }
    if (initialLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialCode, initialLanguage]);

  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  function handleSelect(language){
    
    /*Only set the code snippet if we're not editing an existing request , I do not understand how this solved the problem...
    whenever a change happens in the select component (i.e through the setLanguage , it calls the handleSelect of the onValueChange which sets language with default code snipper) , shouldn't theb previous approach 
    caused an infinite re-render??*/
    if (!selectedRequest) {
      setValue(CODE_SNIPPETS[language] || "");
      setLanguage(language);
    }
  }
  function handleToggle(){
    setToggle(!toggle)
  }
  function handleSlider(slider){
    setSlider(slider)
  }
  function handleDescription(desc){
    setDescription(desc)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit as a solution
    console.log("Help submission ",selectedRequest)
   if (isSolutionMode && selectedRequest) {
      const solutionData = {
        request_id: selectedRequest.id,
        helper_id: 'auth0|summerfinn', // This should come from auth context through user Context
        solution: value,
        explanation: description,
        solution_accepted: false,
      };
      
      try {
        await submitSolution(solutionData);
        onComplete && onComplete();
        return ///to avoid falling back to create request
      } catch (error) {
        console.log('Solution submission failed');
      }


    const requestData={
      user_id:'auth0|forrestgump', skill_level_required:skill_level[slider[0]], content:value, language:language, urgent_toggle:toggle, problem_description:description, is_open:true, status:'unsolved'
    }
    console.log("request data :",requestData)
    try {
      await addRequest(requestData);
      setValue("");   //clear the form data after submitting the form
      onComplete(); // Close modal after successful submission
    } catch (error) {
      // Error is already handled in context
      console.log('Code submission failed');
    }
  };
}
  
  return (
    <div className="max-w-full flex flex-col">
    <div className="flex justify-center items-center gap-3">
      <form className="grow-7" onSubmit={handleSubmit}>
          <Box w="100%">
            {!isSolutionMode && !readOnly && ( 
            <div className="mb-4 flex items-center justify-around">
            <Avatar>                                                     {/*modal header turns into this when it's a code-editor*/}
              <AvatarImage src="https://i.pinimg.com/736x/b3/a7/33/b3a733480dcc957f5359941e60f4ad7c.jpg" alt="Mr.White" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
              <Select onValueChange={handleSelect} value={language}> {/*shadcn handles uncontrolled state mgmt to reflect the UI, without useState */}
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pick a language</SelectLabel>
                      <SelectItem value="javascript">javascript</SelectItem>
                      <SelectItem value="python">python</SelectItem>
                      <SelectItem value="typescript">typescript</SelectItem>
                      <SelectItem value="java">java</SelectItem>
                      <SelectItem value="csharp">csharp</SelectItem>
                      <SelectItem value="php">php</SelectItem>
                  </SelectGroup>
              </SelectContent>
              </Select>
              <Toggle onClick={handleToggle}>
                <IconUrgent/>
              </Toggle>
              <Slider onValueChange={handleSlider}  value={slider}  min={0} max={4} step={1}/> {/*was this so hacky??*/}
            </div>
              )}                                   {/*use handle validation prop */}
            <Editor                 
              options={{
                minimap: {
                  enabled: false,
                },
                readOnly: readOnly,     
              }}
              height="30vh"
              theme="vs-dark"
              language={language}
              defaultValue={initialCode || CODE_SNIPPETS[language]}
              // defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value) }
            />
          </Box>
         <button
          type="submit"
          className="px-4 py-2 mx-6 bg-blue-600 text-white rounded"
          disabled={isLoading || readOnly}
        >
        {/*{isLoading ? 'Saving...' : isSolutionMode ? 'Submit Solution' 
          : selectedRequest ? 'Update Request' : 'Add Request'} */}
        {isLoading?'Saving...' : isSolutionMode ? 'Submit Solution':'Add Request'}
        </button>
      </form>
    </div>
    {(isSolutionMode || !readOnly) && (             
        <Textarea 
          onValueChange={handleDescription} 
          value={description} 
          className="w-60"    //large width has no effect..
          label={isSolutionMode ? "Solution Explanation" : "Description"} 
          placeholder={isSolutionMode ? "Explain your solution..." : "Enter your description"} 
        />
      )}
    </div>
  );
};


export default CodeEditor;
