import express from 'express';
import { Resume } from '../models/Resume.js';
import { generateResume, getResumes, deleteResume } from '../controllers/resumeController.js';
import { validateGenerateInput, validateDeleteInput } from '../middleware/validationMiddleware.js';
import { groqService } from '../services/groqService.js';
import { errorHandler } from '../middleware/errorHandler.js';

/**
 * Data Isolation & Security Test Suite
 * Tests multi-tenant isolation between User A and User B
 */
async function runIsolationTests() {
  console.log('🧪 Starting Multi-User Data Isolation & Ownership Test Suite...\n');

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

  // Mock Groq generation for deterministic tests
  const originalGenerate = groqService.generateResume;
  groqService.generateResume = async (input) => ({
    personalDetails: {
      fullName: input.fullName || 'Candidate',
      targetRole: input.targetRole || 'Engineer',
      email: input.email || 'user@example.com'
    },
    objective: 'Synthesized objective',
    experience: input.experience || [],
    skills: input.skills || []
  });

  // Mock in-memory DB operations if MongoDB instance is not connected in test runner
  const inMemoryStore = [];
  const originalSave = Resume.prototype.save;
  const originalFind = Resume.find;
  const originalFindOneAndDelete = Resume.findOneAndDelete;

  Resume.prototype.save = async function () {
    const doc = {
      _id: '507f1f77bcf86cd7994390' + (inMemoryStore.length + 1).toString().padStart(2, '0'),
      id: '507f1f77bcf86cd7994390' + (inMemoryStore.length + 1).toString().padStart(2, '0'),
      clerkUserId: this.clerkUserId,
      title: this.title,
      targetRole: this.targetRole,
      userEmail: this.userEmail,
      resumeInput: this.resumeInput,
      generatedResume: this.generatedResume,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryStore.push(doc);
    return doc;
  };

  Resume.find = (query) => {
    return {
      sort: () => {
        return Promise.resolve(inMemoryStore.filter((doc) => doc.clerkUserId === query.clerkUserId));
      }
    };
  };

  Resume.findOneAndDelete = async (query) => {
    const index = inMemoryStore.findIndex(
      (doc) => (doc._id === query._id || doc.id === query._id) && doc.clerkUserId === query.clerkUserId
    );
    if (index === -1) return null;
    const [deleted] = inMemoryStore.splice(index, 1);
    return deleted;
  };

  // Build Express Test App with user-injecting test middleware
  const app = express();
  app.use(express.json());

  // Test middleware that sets req.clerkUserId from X-Test-Clerk-User header
  app.use((req, res, next) => {
    req.clerkUserId = req.headers['x-test-clerk-user'];
    next();
  });

  app.post('/test/generate', validateGenerateInput, generateResume);
  app.get('/test/getresumes', getResumes);
  app.delete('/test/deleteresume', validateDeleteInput, deleteResume);
  app.use(errorHandler);

  const testPort = 5098;
  const server = await new Promise((resolve) => {
    const s = app.listen(testPort, () => resolve(s));
  });

  const baseUrl = `http://localhost:${testPort}`;

  try {
    // 1. User A Generates a Resume
    console.log('1. User A Generates Resume...');
    const userAPost = await fetch(`${baseUrl}/test/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Clerk-User': 'user_A_111111'
      },
      body: JSON.stringify({
        fullName: 'Alice Developer',
        targetRole: 'Senior React Engineer',
        email: 'alice@example.com',
        skills: ['React', 'TypeScript']
      })
    });

    assert(userAPost.status === 201, 'User A resume created with HTTP 201');
    const userAData = await userAPost.json();
    const userAResumeId = userAData.data.id || userAData.data._id;
    assert(userAData.data.clerkUserId === 'user_A_111111', 'Saved resume is stamped with User A clerkUserId');

    // 2. User B Generates a Resume
    console.log('\n2. User B Generates Resume...');
    const userBPost = await fetch(`${baseUrl}/test/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Clerk-User': 'user_B_222222'
      },
      body: JSON.stringify({
        fullName: 'Bob Architect',
        targetRole: 'Cloud Solutions Architect',
        email: 'bob@example.com',
        skills: ['AWS', 'Terraform']
      })
    });

    assert(userBPost.status === 201, 'User B resume created with HTTP 201');
    const userBData = await userBPost.json();
    const userBResumeId = userBData.data.id || userBData.data._id;
    assert(userBData.data.clerkUserId === 'user_B_222222', 'Saved resume is stamped with User B clerkUserId');

    // 3. User A Queries Resumes (Must NOT see User B's resume)
    console.log('\n3. Testing Data Isolation on GET /getresumes...');
    const userAGet = await fetch(`${baseUrl}/test/getresumes`, {
      headers: { 'X-Test-Clerk-User': 'user_A_111111' }
    });
    const userAGetData = await userAGet.json();
    assert(userAGetData.data.length === 1, 'User A gets exactly 1 resume');
    assert(userAGetData.data[0].id === userAResumeId, 'User A gets only their own resume');
    assert(
      !userAGetData.data.some((r) => r.clerkUserId === 'user_B_222222'),
      'User A response contains zero User B records'
    );

    // 4. User B Queries Resumes (Must NOT see User A's resume)
    const userBGet = await fetch(`${baseUrl}/test/getresumes`, {
      headers: { 'X-Test-Clerk-User': 'user_B_222222' }
    });
    const userBGetData = await userBGet.json();
    assert(userBGetData.data.length === 1, 'User B gets exactly 1 resume');
    assert(userBGetData.data[0].id === userBResumeId, 'User B gets only their own resume');

    // 5. Cross-User Deletion Attack: User A tries to delete User B's Resume
    console.log('\n4. Testing Unauthorized Cross-User Deletion Attack...');
    const crossDeleteAttempt = await fetch(`${baseUrl}/test/deleteresume?id=${userBResumeId}`, {
      method: 'DELETE',
      headers: { 'X-Test-Clerk-User': 'user_A_111111' }
    });

    assert(
      crossDeleteAttempt.status === 404,
      'User A attempting to delete User B resume is rejected with HTTP 404'
    );
    const crossDeleteData = await crossDeleteAttempt.json();
    assert(crossDeleteData.success === false, 'Cross-user deletion returns success: false');

    // Verify User B's resume is STILL intact
    const verifyUserBStillExists = await fetch(`${baseUrl}/test/getresumes`, {
      headers: { 'X-Test-Clerk-User': 'user_B_222222' }
    });
    const verifyData = await verifyUserBStillExists.json();
    assert(verifyData.data.length === 1, 'User B resume remains safely intact after attack attempt');

    // 6. Authorized Deletion: User B deletes their own resume
    console.log('\n5. Testing Authorized Deletion...');
    const legitDelete = await fetch(`${baseUrl}/test/deleteresume?id=${userBResumeId}`, {
      method: 'DELETE',
      headers: { 'X-Test-Clerk-User': 'user_B_222222' }
    });
    assert(legitDelete.status === 200, 'User B successfully deletes their own resume with HTTP 200');

    // Verify User B's list is now empty
    const verifyUserBEmpty = await fetch(`${baseUrl}/test/getresumes`, {
      headers: { 'X-Test-Clerk-User': 'user_B_222222' }
    });
    const emptyData = await verifyUserBEmpty.json();
    assert(emptyData.data.length === 0, 'User B resume list is now 0');

    // 7. Test Validation Rejections
    console.log('\n6. Testing Input Validation Rules...');
    const invalidEmailRes = await fetch(`${baseUrl}/test/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Clerk-User': 'user_A_111111'
      },
      body: JSON.stringify({
        fullName: 'Alice',
        targetRole: 'Dev',
        email: 'invalid-email-string'
      })
    });
    assert(invalidEmailRes.status === 400, 'Invalid email rejected with HTTP 400');
    const invalidEmailData = await invalidEmailRes.json();
    assert(invalidEmailData.error?.message.includes('valid email'), 'Validation error message mentions email');

    const missingNameRes = await fetch(`${baseUrl}/test/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Clerk-User': 'user_A_111111'
      },
      body: JSON.stringify({
        fullName: '',
        targetRole: 'Dev',
        email: 'alice@example.com'
      })
    });
    assert(missingNameRes.status === 400, 'Empty full name rejected with HTTP 400');

  } catch (error) {
    console.error('Isolation Test Suite Exception:', error);
    failed++;
  } finally {
    // Restore mocks
    groqService.generateResume = originalGenerate;
    Resume.prototype.save = originalSave;
    Resume.find = originalFind;
    Resume.findOneAndDelete = originalFindOneAndDelete;
    server.close();
  }

  console.log(`\n========================================`);
  console.log(`Isolation Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runIsolationTests();
