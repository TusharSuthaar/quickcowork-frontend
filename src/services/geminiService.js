// Gemini AI Service for QuickCoWork Chatbot
// Replace with your actual Gemini API key and endpoint

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// QuickCoWork context for better AI responses
const QUICKCOWORK_CONTEXT = `
You are QuickCoWork AI Assistant, a helpful AI assistant for a shared workspace platform in India. 
QuickCoWork allows users to rent commercial spaces (offices, kitchens, studios) by the hour.

Key Information:
- Pricing: Offices start at ₹500/hour, kitchens at ₹800/hour, studios at ₹600/hour
- Locations: 25+ cities across India
- Services: Professional offices, commercial kitchens, creative studios
- Booking: Instant booking with no long-term commitments
- Features: Pay only for what you use, flexible scheduling

Always be helpful, friendly, and provide accurate information about QuickCoWork services.
If you don't know something specific, suggest contacting customer support.
`;

export const callGeminiAPI = async (userMessage) => {
  try {
    console.log('Gemini API called with message:', userMessage);
    console.log('API Key configured:', validateGeminiAPIKey());
    console.log('API Key value:', GEMINI_API_KEY);
    
    // Check if API key is configured
    if (!validateGeminiAPIKey()) {
      console.warn('Gemini API key not configured, using mock responses');
      return getMockResponse(userMessage);
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${QUICKCOWORK_CONTEXT}\n\nUser: ${userMessage}\n\nAssistant:`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.warn('Unexpected API response format:', data);
      return getMockResponse(userMessage);
    }
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Fallback to mock responses if API fails
    return getMockResponse(userMessage);
  }
};

// Mock responses for demonstration
const getMockResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  const responses = {
    'hello': "Hello! 👋 I'm your QuickCoWork AI assistant. I can help you find the perfect workspace, answer questions about our services, or assist with bookings. How can I help you today?",
    
    'workspace': "We have various workspace options to suit your needs:\n\n🏢 **Professional Offices**: Perfect for meetings, client calls, and focused work\n🍳 **Commercial Kitchens**: Ideal for food businesses, catering, and culinary ventures\n🎨 **Creative Studios**: Great for photography, videography, and artistic projects\n\nWhat type of space are you looking for?",
    
    'price': "Here's our transparent pricing structure:\n\n💰 **Offices**: Starting at ₹500/hour\n🍳 **Commercial Kitchens**: Starting at ₹800/hour\n🎨 **Creative Studios**: Starting at ₹600/hour\n\nPrices may vary by location and amenities. Would you like to see specific spaces in your area?",
    
    'booking': "Booking with QuickCoWork is super easy! 📅\n\n1. Browse available spaces in your area\n2. Select your preferred time slot\n3. Complete the booking process\n4. Get instant confirmation\n\nNo long-term commitments - pay only for what you use! Would you like me to help you find available spaces?",
    
    'location': "We have spaces across 25+ cities in India! 🗺️\n\nMajor cities include: Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, and many more.\n\nWhere are you located? I can help you find nearby options and show you what's available in your area.",
    
    'help': "I'm here to help! Here's what I can assist you with:\n\n🔍 **Find Workspaces**: Browse available spaces by type and location\n💰 **Pricing Information**: Get detailed pricing for different space types\n📅 **Booking Assistance**: Help you book spaces and manage reservations\n📍 **Location Search**: Find spaces near you\n❓ **General Inquiries**: Answer questions about our services\n\nWhat would you like to know?",
    
    'office': "Great choice! Our professional offices are perfect for:\n\n✅ Business meetings and client presentations\n✅ Focused work sessions\n✅ Video conferencing\n✅ Team collaboration\n\nStarting at ₹500/hour with amenities like high-speed internet, meeting rooms, and professional atmosphere. Would you like to see available offices in your area?",
    
    'kitchen': "Excellent! Our commercial kitchens are ideal for:\n\n🍳 Food businesses and catering\n🍽️ Cooking classes and workshops\n🥘 Meal prep services\n👨‍🍳 Professional culinary work\n\nStarting at ₹800/hour with commercial-grade equipment, storage, and safety features. Should I show you available kitchen spaces?",
    
    'studio': "Perfect! Our creative studios are designed for:\n\n📸 Photography and videography\n🎨 Art and design projects\n🎭 Content creation\n🎬 Film and media production\n\nStarting at ₹600/hour with professional lighting, backdrops, and creative amenities. Would you like to explore available studios?",
    
    'default': "I understand you're asking about QuickCoWork services! 🤔\n\nI can help you with:\n• Finding the perfect workspace\n• Understanding our pricing\n• Booking assistance\n• Location-based searches\n• General questions about our services\n\nCould you tell me more specifically what you're looking for? I'm here to help!"
  };

  // Check for specific keywords and return appropriate response
  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  // Check for common variations
  if (lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('fee')) {
    return responses['price'];
  }
  
  if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('schedule')) {
    return responses['booking'];
  }
  
  if (lowerMessage.includes('where') || lowerMessage.includes('city') || lowerMessage.includes('area')) {
    return responses['location'];
  }

  return responses['default'];
};

// Function to validate Gemini API key
export const validateGeminiAPIKey = () => {
  return GEMINI_API_KEY && GEMINI_API_KEY !== 'your-gemini-api-key';
};

// Function to get API status
export const getAPIStatus = () => {
  return {
    isConfigured: validateGeminiAPIKey(),
    apiKey: GEMINI_API_KEY ? 'Configured' : 'Not configured',
    endpoint: GEMINI_API_URL
  };
}; 