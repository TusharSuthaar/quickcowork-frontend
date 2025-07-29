// Firebase service for chatbot functionality
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Chat history collection
const CHAT_COLLECTION = 'chat_history';

// Save a message to Firebase
export const saveMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, CHAT_COLLECTION), {
      ...messageData,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving message to Firebase:', error);
    throw error;
  }
};

// Get chat history for a user
export const getChatHistory = async (userId, limitCount = 50) => {
  try {
    const q = query(
      collection(db, CHAT_COLLECTION),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const messages = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return messages.reverse(); // Return in chronological order
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
};

// Save user session data
export const saveUserSession = async (sessionData) => {
  try {
    const docRef = await addDoc(collection(db, 'user_sessions'), {
      ...sessionData,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving user session:', error);
    throw error;
  }
};

// Get analytics data
export const getChatAnalytics = async () => {
  try {
    const q = query(
      collection(db, CHAT_COLLECTION),
      orderBy('timestamp', 'desc'),
      limit(100)
    );
    
    const querySnapshot = await getDocs(q);
    const analytics = {
      totalMessages: querySnapshot.size,
      userMessages: 0,
      botMessages: 0,
      uniqueUsers: new Set()
    };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.type === 'user') {
        analytics.userMessages++;
      } else if (data.type === 'bot') {
        analytics.botMessages++;
      }
      if (data.userId) {
        analytics.uniqueUsers.add(data.userId);
      }
    });
    
    analytics.uniqueUsers = analytics.uniqueUsers.size;
    return analytics;
  } catch (error) {
    console.error('Error getting chat analytics:', error);
    throw error;
  }
}; 