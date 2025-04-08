
import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { BadgeHelp } from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);


  const handlePostClick = async () => {
    setIsLoading(true);
    // Placeholder for the post request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsEditorOpen(false);
  };

  return (
    <div className="relative">
      
      {isEditorOpen && (
        <div className="bg-blue-100 p-4 w-2/3 h-200 text-center rounded-3xl">
          <p>Editor Card</p>
          <CustomButton onClick={handlePostClick} label={isLoading ? 'Posting...' : 'Post'} />
          <Link to="/" className="mx-3">Cancel</Link>
        </div>
      )}
    </div>
  );
}

export default App;
