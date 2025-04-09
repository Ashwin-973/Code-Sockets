import { useRef, useState,useEffect } from "react";
import { useRequestContext } from "../context/requestContext";
import { skill_level } from "../constants/skill";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants/editor"
import { IconUrgent } from "@tabler/icons-react";  //urgent toggle
import { Toggle } from "./ui/toggle";
import { Textarea } from "./ui/textarea";   //problem desc
import {Slider} from "./ui/slider" //swap this with hero's slider later, it provides built-in step
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Avatar } from "./ui/avatar"; //swap this with hero's avatar later as it offers group avatars && Hold this for now


const CodeEditor = ({onComplete}) => {
  const editorRef = useRef();
  const sliderRef=useRef();  //don't allow submit when slider is untouched
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const { addRequest, isLoading ,selectedRequest} = useRequestContext();

    // Use effect to update editor when selectedRequest changes
    useEffect(() => {
      if (selectedRequest) {
        setValue(selectedRequest.content || "");
        setLanguage(selectedRequest.language || "javascript");
      }
    }, [selectedRequest]);
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData={
      user_id:'auth0|thecoinflip', skill_level_required:skill_level[sliderRef.current.value], content:value, language:'javascript', urgent_toggle:true, problem_description:'Do you see me?', is_open:true, status:'unsolved'
    }
    try {
      await addRequest(requestData);
      setValue("");   //clear the form data after submitting the form
      onComplete(); // Close modal after successful submission
    } catch (error) {
      // Error is already handled in context
      console.log('Form submission failed');
    }
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <form className="grow-7" onSubmit={handleSubmit}>
          <Box w="100%">
            <div className="mb-4 flex items-center justify-around">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pick a language</SelectLabel>
                      <SelectItem value="javascript">javascript</SelectItem>
                      <SelectItem value="python">python</SelectItem>
                      <SelectItem value="c++">c++</SelectItem>
                      <SelectItem value="java">java</SelectItem>
                      <SelectItem value="c">c</SelectItem>
                  </SelectGroup>
              </SelectContent>
              </Select>
              <Toggle>
                <IconUrgent/>
              </Toggle>
              <Slider ref={sliderRef} max={4} step={1}/> {/*was this so hacky??*/}
            </div>
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="75vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value) }
            />
          </Box>
         <button
          type="submit"
          className="px-4 py-2 mx-6 bg-blue-600 text-white rounded"
          disabled={isLoading}
        >
          {/* Push Request */}
          {isLoading ? 'Saving...' : selectedRequest ? 'Update Request' : 'Add Request'}
        </button>
      </form>
      <Textarea className="w-24 grow-3"/>
    </div>
  );
};
export default CodeEditor;
