
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const startPersonalityTest = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Your <span className="text-accent">Personality Type</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Have a conversation with our AI and uncover insights about your personality traits, strengths, and potential growth areas.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={startPersonalityTest}
            className="bg-accent hover:bg-accent/90 text-white py-6 px-8 text-lg rounded-full shadow-lg"
          >
            Start Your Personality Analysis
          </Button>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-accent text-xl font-semibold mb-2">Conversational</div>
            <p className="text-gray-600">Simple chat interface that makes discovering your personality type feel like talking with a friend</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-accent text-xl font-semibold mb-2">Insightful</div>
            <p className="text-gray-600">Detailed analysis of your personality traits, strengths, weaknesses, and growth opportunities</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-accent text-xl font-semibold mb-2">Quick</div>
            <p className="text-gray-600">Complete your personality assessment in just a few minutes of conversation</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
