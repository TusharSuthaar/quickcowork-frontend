# 🔥 Firebase Setup Guide for QuickCoWork Chatbot

This guide will help you set up Firebase for your QuickCoWork chatbot to store chat history and user sessions.

## 📋 Prerequisites

- Google account
- Node.js project (already set up)
- Firebase CLI (optional, for advanced features)

## 🚀 Step-by-Step Setup

### Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project" or "Add project"
   - Enter project name: `quickcowork-chatbot` (or your preferred name)
   - Click "Continue"

3. **Configure Project**
   - Enable Google Analytics (optional but recommended)
   - Choose analytics account or create new one
   - Click "Create project"

### Step 2: Enable Firestore Database

1. **Navigate to Firestore**
   - In Firebase Console, click "Firestore Database" in the left sidebar
   - Click "Create database"

2. **Choose Security Rules**
   - Select "Start in test mode" (for development)
   - Click "Next"

3. **Choose Location**
   - Select a location close to your users (e.g., `us-central1` for US)
   - Click "Done"

### Step 3: Get Firebase Configuration

1. **Add Web App**
   - In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"
   - Scroll down to "Your apps" section
   - Click the web icon `</>` to add a web app

2. **Register App**
   - Enter app nickname: `QuickCoWork Chatbot`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

3. **Copy Configuration**
   - You'll see a configuration object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

### Step 4: Update Environment Variables

1. **Edit your `.env` file** in the project root:
   ```bash
   # Existing Gemini API key
   VITE_GEMINI_API_KEY=AIzaSyB5DU_WqWbv-A3MuOhWSRLq85FUvZK4Nos

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-api-key-from-firebase
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

2. **Replace the placeholder values** with your actual Firebase configuration

### Step 5: Configure Firestore Security Rules

1. **Go to Firestore Rules**
   - In Firebase Console, click "Firestore Database"
   - Click "Rules" tab

2. **Update Rules** (for development):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write access to chat_history collection
       match /chat_history/{document} {
         allow read, write: if true;
       }
       
       // Allow read/write access to user_sessions collection
       match /user_sessions/{document} {
         allow read, write: if true;
       }
     }
   }
   ```

3. **Click "Publish"** to save the rules

### Step 6: Test the Integration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Open the application** and test the chatbot:
   - Click the chat button
   - Send a message
   - Check Firebase Console to see if data is being saved

3. **Verify in Firebase Console**:
   - Go to Firestore Database
   - You should see `chat_history` collection with your messages

## 🔧 Advanced Configuration

### Production Security Rules

For production, use more restrictive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chat_history/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /user_sessions/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Enable Authentication (Optional)

1. **Go to Authentication** in Firebase Console
2. **Click "Get started"**
3. **Enable sign-in methods** (Google, Email/Password, etc.)
4. **Update your app** to use Firebase Auth

## 📊 Monitoring and Analytics

### View Chat Analytics

1. **Go to Firestore Database**
2. **Click on `chat_history` collection**
3. **View real-time data** of chat messages

### Set up Firebase Analytics (Optional)

1. **Go to Analytics** in Firebase Console
2. **Follow setup instructions**
3. **Track user engagement** with your chatbot

## 🛠️ Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/unauthorized)"**
   - Check your API key in `.env` file
   - Verify Firebase project settings

2. **"Firebase: Error (firestore/permission-denied)"**
   - Check Firestore security rules
   - Ensure rules allow read/write access

3. **"Firebase: Error (app/no-app)"**
   - Verify Firebase initialization in `src/lib/firebase.js`
   - Check if Firebase is properly imported

### Debug Steps

1. **Check Console Logs**
   - Open browser developer tools
   - Look for Firebase-related errors

2. **Verify Environment Variables**
   - Ensure all Firebase config values are set
   - Check for typos in variable names

3. **Test Firebase Connection**
   - Add console.log in `firebase.js` to verify initialization

## 📁 Project Structure

After setup, your project should have:

```
quickcowork-frontend/
├── src/
│   ├── lib/
│   │   └── firebase.js          # Firebase configuration
│   ├── services/
│   │   ├── geminiService.js     # Gemini AI integration
│   │   └── firebaseService.js   # Firebase operations
│   └── components/
│       └── Chatbot.jsx          # Chatbot component
├── .env                         # Environment variables
└── FIREBASE_SETUP.md           # This guide
```

## 🎯 Next Steps

1. **Test the integration** with your chatbot
2. **Monitor data** in Firebase Console
3. **Implement user authentication** (optional)
4. **Add analytics** to track usage
5. **Deploy to production** with proper security rules

## 🔐 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Implement proper authentication** for production
4. **Regularly review** Firestore security rules
5. **Monitor usage** and set up billing alerts

## 📞 Support

If you encounter issues:

1. **Check Firebase Console** for error messages
2. **Review browser console** for JavaScript errors
3. **Verify network connectivity** to Firebase
4. **Check Firebase documentation** for specific errors

---

**Your QuickCoWork chatbot is now ready with Firebase integration! 🎉** 