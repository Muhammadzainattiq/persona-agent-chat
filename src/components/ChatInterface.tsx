
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Send } from 'lucide-react';
import { callAgentApi, generateUserId, Message, PersonalityTypeData } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [personalityData, setPersonalityData] = useState<PersonalityTypeData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Generate a user ID on component mount
  useEffect(() => {
    const newUserId = generateUserId();
    setUserId(newUserId);
    
    // Send initial greeting to start the conversation
    handleInitialGreeting(newUserId);
  }, []);

  const handleInitialGreeting = async (uid: string) => {
    setIsLoading(true);
    try {
      const response = await callAgentApi("hi", uid);
      setMessages(response.messages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize the chat. Please refresh and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message immediately for better UX
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await callAgentApi(userMessage, userId);
      
      // Update messages with the full conversation history from API
      setMessages(response.messages);
      
      // Check if conversation is complete
      if (response.is_complete) {
        setIsComplete(true);
        if (response.personality_type_data) {
          setPersonalityData(response.personality_type_data);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteAnalysis = () => {
    if (personalityData) {
      navigate('/results', { state: { personalityData } });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-violet-50 to-blue-50">
      {/* Chat Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex items-center">
          <MessageSquare className="h-6 w-6 text-accent mr-2" />
          <h1 className="text-xl font-semibold">PersonaAgent</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-bubble`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card 
                className={`px-4 py-3 max-w-[80%] shadow-message
                  ${message.role === 'user' 
                    ? 'bg-accent text-white rounded-t-lg rounded-bl-lg rounded-br-sm' 
                    : 'bg-white rounded-t-lg rounded-br-lg rounded-bl-sm'}
                `}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start message-bubble">
              <Card className="px-4 py-3 bg-white rounded-t-lg rounded-br-lg rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-accent loading-dot"></div>
                  <div className="w-2 h-2 rounded-full bg-accent loading-dot"></div>
                  <div className="w-2 h-2 rounded-full bg-accent loading-dot"></div>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Complete Analysis Button */}
      {isComplete && personalityData && (
        <div className="p-4 bg-secondary">
          <div className="max-w-3xl mx-auto">
            <Button 
              onClick={handleCompleteAnalysis} 
              className="w-full bg-accent hover:bg-accent/90 text-white"
            >
              Complete Analysis & View Results
            </Button>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading || isComplete}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading || isComplete}
            className="bg-accent hover:bg-accent/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
