# 🤖 QuickCoWork Chatbot with Gemini AI

This guide will help you set up the Gemini AI chatbot integration for your QuickCoWork application.

## 🚀 Features

- **Desktop-First Design**: Beautiful, responsive chatbot interface
- **Gemini AI Integration**: Powered by Google's Gemini Pro model
- **Quick Actions**: Pre-defined buttons for common queries
- **Real-time Chat**: Smooth conversation flow with typing indicators
- **Context-Aware**: Understands QuickCoWork services and pricing
- **Minimize/Maximize**: Collapsible chat window for better UX

## 📋 Prerequisites

1. **Google Cloud Account**: You need a Google Cloud account
2. **Gemini API Access**: Enable the Gemini API in Google Cloud Console
3. **API Key**: Generate an API key for the Gemini API

## 🔧 Setup Instructions

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_GEMINI_API_KEY=your-actual-gemini-api-key-here
```

### 3. Enable Real Gemini Integration

Currently, the chatbot uses mock responses. To enable real Gemini AI:

1. Open `src/services/geminiService.js`
2. Uncomment the Gemini API call code (lines 25-65)
3. Comment out the mock response line (line 67)

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Click the chat button in the bottom-right corner
3. Try asking questions like:
   - "What types of workspaces do you have?"
   - "How much do offices cost?"
   - "How do I book a space?"
   - "Where are your locations?"

## 🎨 Customization

### Chatbot Styling

The chatbot uses the same design system as your application:

- **Colors**: Primary and accent colors from your theme
- **Typography**: Consistent with your app's font hierarchy
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Works on all screen sizes

### Quick Actions

Edit the quick action buttons in `src/components/Chatbot.jsx`:

```jsx
{['Find Workspace', 'Pricing', 'Book Now', 'Locations'].map((action) => (
  <Button
    key={action}
    variant="outline"
    size="sm"
    onClick={() => setInputValue(action)}
    className="btn-outline-beautiful text-xs"
  >
    {action}
  </Button>
))}
```

### AI Responses

Customize responses in `src/services/geminiService.js`:

```javascript
const responses = {
  'hello': "Your custom greeting message",
  'workspace': "Your workspace information",
  // Add more responses...
};
```

## 🔒 Security Considerations

1. **API Key Protection**: Never commit your API key to version control
2. **Environment Variables**: Use `.env` files for sensitive data
3. **Rate Limiting**: Consider implementing rate limiting for API calls
4. **Error Handling**: The chatbot gracefully handles API errors

## 🚀 Deployment

### Vercel/Netlify

1. Add your environment variable in your deployment platform
2. Set `REACT_APP_GEMINI_API_KEY` to your actual API key
3. Deploy your application

### Local Development

1. Create `.env.local` for local development
2. Add your API key: `REACT_APP_GEMINI_API_KEY=your-key`
3. Restart your development server

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify your API key is correct
   - Check if Gemini API is enabled in Google Cloud Console
   - Ensure environment variable is set correctly

2. **Chatbot Not Appearing**
   - Check browser console for errors
   - Verify the Chatbot component is imported in App.tsx
   - Ensure all dependencies are installed

3. **Responses Not Working**
   - Check network tab for API call errors
   - Verify the Gemini service is properly configured
   - Test with mock responses first

### Debug Mode

Enable debug logging by adding this to your component:

```javascript
console.log('API Status:', getAPIStatus());
console.log('Gemini Response:', response);
```

## 📱 Usage Examples

### User Queries the Chatbot Can Handle

- **"What types of workspaces do you have?"**
- **"How much do offices cost per hour?"**
- **"I need a kitchen for my food business"**
- **"Where are your locations?"**
- **"How do I book a space?"**
- **"What amenities do you provide?"**
- **"Do you have meeting rooms?"**
- **"Can I book for just 2 hours?"**

### Quick Actions

Users can click these buttons for instant responses:
- **Find Workspace**: Shows available space types
- **Pricing**: Displays current pricing structure
- **Book Now**: Explains booking process
- **Locations**: Lists available cities

## 🎯 Next Steps

1. **Enable Real Gemini**: Uncomment the API code and test
2. **Customize Responses**: Add more specific responses for your business
3. **Add Analytics**: Track chatbot usage and user interactions
4. **Integrate with Booking**: Connect chatbot to actual booking flow
5. **Add Voice Support**: Consider adding voice input/output

## 📞 Support

If you need help with the chatbot integration:

1. Check the browser console for error messages
2. Verify your API key and permissions
3. Test with the mock responses first
4. Review the Gemini API documentation

---

**Happy Chatting! 🤖✨** 