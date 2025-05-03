
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PersonalityTypeData } from '@/services/api';
import { motion } from 'framer-motion';

// Animation variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const personalityData = location.state?.personalityData as PersonalityTypeData;

  // If no data is present, redirect to home
  React.useEffect(() => {
    if (!personalityData) {
      navigate('/');
    }
  }, [personalityData, navigate]);

  if (!personalityData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-blue-50 p-4 py-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Personality Type: <span className="text-accent">{personalityData.type.toUpperCase()}</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700">"{personalityData.nickname}"</h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white shadow-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="inline-block p-4 rounded-full bg-accent/10 mb-4">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Key Characteristics</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {personalityData.characteristics.map((trait, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-secondary rounded-full text-accent-foreground"
                >
                  {trait}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-lg p-6 h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2 text-green-500">💪</span>
                Your Strengths
              </h3>
              <ul className="space-y-2">
                {personalityData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-lg p-6 h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2 text-amber-500">⚠️</span>
                Growth Opportunities
              </h3>
              <ul className="space-y-2">
                {personalityData.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-amber-500">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-6">
          <Card className="bg-white shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🌟</span>
              Famous People With Your Personality Type
            </h3>
            <div className="flex flex-wrap gap-3">
              {personalityData.famous_examples.map((person, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-accent/10 rounded-full text-accent"
                >
                  {person}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/')}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg rounded-full shadow-lg"
          >
            Start Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
