const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://codesockets-core.onrender.com' 
  : 'http://localhost:3000';

const getSolutions = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/codebuddy/solutions/${requestId}`);
    if (!response.ok) {
      throw new Error('Error fetching solutions');
    }
    const parsed = await response.json();
    return parsed.data;
  } catch (err) {
    throw new Error(err);
  }
};

const submitSolution = async (solutionData) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(solutionData)
  };
  
  try {
    const response = await fetch(`${API_URL}/codebuddy/solution`, options);
    if (!response.ok) {
      throw new Error("Error submitting solution");
    }
    const parsed = await response.json();
    return parsed;
  } catch (err) {
    throw new Error(err);
  }
};

export { getSolutions, submitSolution };
