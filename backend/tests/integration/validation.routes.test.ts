import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import type { Server } from 'http';
import { createApp } from '../../src/app.js';

describe('POST /api/validate', () => {
  const app = createApp();
  let server: Server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  it('returns valid true for a valid card number', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({ cardNumber: '4539148803436467' })
      .expect(200);

    expect(response.body).toEqual({ valid: true });
  });

  it('returns valid false for an invalid checksum', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({ cardNumber: '4539148803436468' })
      .expect(200);

    expect(response.body).toEqual({ valid: false });
  });

  it('accepts card numbers with spaces and dashes', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({ cardNumber: '4539-1488 0343 6467' })
      .expect(200);

    expect(response.body).toEqual({ valid: true });
  });

  it('returns 400 when cardNumber is missing', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({})
      .expect(400);

    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 400 for non-digit characters', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({ cardNumber: '4539-abc-0343-6467' })
      .expect(400);

    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 400 for card numbers that are too short', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({ cardNumber: '123456789012' })
      .expect(400);

    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown').expect(404);

    expect(response.body.error.code).toBe('NOT_FOUND');
  });

  it('returns health check status', async () => {
    const response = await request(app).get('/api/health').expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});
