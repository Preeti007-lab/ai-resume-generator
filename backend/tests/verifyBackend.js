import dotenv from 'dotenv';
dotenv.config();

import { createApp } from '../app.js';
import { groqService } from '../services/groqService.js';

/**
 * Backend Automated Verification Suite
 */
async function runVerification() {
  console.log('🧪 Starting Backend Verification Suite...\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName, details = '') => {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} ${details ? '(' + details + ')' : ''}`);
      failed++;
    }
  };

  // 1. Initialize Express App
  console.log('1. Testing Express Application Initialization...');
  const app = createApp();
  assert(typeof app === 'function', 'createApp returns Express application instance');

  // Start temporary test server
  const testPort = 5099;
  const server = await new Promise((resolve) => {
    const s = app.listen(testPort, () => resolve(s));
  });

  const baseUrl = `http://localhost:${testPort}`;

  try {
    // 2. Test GET /health
    console.log('\n2. Testing /health Diagnostic Endpoint...');
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'GET /health returns HTTP 200 OK');
    assert(healthData.status === 'ok', 'Health status is "ok"');
    assert(typeof healthData.services === 'object', 'Health data reports service statuses');

    // 3. Test Unauthenticated Requests (Security & Clerk Auth Guard)
    console.log('\n3. Testing Security & Unauthenticated Route Rejection (401)...');

    const unauthPost = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Test User', email: 'test@example.com', targetRole: 'Dev' })
    });
    assert(unauthPost.status === 401, 'POST /generate rejects unauthenticated request with 401');
    const unauthPostData = await unauthPost.json();
    assert(unauthPostData.success === false, 'POST /generate returns success: false');

    const unauthGet = await fetch(`${baseUrl}/getresumes`);
    assert(unauthGet.status === 401, 'GET /getresumes rejects unauthenticated request with 401');

    const unauthDelete = await fetch(`${baseUrl}/deleteresume?id=507f1f77bcf86cd799439011`, {
      method: 'DELETE'
    });
    assert(unauthDelete.status === 401, 'DELETE /deleteresume rejects unauthenticated request with 401');

    // 4. Test 404 Not Found Route Handler
    console.log('\n4. Testing 404 Not Found Route Handler...');
    const notFoundRes = await fetch(`${baseUrl}/non-existent-endpoint`);
    assert(notFoundRes.status === 404, 'Unknown route returns HTTP 404');
    const notFoundData = await notFoundRes.json();
    assert(notFoundData.error?.code === 'NOT_FOUND', '404 error contains NOT_FOUND code');

    // 5. Test Groq Service Prompt Construction & Schema Normalization
    console.log('\n5. Testing Groq Service Prompt Construction & Normalization...');
    const testSampleInput = {
      fullName: 'Alex Morgan',
      targetRole: 'Lead Architect',
      email: 'alex@example.com',
      objective: 'Build cloud-native platforms',
      skills: ['Go', 'Kubernetes']
    };

    const promptOutput = groqService.buildPrompt(testSampleInput);
    assert(promptOutput.includes('Alex Morgan'), 'Prompt includes candidate fullName');
    assert(promptOutput.includes('Lead Architect'), 'Prompt includes targetRole');
    assert(promptOutput.includes('Kubernetes'), 'Prompt includes skills');

    const normalized = groqService.normalizeResumeOutput(
      {
        personalDetails: { fullName: 'Alex Morgan', targetRole: 'Lead Architect' },
        objective: 'Enhanced objective',
        skills: ['Go', 'Kubernetes', 'Docker']
      },
      testSampleInput
    );
    assert(normalized.personalDetails.fullName === 'Alex Morgan', 'Normalized output preserves fullName');
    assert(normalized.skills.includes('Docker'), 'Normalized output incorporates AI enhanced skills');

  } catch (error) {
    console.error('Test Suite Exception:', error);
    failed++;
  } finally {
    server.close();
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification();
