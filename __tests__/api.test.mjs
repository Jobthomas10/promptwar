import test from 'node:test';
import assert from 'node:assert/strict';

test('API Ingestion Engine - Endpoint Health & Payload Validation', async () => {
  const res = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: 'test_ai_face.png',
      mediaType: 'image',
      mediaUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      fileSize: '2.5 MB',
      resolutionOrDuration: '1024 x 1024',
      scanProfile: 'auto'
    })
  });

  assert.equal(res.status, 200, 'Endpoint should return 200 OK');
  const json = await res.json();
  assert.equal(json.success, true, 'Response success flag must be true');
  assert.ok(json.data, 'Response must contain data object');
  assert.ok(json.data.id, 'Response data must contain unique ID');
  assert.ok(json.data.verdict, 'Response data must contain verdict');
});

test('API Ingestion Engine - Preset Selection Route', async () => {
  const res = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      presetId: 'demo-image-synthetic'
    })
  });

  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.id, 'VAI-7731-IMG');
  assert.equal(json.data.verdict, 'STRONG_EVIDENCE_SYNTHETIC');
});

test('API Ingestion Engine - Authentic Mode Override', async () => {
  const res = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: 'camera_capture.jpg',
      mediaType: 'image',
      mediaUrl: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      scanProfile: 'authentic'
    })
  });

  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.verdict, 'LIKELY_AUTHENTIC');
});
