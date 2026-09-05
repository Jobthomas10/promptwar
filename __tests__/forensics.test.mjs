import test from 'node:test';
import assert from 'node:assert/strict';

test('Forensic Dataset Integrity - MOCK_ANALYSES Structure', async () => {
  const res = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ presetId: 'demo-video-deepfake' })
  });
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.verdict, 'LIKELY_MANIPULATED');
  assert.equal(json.data.confidenceScore, 87);
  assert.ok(json.data.evidences.length > 0);
});

test('Forensic Classification - Synthetic AI Diffusion Detection', async () => {
  const res = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: 'midjourney_v6_portrait.png',
      mediaType: 'image',
      mediaUrl: 'data:image/png;base64,sample',
      fileSize: '4.2 MB',
      resolutionOrDuration: '3840 x 2160',
      scanProfile: 'manipulated'
    })
  });
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.verdict, 'STRONG_EVIDENCE_SYNTHETIC');
  assert.equal(json.data.verdictLabel, 'STRONG EVIDENCE OF SYNTHETIC MEDIA');
  assert.ok(json.data.confidenceScore >= 88);
  assert.ok(json.data.aiGenerationScore >= 80);
});

test('Forensic Classification - Authentic Camera Photo Verification', async () => {
  const res = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: 'raw_camera_shot.jpg',
      mediaType: 'image',
      mediaUrl: 'data:image/jpeg;base64,sample',
      fileSize: '8.1 MB',
      resolutionOrDuration: '4000 x 3000',
      scanProfile: 'authentic'
    })
  });
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.verdict, 'LIKELY_AUTHENTIC');
  assert.equal(json.data.verdictLabel, 'LIKELY AUTHENTIC');
  assert.ok(json.data.confidenceScore >= 90);
  assert.equal(json.data.provenanceStatus, 'Hardware Sensor & Camera Verified');
});
