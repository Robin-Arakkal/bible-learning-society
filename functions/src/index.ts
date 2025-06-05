/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory storage for contact submissions
const contactSubmissions: Array<{
  name: string;
  email: string;
  message: string;
  timestamp: number;
}> = [];

export const contact = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Store the submission
    contactSubmissions.push({
      name,
      email,
      message,
      timestamp: Date.now(),
    });

    // Log the submission
    console.log('New contact submission:', { name, email, message });

    return res.status(201).json({ message: 'Submission received' });
  } catch (error) {
    console.error('Error processing submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Optional: Add an endpoint to retrieve submissions (for admin purposes)
export const getSubmissions = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // In a real application, you would add authentication here
  return res.status(200).json({ submissions: contactSubmissions });
});
