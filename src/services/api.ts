
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
}

export interface ChatResponse {
  messages: Message[];
  is_complete: boolean;
  personality_type_data?: PersonalityTypeData;
}

// Generate a user ID for the conversation
export const generateUserId = (): string => {
  return uuidv4();
};

// Call the agent API
export const callAgentApi = async (message: string, userId: string): Promise<ChatResponse> => {
  try {
    // In a real implementation, this would call the localhost:8000/call_agent endpoint
    // For now, we'll mock the API call since we can't reach localhost:8000
    
    // For testing purposes, we'll simulate API behavior
    // This would be replaced with a real fetch call in production
    console.log(`Calling API with message: ${message} and userId: ${userId}`);
    
    // Mock response for demo purposes
    // In production, replace with:
    // const response = await fetch('http://localhost:8000/call_agent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt: message, user_id: userId })
    // });
    // return await response.json();
    
    // Mock response that simulates the API behavior for demo
    // This would be removed in production when the actual API is available
    return mockApiResponse(message, userId);
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error('Failed to communicate with the personality agent.');
  }
};

// Mock API response for demonstration purposes
// This would be replaced with actual API calls in production
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
        weaknesses: ["Argumentative", "Insensitive", "Can be unfocused", "Dislikes routine"]
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
