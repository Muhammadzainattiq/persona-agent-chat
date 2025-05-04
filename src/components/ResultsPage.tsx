import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PersonalityTypeData } from '@/services/api';
import { motion } from 'framer-motion';
import { Star, Users, Heart, ArrowLeft, Brain, Sparkles, BadgeCheck, AlarmClock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import confetti from 'canvas-confetti';

// Animation variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const personalityData = location.state?.personalityData as PersonalityTypeData;

  // If no data is present, redirect to home
  useEffect(() => {
    if (!personalityData) {
      navigate('/');
    } else {
      // Trigger confetti when results are shown
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 500);
    }
  }, [personalityData, navigate]);

  if (!personalityData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 py-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 relative">
              Your Personality Type: <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">{personalityData.type.toUpperCase()}</span>
            </h1>
          </div>
          <div className="bg-card/70 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow-md">
            <h2 className="text-2xl md:text-3xl text-foreground font-medium flex items-center justify-center">
              <span className="mr-2">✨</span>
              "{personalityData.nickname}"
              <span className="ml-2">✨</span>
            </h2>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/90 backdrop-blur-sm shadow-xl p-8 mb-8 border-primary/10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Key Characteristics</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {personalityData.characteristics.map((trait, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="px-5 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-primary font-medium shadow-sm flex items-center"
                >
                  <BadgeCheck className="h-4 w-4 mr-1 text-primary" />
                  {trait}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div variants={itemVariants}>
            <Card className="bg-card/90 backdrop-blur-sm shadow-xl p-8 h-full border-primary/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success/10 to-success/5 rounded-full -mr-16 -mt-16 opacity-70"></div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center relative z-10">
                <div className="bg-success/10 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-success" />
                </div>
                Your Strengths
              </h3>
              <ul className="space-y-4 relative z-10">
                {personalityData.strengths.map((strength, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                    className="flex items-start"
                  >
                    <span className="bg-success/10 p-1 rounded-full text-success mr-3 mt-0.5">•</span>
                    <span className="text-foreground">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-card/90 backdrop-blur-sm shadow-xl p-8 h-full border-primary/10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full -ml-16 -mt-16 opacity-70"></div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center relative z-10">
                <div className="bg-accent/10 p-2 rounded-full mr-3">
                  <AlarmClock className="h-5 w-5 text-accent" />
                </div>
                Growth Opportunities
              </h3>
              <ul className="space-y-4 relative z-10">
                {personalityData.weaknesses.map((weakness, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                    className="flex items-start"
                  >
                    <span className="bg-accent/10 p-1 rounded-full text-accent mr-3 mt-0.5">•</span>
                    <span className="text-foreground">{weakness}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/90 backdrop-blur-sm shadow-xl p-8 border-primary/10 mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <div className="bg-secondary/10 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              Famous People With Your Personality Type
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {personalityData.famous_examples.map((person, index) => {
                const imageUrl = personalityData.images[person];
                
                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + (index * 0.1) }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-md"></div>
                      <Avatar className="w-24 h-24 border-2 border-white shadow-lg relative">
                        <AvatarImage 
                          src={imageUrl} 
                          alt={person} 
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-lg">
                          {person.split(' ').map(word => word[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="font-medium text-secondary text-center">{person}</span>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-10">
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Start Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
