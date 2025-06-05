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
import express from 'express';
import cors from 'cors';

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  timestamp: admin.firestore.Timestamp;
}

const db = admin.firestore();

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const contact = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  try {
    const submission: ContactSubmission = {
      name,
      email,
      message,
      timestamp: admin.firestore.Timestamp.now(),
    };

    await db.collection('submissions').add(submission);
    res.status(201).json({ message: 'Submission received' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const getSubmissions = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const snapshot = await db.collection('submissions')
      .orderBy('timestamp', 'desc')
      .get();

    const submissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
