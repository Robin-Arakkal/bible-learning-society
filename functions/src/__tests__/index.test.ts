import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

const testEnv = functions();

describe('Contact Form Endpoint', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let data: any;

  beforeEach(() => {
    req = {
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    data = {};
  });

  afterEach(() => {
    testEnv.cleanup();
  });

  it('should handle valid contact form submission', async () => {
    const contactFunction = require('../index').contact;
    await contactFunction(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Submission received' });
  });

  it('should handle missing required fields', async () => {
    req.body = {
      name: 'John Doe',
      // email is missing
      message: 'Test message',
    };

    const contactFunction = require('../index').contact;
    await contactFunction(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
  });

  it('should handle invalid email format', async () => {
    req.body = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'Test message',
    };

    const contactFunction = require('../index').contact;
    await contactFunction(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
  });
}); 