import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { callGeminiAPI, getAPIStatus } from '@/services/geminiService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your QuickCoWork AI assistant. I can help you find the perfect workspace, answer questions about our services, or assist with bookings. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get API status for debugging
  const apiStatus = getAPIStatus();

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending message to Gemini API:', inputValue);
      console.log('API Status:', apiStatus);
      
      const botResponse = await callGeminiAPI(inputValue);
      console.log('Received response from Gemini:', botResponse);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-8 right-8 z-[9999] pointer-events-auto">
        <Button
          onClick={toggleChat}
          className="btn-gradient w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl animate-pulse-glow hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>

            {/* Chat Window */}
      {isOpen && (
        <>
          {/* Backdrop to prevent interaction with main content */}
          <div className="fixed inset-0 z-[9998] pointer-events-none" />
          <div className="fixed bottom-24 right-8 z-[9999] w-96 lg:w-[450px] xl:w-[500px] pointer-events-auto max-h-[80vh]">
            <Card className="floating-card-elegant overflow-hidden h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">QuickCoWork AI</h3>
                      <p className="text-sm opacity-90">Powered by Gemini</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMinimize}
                      className="text-white hover:bg-white/20"
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleChat}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ maxHeight: 'calc(80vh - 200px)' }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md'
                            : 'bg-muted rounded-2xl rounded-bl-md'
                        } p-4`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === 'bot' && (
                            <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className="text-xs opacity-60 mt-2">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {message.type === 'user' && (
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-bl-md p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-border/20 flex-shrink-0">
                  <div className="flex space-x-3">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about workspaces, pricing, or bookings..."
                      className="input-desktop flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="btn-gradient px-6"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Find Workspace', 'Pricing', 'Book Now', 'Locations', 'Test AI'].map((action) => (
                      <Button
                        key={action}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (action === 'Test AI') {
                            setInputValue('Hello, can you help me find a workspace?');
                          } else {
                            setInputValue(action);
                          }
                        }}
                        className="btn-outline-beautiful text-xs"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
        </>
      )}
    </>
  );
};

export default Chatbot; 