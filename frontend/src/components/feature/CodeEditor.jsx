import { useRef, useState,useEffect } from "react";
import { useRequestContext } from "../../context/requestContext";
import { useModal } from "../../context/modelContext";
// import { skill_level } from "../../constants/skill";
// import { skillMode } from "../../constants/skill";
import { CODE_SNIPPETS } from "../../constants/editor"
import { LANGUAGES } from "../../constants/editor";
// import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { IconUrgent } from "@tabler/icons-react";  //urgent toggle , maybe change this as it's not customizable
import { Toggle } from "../ui/toggle";
// import { Textarea } from "@heroui/react"   //problem desc
import { TextArea } from "../common/TextArea";
import {Slider} from "../ui/slider" //swap this with eldora's slider later, it provides built-in step
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { SelectNew } from "../ui/select-new";
import { Avatar,AvatarImage,AvatarFallback } from "../ui/avatar"; //swap this with hero's avatar later as it offers group avatars && Hold this for now
import { useUserState } from "../../context/userContext";

/*const mapLanguage = (dbLanguage) => {
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
};*/

//if the current request details are got from selectedRequest then wts the use of getRequest endpoint?
const CodeEditor = ({ 
  onComplete, 
  initialCode = "", 
  // language: initialLanguage = "javascript", 
  initialLanguage="",
  readOnly = false, //convert this to isEditMode
  isSolutionMode = false  //why can't I just get it from useRequestContext
}) => {
  const editorRef = useRef();  //don't allow submit when slider is untouched
  const [value, setValue] = useState(initialCode || "");
  // const [selectedValue, setSelectedValue] = useState(null);
  const [language, setLanguage] = useState("javascript");  //change it to origin ui
  const [toggle,setToggle]=useState(false)
  // const [slider,setSlider]=useState([0]) //why should I specify an array here?  - change slider to eldora-ui
  const [description,setDescription]=useState("")
  const { setFooterButtons } = useModal();
  const { addRequest, isLoading ,selectedRequest,isEditMode,submitSolution,refurbishRequest,removeRequest} = useRequestContext();
  const {currentUserData,currentUser}=useUserState()
      //are these two effects redundant?
    // Use effect to update editor when selectedRequest changes              why does the two effects run like 12 times but not infinitely?
console.log(toggle)
  useEffect(() => {
      if (selectedRequest && !isSolutionMode) {  //wtf is the use of solution mode?
        // if(selectedRequest){
        if(selectedRequest.content){
          setValue(selectedRequest.content);
          if(isEditMode){
            setToggle(selectedRequest.urgent_toggle)
            // setSlider([skillMode[selectedRequest.skill_level_required]])  //cant' I do this better?
            setDescription(selectedRequest.problem_description)
          }

        }
        // const mappedLanguage = mapLanguage(selectedRequest.language);
        setLanguage(selectedRequest.language);

        
           // If content is empty but we have a language, set default snippet , wtf is the use of this
    /*if (!selectedRequest.content && mappedLanguage) {
      setValue(CODE_SNIPPETS[mappedLanguage] || "");
    }*/


      }
    }, [selectedRequest]);

     // Use effect to initialize with provided initial values , what does this actually do?
    useEffect(() => {
    if (initialCode) {
      setValue(initialCode);
    }
    if (initialLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialCode, initialLanguage]);


  //to set appropriate buttons for the editor
  useEffect(() => {
    if (selectedRequest && selectedRequest.user_id === currentUser.id) {
      // Update/Delete mode
      setFooterButtons([
        { label: "Cancel", onClick: onComplete, variant: "secondary",disabled:false },
        { label: "Update", onClick: handleUpdate, variant: "primary",disabled:false },
        { label: "Delete", onClick: handleDelete, variant: "secondary",disabled:false }
      ]);
    } else if (isSolutionMode) {
      // Solution submission mode
      setFooterButtons([
        { label: "Cancel", onClick: onComplete, variant: "secondary",disabled:false },
        { label: "Submit Solution", onClick: handleSubmit(), variant: "primary",disabled:false }
      ]);
    } else if (!isSolutionMode && !selectedRequest) {
      // New request mode
      setFooterButtons([
        { label: "Cancel", onClick: onComplete, variant: "secondary",disabled:false},
        { label: "Add Request", onClick: handleSubmit(), variant: "primary",disabled:false }
      ]);
    }
  }, [
    selectedRequest, 
    isSolutionMode, 
    value,           
    language, 
    toggle, 
    // slider, 
    description,
    currentUser.id,
  ]);
//inclding set footer caused infinite re-render, why?

// Add this effect to update code snippets when language changes
useEffect(() => {
  // Only update the code snippet if we're not editing an existing request
  if (!selectedRequest && language) {
    setValue(CODE_SNIPPETS[language] || "");
  }
}, [language, selectedRequest]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  /*function handleSelect(language){
    
    /*Only set the code snippet if we're not editing an existing request , I do not understand how this solved the problem...
    whenever a change happens in the select component (i.e through the setLanguage , it calls the handleSelect of the onValueChange which sets language with default code snipper) , shouldn't theb previous approach 
    caused an infinite re-render??
    setLanguage(language);
    if (!selectedRequest) {
      setValue(CODE_SNIPPETS[language] || "");
    }

  }*/


  function handleToggle(){
    console.log(toggle)
    setToggle(!toggle)
  }
  /*function handleSlider(slider){
    setSlider(slider)
  }*/
  function handleDescription(desc){
    setDescription(desc)
  }

const handleUpdate=async()=>
{
  if(!isSolutionMode && selectedRequest){                 //why should I have the selectedRequest
    const updatedData = {
      user_id: selectedRequest.user_id, // From user context   , should I use selectedRequest or currentUser , which is good practice
      // skill_level_required: skill_level[slider[0]],
      content: value,
      language: language,
      urgent_toggle: toggle,
      problem_description: description,
      is_open: selectedRequest.is_open,
      status: selectedRequest.status
    };
    
    try {
      await refurbishRequest(selectedRequest.id, updatedData);
      onComplete && onComplete();
    } catch (error) {
      console.log('Request update failed');
    }
  }


}


const handleDelete=async()=>{
  try{
    console.log(selectedRequest.id)
    await removeRequest(selectedRequest.id)
    onComplete && onComplete();
  }
  catch(err)
  {
    console.log("Delete functionality failed")
  }
}
const handleSubmit = () => {
  return async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (isSolutionMode && selectedRequest) {
      // Solution submission logic...
      const solutionData = {
        request_id: selectedRequest.id,
        helper_id: currentUser.id,
        solution: value,
        explanation: description,
        solution_accepted: false,
      };
      
      try {
        await submitSolution(selectedRequest, solutionData);
        onComplete && onComplete();
        return;
      } catch (error) {
        console.log('Solution submission failed');
      }
    }

    const requestData = {
      user_id: currentUser.id,
      // skill_level_required: skill_level[slider[0]],
      content: value,
      language: language,
      urgent_toggle: toggle,
      problem_description: description,
      is_open: true,
      status: 'unsolved'
    };
    
    console.log("request data:", requestData);
    
    try {
      await addRequest(requestData);
      setValue("");
      onComplete && onComplete();
    } catch (error) {
      console.log('Code submission failed');
    }
  };
};

  return (
    <div className="flex flex-col gap-3">    {/*grow-shrink with size of container */}
    <div className="min-w-[600px] max-w-full flex justify-center items-center  gap-3">
      <form className="w-full" >  {/*onSubmit handler removed*/}
          {/* <Box w="100%"> */}
            {!isSolutionMode && !readOnly && ( 
            <div className="mb-4 max-w-full flex items-center justify-around">
              <div className="flex items-center gap-4">
                <Avatar>                                                     {/*modal header turns into this when it's a code-editor*/}
                  <AvatarImage src={currentUserData?.profile} alt="profile" />
                  <AvatarFallback>WW</AvatarFallback>
                </Avatar>
                  {/*<Select onValueChange={handleSelect} value={language}> shadcn handles uncontrolled state mgmt to reflect the UI, without useState , have the slider in a dialog box
                    <SelectTrigger className="w-[200px]">
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
                  </Select>*/}
                  <SelectNew 
                    options={LANGUAGES}
                    value={language}
                    onChange={setLanguage}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Toggle onClick={handleToggle}>
                    <IconUrgent size={64}/>  {/*why won't size work? */}
                  </Toggle>
                  {/* <Slider onValueChange={handleSlider}  value={slider}  min={0} max={4} step={1}/> was this so hacky?? */}
                </div>
            </div>
              )}                                   {/*use handle validation prop  , maybe use save view state for editor*/}
            <Editor                 
              options={{
                minimap: {
                  enabled: false,
                },
                readOnly: readOnly,     
      
              }}
              height="50vh"
              // max-height="390px !important"
              width="920px"
              theme="vs-dark"
              language={language}
              defaultValue={initialCode || CODE_SNIPPETS[language]}
              // defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value) }
            />
          {/* </Box> */}
          {/*{selectedRequest &&  selectedRequest.user_id===currentUser.id?(
            <div className="m-3 flex justify-around items-center">
              <button
              type="button"
              className="px-4 py-2 mx-6 bg-blue-600 text-white rounded"
              disabled={isLoading}
              onClick={handleUpdate}
              >
                {isLoading?'Saving...':'Update Request'}
              </button>
              <button
              type="button"
              className="px-4 py-2 mx-6 bg-blue-600 text-white rounded"
              disabled={isLoading}
              onClick={handleDelete}
              >
                {isLoading?'Deleting...':'Delete Request'}
              </button>
            </div>
          ):(
          <div className="m-3 flex justify-start items-center">
            <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 mx-6 bg-blue-600 text-white rounded"
            disabled={isLoading || readOnly}
            >
              {isLoading ? 'Saving...' : isSolutionMode ? 'Submit Solution' : 'Add Request'} 
            </button>
          </div>
          )}*/}
      </form>
    </div> {/*maybe have the description in pop-up too */}
    {(isSolutionMode || !readOnly) && (             
        <TextArea 
          onChange={handleDescription} 
          value={description} 
          label={isSolutionMode ? "Solution Explanation" : "Problem Description"} 
          placeholder={isSolutionMode ? "Explain your solution..." : "Enter your description"} 
        />
      )}
    </div>
  );
};


export default CodeEditor;
