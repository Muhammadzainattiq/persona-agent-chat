import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { callAgentApi, generateUserId, Message, PersonalityTypeData } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [personalityData, setPersonalityData] = useState<PersonalityTypeData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Generate a user ID on component mount
  useEffect(() => {
    const newUserId = generateUserId();
    setUserId(newUserId);
    
    // Send initial greeting to start the conversation
    handleInitialGreeting(newUserId);
  }, []);

  // Keep focus on the input field after sending a message
  useEffect(() => {
    if (!isComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isComplete]);

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
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Chat Header */}
      <header className="bg-card shadow-md py-4 px-6 border-b border-primary/10">
        <div className="flex items-center justify-center md:justify-start max-w-3xl mx-auto w-full">
          <div className="bg-accent/10 p-2 rounded-full mr-3">
            <MessageSquare className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">PersonaAgent</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center p-2 bg-accent/10 rounded-full mb-3">
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            </div>
            <h2 className="text-lg md:text-xl font-medium text-foreground">
              Discover your personality through conversation
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Chat with me to reveal your personality type
            </p>
          </motion.div>

          {messages.map((message, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-bubble`}
            >
              <Card 
                className={`px-4 py-3 max-w-[85%] md:max-w-[75%] shadow-md
                  ${message.role === 'user' 
                    ? 'bg-accent text-white rounded-t-lg rounded-bl-lg rounded-br-sm border-accent' 
                    : 'bg-card rounded-t-lg rounded-br-lg rounded-bl-sm border-primary/10'}
                `}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </Card>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <Card className="px-6 py-4 bg-card rounded-lg shadow-md border-primary/10">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-accent loading-dot"></div>
                  <div className="w-2 h-2 rounded-full bg-accent loading-dot"></div>
                  <div className="w-2 h-2 rounded-full bg-accent loading-dot"></div>
                </div>
              </Card>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Complete Analysis Button */}
      {isComplete && personalityData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-primary via-secondary to-accent"
        >
          <div className="max-w-3xl mx-auto">
            <Button 
              onClick={handleCompleteAnalysis} 
              className="w-full bg-card hover:bg-card/90 text-primary font-medium py-6 text-lg rounded-xl shadow-lg border border-primary/10 hover:shadow-xl transition-all"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Complete Analysis & View Your Personality Type
            </Button>
          </div>
        </motion.div>
      )}

      {/* Chat Input */}
      <div className="p-4 bg-card border-t border-primary/10">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading || isComplete}
            className="flex-1 border-primary/20 focus-visible:ring-accent"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading || isComplete}
            className="bg-accent hover:bg-accent/90 shadow-md hover:shadow-lg transition-shadow"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
