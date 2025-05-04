import { v4 as uuidv4 } from 'uuid';

// Type definitions for our API responses
export interface Message {
  role: 'user' | 'ai';
  content: string;
}

export interface PersonalityTypeData {
  type: string;
  nickname: string;
  characteristics: string[];
  famous_examples: string[];
  strengths: string[];
  weaknesses: string[];
  images?: {
    [key: string]: string;
  };
}

export interface ChatResponse {
  messages: Message[];
  is_complete: boolean;
  personality_type_data?: PersonalityTypeData;
}

// Base API endpoint
const API_BASE_URL = 'https://zainattiq-personaagent.hf.space';

// Generate a user ID for the conversation
export const generateUserId = (): string => {
  return uuidv4();
};

// Call the agent API
export const callAgentApi = async (message: string, userId: string): Promise<ChatResponse> => {
  try {
    console.log(`Calling API with message: ${message} and userId: ${userId}`);
    
    const response = await fetch(`${API_BASE_URL}/call_agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message, user_id: userId })
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    
    // Fallback to mock response if API call fails
    return mockApiResponse(message, userId);
  }
};

// Mock API response for fallback when the actual API is unavailable
const mockApiResponse = (message: string, userId: string): ChatResponse => {
  // Simple chat flow simulation
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('start')) {
    return {
      messages: [
        { role: 'user', content: message },
        { role: 'ai', content: "Hello! I'm PersonaAgent, an AI designed to analyze your personality type. I'll ask you a few questions to determine your personality profile. Are you ready to begin?" }
      ],
      is_complete: false
    };
  } 
  
  if (lowerMessage.includes('yes') || lowerMessage.includes('ready') || lowerMessage.includes('sure')) {
    return {
      messages: [
        { role: 'user', content: message },
        { role: 'ai', content: "Great! Let's start with the first question: Do you prefer spending time with large groups of people, or do you enjoy solitude and smaller gatherings? (This helps determine if you're more extroverted or introverted)" }
      ],
      is_complete: false
    };
  }
  
  if (lowerMessage.includes('large') || lowerMessage.includes('group') || lowerMessage.includes('people')) {
    return {
      messages: [
        { role: 'user', content: message },
        { role: 'ai', content: "I see you're more social and energized by groups. Next question: When making important decisions, do you rely more on logical analysis and facts, or do you consider people's feelings and personal values?" }
      ],
      is_complete: false
    };
  }
  
  if (lowerMessage.includes('logic') || lowerMessage.includes('facts') || lowerMessage.includes('analysis')) {
    return {
      messages: [
        { role: 'user', content: message },
        { role: 'ai', content: "You seem to prioritize logical thinking in your decisions. Final question: Do you prefer having a structured plan with clear deadlines, or do you prefer keeping your options open and adapting as you go?" }
      ],
      is_complete: false
    };
  }
  
  if (lowerMessage.includes('adapt') || lowerMessage.includes('open') || lowerMessage.includes('flexible')) {
    return {
      messages: [
        { role: 'user', content: message },
        { role: 'ai', content: "Thank you for your responses! I have enough information to determine your personality type now. Click 'Complete Analysis' to view your results." }
      ],
      is_complete: true,
      personality_type_data: {
        type: "entp",
        nickname: "The Debater",
        characteristics: ["Inventive", "Witty", "Argumentative", "Resourceful"],
        famous_examples: ["Thomas Edison", "Sacha Baron Cohen", "Tom Hanks"],
        strengths: ["Quick-witted", "Innovative", "Charismatic", "Debate-savvy"],
        weaknesses: ["Argumentative", "Insensitive", "Can be unfocused", "Dislikes routine"],
        images: {
          "Thomas Edison": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Thomas_Edison2.jpg",
          "Sacha Baron Cohen": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sacha_Baron_Cohen_2019_by_Glenn_Francis.jpg/800px-Sacha_Baron_Cohen_2019_by_Glenn_Francis.jpg",
          "Tom Hanks": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/800px-Tom_Hanks_TIFF_2019.jpg"
        }
      }
    };
  }
  
  // Default response for any other input
  return {
    messages: [
      { role: 'user', content: message },
      { role: 'ai', content: "I'm still learning to understand different responses. Could you please elaborate or try phrasing your answer differently?" }
    ],
    is_complete: false
  };
};
