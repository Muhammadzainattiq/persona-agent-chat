import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Heart, Zap, MessageSquare, Bot, Cpu } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const startPersonalityTest = () => {
    navigate('/chat');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/10 flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center max-w-4xl relative z-10"
      >
        {/* Floating elements in background */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut" 
          }}
          className="absolute -top-20 -right-20 text-primary/30 z-0"
        >
          <Brain size={120} />
        </motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
          className="absolute -bottom-16 -left-10 text-secondary/30 z-0"
        >
          <Sparkles size={100} />
        </motion.div>

        {/* AI Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 mx-auto w-fit"
        >
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center shadow-lg">
            <Bot className="mr-2 h-5 w-5" />
            <span>Powered by AI</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6 relative">
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full transform -translate-y-1/2"></div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 relative">
            Discover Your <span className="relative">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Personality Type</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto relative z-10">
            Have an insightful conversation with our <span className="font-semibold text-primary">AI personality agent</span> and uncover the unique traits that make you who you are.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="my-10"
          >
            <Button 
              onClick={startPersonalityTest}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-8 px-10 text-lg md:text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            >
              <Cpu className="mr-2 h-6 w-6" /> 
              Find your Personality Type with AI
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden"
          animate="visible"
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-primary/10">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MessageSquare className="text-primary h-6 w-6" />
            </div>
            <div className="text-primary text-xl font-semibold mb-3">Conversational</div>
            <p className="text-foreground">Engage in a natural dialogue that feels like chatting with a friend who really understands you</p>
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ delay: 0.1 }} className="bg-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-secondary/10">
            <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Brain className="text-secondary h-6 w-6" />
            </div>
            <div className="text-secondary text-xl font-semibold mb-3">Insightful</div>
            <p className="text-foreground">Get detailed analysis of your personality traits, strengths, weaknesses, and growth opportunities</p>
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ delay: 0.2 }} className="bg-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-accent/10">
            <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="text-accent h-6 w-6" />
            </div>
            <div className="text-accent text-xl font-semibold mb-3">Quick & Easy</div>
            <p className="text-foreground">Complete your personality assessment in just a few minutes of engaging conversation</p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="mt-16 text-center text-muted-foreground text-sm"
        >
          <p>Discover the authentic you through AI-powered personality insights</p>
          <div className="flex items-center justify-center mt-2">
            <Heart className="h-4 w-4 text-destructive mr-1" />
            <span>No sign up required</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
