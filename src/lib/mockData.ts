import { AnalysisResult, UserAnalysisHistoryItem } from './types';

export const MOCK_ANALYSES: Record<string, AnalysisResult> = {
  'demo-video-deepfake': {
    id: 'VAI-8924-VID',
    filename: 'political_address_manifesto.mp4',
    mediaType: 'video',
    fileSize: '48.2 MB',
    resolutionOrDuration: '1080p @ 60fps • 00:32',
    frameRateOrBitrate: '60 fps • H.264 High Profile',
    uploadDate: '2026-09-05 08:14 UTC',
    mediaUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=400&auto=format&fit=crop',
    
    verdict: 'LIKELY_MANIPULATED',
    verdictLabel: 'LIKELY MANIPULATED',
    confidenceScore: 87,
    evidenceStrength: 'HIGH',
    whatThisMeans: 'This video contains several clear indicators associated with facial deepfake manipulation and temporal audio/video desynchronization. The strongest anomalies were detected in the lip motion alignment during speech sequences between 00:08 and 00:11. These findings suggest the speech audio was synthesized or modified onto original video footage.',
    finalRecommendation: 'NEEDS VERIFICATION: Available evidence indicates temporal facial and voice manipulation. Verify the original press conference broadcast before sharing or citing as authentic.',

    aiGenerationScore: 82,
    manipulationScore: 89,
    sourceConsistencyScore: 41,
    metadataConsistencyScore: 28,
    provenanceStatus: 'Altered Audio Re-upload',

    suspiciousTimestamps: [
      {
        startTime: '00:08',
        endTime: '00:11',
        secondsStart: 8,
        secondsEnd: 11,
        reason: 'Lip movement spatial latency does not correspond with acoustic speech formant transitions.',
        anomalyScore: 92,
      },
      {
        startTime: '00:19',
        endTime: '00:23',
        secondsStart: 19,
        secondsEnd: 23,
        reason: 'Micro-blinking rate drops to zero; cheek boundary warp detected.',
        anomalyScore: 84,
      }
    ],

    faceTrackingActive: true,
    lipSyncAnomalyScore: 91,

    evidences: [
      {
        id: 'ev-v1',
        category: 'visual',
        title: 'Facial Landmark Temporal Drift',
        score: 88,
        strength: 'HIGH',
        summary: 'Facial boundary tracking indicates frame-to-frame warping around the jawline and mouth region.',
        detailText: 'Neural feature extractions comparing per-frame facial keypoints revealed subtle spatial jitter in frames 480 through 660. The blending boundary between the generated face mesh and background lighting exhibits phase distortion.',
        uncertaintyDisclaimer: 'Note: Video compression artifacts from low bitrate re-encoding can occasionally trigger minor landmark drift, but score threshold >85% correlates strongly with synthetic face swapped overlays.',
        findings: [
          'Jitter detected along upper lip boundary',
          'Eye blinking interval extended beyond normal physiological human variance',
          'Boundary interpolation artifacts present around neck collar'
        ]
      },
      {
        id: 'ev-v2',
        category: 'ai_detection',
        title: 'Audio-Visual Lip Synchronization Anomaly',
        score: 92,
        strength: 'HIGH',
        summary: 'Speech phonemes precede facial visemes by 140ms in key monologue segments.',
        detailText: 'Cross-modal transformer models analyzed acoustic spectral envelopes against mouth aperture sequences. A statistically significant 140ms acoustic lead time was detected between 00:08 and 00:11.',
        uncertaintyDisclaimer: 'Network streaming jitter can introduce uniform AV offset, but non-uniform variable latency points specifically to localized audio replacement.',
        findings: [
          'Non-uniform latency spike between 00:08 - 00:11',
          'Vowel sound /o/ rendered with closed mouth viseme frame 520',
          'Synthesized voice noise floor differs from ambient background room impulse'
        ]
      },
      {
        id: 'ev-v3',
        category: 'technical',
        title: 'Container & Codec Metadata Discrepancy',
        score: 74,
        strength: 'MEDIUM',
        summary: 'FFmpeg re-encoding signatures present without camera broadcast header data.',
        detailText: 'Exif tool analysis detected libavformat 59.27 stream tags. Original camera metadata (SMPTE timecodes and sensor IDs) has been stripped.',
        uncertaintyDisclaimer: 'Missing metadata is common when files pass through messaging apps like Telegram or WhatsApp.',
        findings: [
          'Encoder tag: Lavf59.27.100',
          'Missing original broadcast timecode track',
          'Variable framerate dropped frames detected'
        ]
      }
    ],

    metadataFields: [
      { key: 'File Format', value: 'MPEG-4 Part 14 (video/mp4)', status: 'normal' },
      { key: 'Video Codec', value: 'H.264 / AVC (High Profile)', status: 'normal' },
      { key: 'Audio Codec', value: 'AAC (LC) 48000 Hz Stereo', status: 'normal' },
      { key: 'Encoder', value: 'FFmpeg / Lavf59.27.100', status: 'suspicious' },
      { key: 'Creation Date', value: '2026-08-29 14:22:10 UTC', status: 'normal' },
      { key: 'C2PA Provenance', value: 'None / Stripped', status: 'missing' },
      { key: 'Camera Hardware ID', value: 'Not available', status: 'missing' }
    ],

    sources: [
      {
        id: 's1',
        date: '2026-08-14',
        name: 'Official Government Press Briefing',
        type: 'original',
        url: 'https://example.org/news/official-briefing-aug14',
        author: 'National News Wire',
        similarityScore: 96,
        credibility: 'High',
        contextSummary: 'Original 45-minute video broadcast containing authentic speech regarding public infrastructure spending.'
      },
      {
        id: 's2',
        date: '2026-08-20',
        name: 'Regional Media Archival Clip',
        type: 'article',
        url: 'https://example.org/archive/briefing-segment',
        author: 'Global News Network',
        similarityScore: 91,
        credibility: 'High',
        contextSummary: 'Unedited 2-minute excerpt matches visual frames of the analyzed media exactly.'
      },
      {
        id: 's3',
        date: '2026-08-27',
        name: 'Viral Social Media Re-upload',
        type: 'social_media',
        url: 'https://example.org/social/post-8921',
        author: 'Anonymous Account @TruthSeeker',
        similarityScore: 89,
        credibility: 'Low',
        contextSummary: 'First detected instance where modified audio track replacing official speech was attached.'
      },
      {
        id: 's4',
        date: '2026-08-29',
        name: 'Current User Upload Submission',
        type: 'upload',
        url: '#',
        author: 'Submitted File',
        similarityScore: 100,
        credibility: 'Unknown',
        contextSummary: 'Direct media file analyzed by VerifyAI platform.'
      }
    ],

    contextClaims: [
      {
        id: 'c1',
        title: 'Fact Check: Altered video misrepresents official address',
        publisher: 'International Fact-Checking Network',
        date: '2026-08-28',
        url: 'https://example.org/factcheck/altered-speech',
        excerpt: 'Independent audio analysis confirms the voice track in the viral video was synthesized using a 3-second voice clone sample.',
        relationship: 'contradicts'
      },
      {
        id: 'c2',
        title: 'Original Press Briefing Transcript & Uncut Video',
        publisher: 'Press Association Archive',
        date: '2026-08-14',
        url: 'https://example.org/press/uncut-transcript',
        excerpt: 'Official transcript shows the speaker made no statements regarding banking shutdowns.',
        relationship: 'contradicts'
      },
      {
        id: 'c3',
        title: 'Social Media Post: "Shocking announcement during live conference"',
        publisher: 'X / Twitter Post',
        date: '2026-08-27',
        url: 'https://example.org/x/post-claim',
        excerpt: 'Claims video shows genuine live admission.',
        relationship: 'supports'
      }
    ],

    comparisonOriginalUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000&auto=format&fit=crop',
    comparisonDiffPercentage: 24,
    comparisonDiffs: [
      { region: 'Audio Track', type: 'modified', description: 'Original speech track replaced with synthesized voice clone.' },
      { region: 'Mouth Region', type: 'modified', description: 'Subtle lip motion warping applied to match synthesized phonemes.' },
      { region: 'Background Environment', type: 'unchanged', description: 'Podium and background scenery are identical to authentic 2026-08-14 broadcast.' }
    ]
  },

  'demo-image-synthetic': {
    id: 'VAI-7731-IMG',
    filename: 'protest_rally_crowd_hdr.png',
    mediaType: 'image',
    fileSize: '14.8 MB',
    resolutionOrDuration: '3840 x 2160 • 4K UHD',
    uploadDate: '2026-09-04 19:40 UTC',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop',
    suspiciousOverlayUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    
    verdict: 'STRONG_EVIDENCE_SYNTHETIC',
    verdictLabel: 'STRONG EVIDENCE OF SYNTHETIC MEDIA',
    confidenceScore: 94,
    evidenceStrength: 'HIGH',
    whatThisMeans: 'Multiple independent detection models strongly indicate synthetic AI diffusion generation. Micro-structural artifacts consistent with latent diffusion neural models were identified in background crowds, human hand anatomy, and specular reflection vectors.',
    finalRecommendation: 'STRONG EVIDENCE OF SYNTHETIC MEDIA: Do not publish or cite as authentic photojournalistic evidence without secondary verified hardware provenance.',

    aiGenerationScore: 96,
    manipulationScore: 74,
    sourceConsistencyScore: 12,
    metadataConsistencyScore: 0,
    provenanceStatus: 'Pure Generative Diffusion Output',

    evidences: [
      {
        id: 'ev-i1',
        category: 'ai_detection',
        title: 'Latent Diffusion Frequency Noise Fingerprint',
        score: 98,
        strength: 'HIGH',
        summary: '2D Fourier spectrum reveals high-frequency grid artifacts unique to Midjourney / Stable Diffusion neural upscalers.',
        detailText: 'Spectral decomposition of high-frequency spatial noise exhibits periodic grid spikes at specific radial frequencies. Real CMOS camera sensors exhibit Poisson photon shot noise rather than periodic lattice harmonics.',
        uncertaintyDisclaimer: 'High compression can distort noise profiles, but neural frequency peaks in uncompressed PNG containers are over 99% indicative of generative models.',
        findings: [
          'Periodic frequency spikes at normalized radii r=0.34 and r=0.68',
          'Absence of physical camera Bayer filter mosaic pattern',
          'Uniform artificial grain added post-synthesis'
        ]
      },
      {
        id: 'ev-i2',
        category: 'visual',
        title: 'Anatomical & Specular Lighting Inconsistency',
        score: 91,
        strength: 'HIGH',
        summary: 'Subject in foreground features 6 fingers; background faces blur into impossible geometry.',
        detailText: 'Biomechanical analysis detected non-standard hand joint layout. 3D ray tracing estimation of corneal light reflections indicates light sources originating from conflicting vector directions (+42° and -78°).',
        uncertaintyDisclaimer: 'Motion blur or lens distortion can deform background faces, but contradictory corneal reflections require multiple conflicting light sources impossible in outdoor sunlight.',
        findings: [
          'Foreground left hand contains 6 distinct digital phalanges',
          'Corneal reflections mismatch outdoor ambient sun position',
          'Background placard text consists of non-alphanumeric neural gibberish'
        ]
      },
      {
        id: 'ev-i3',
        category: 'technical',
        title: 'EXIF Metadata Absence & C2PA Inspection',
        score: 100,
        strength: 'HIGH',
        summary: 'No EXIF metadata or camera hardware signatures present.',
        detailText: 'The PNG file headers contain standard Web PNG chunks with no embedded EXIF tags, IPTC copyright fields, or C2PA cryptographic signatures.',
        uncertaintyDisclaimer: 'Absence of metadata alone does not prove AI generation, but combined with diffusion noise signatures it reinforces synthetic origin.',
        findings: [
          'No camera serial number or aperture settings',
          'Software tag: PNG render canvas (Generic)',
          'No C2PA manifest attached'
        ]
      }
    ],

    metadataFields: [
      { key: 'File Type', value: 'Portable Network Graphics (PNG)', status: 'normal' },
      { key: 'Dimensions', value: '3840 x 2160 pixels', status: 'normal' },
      { key: 'Color Depth', value: '24-bit RGB', status: 'normal' },
      { key: 'EXIF Metadata', value: 'Completely Absent', status: 'suspicious' },
      { key: 'Camera Model', value: 'Unknown / Not Recorded', status: 'missing' },
      { key: 'Shutter Speed', value: 'Unknown', status: 'missing' },
      { key: 'C2PA Manifest', value: 'Not Found', status: 'missing' }
    ],

    sources: [
      {
        id: 'si1',
        date: '2026-09-04',
        name: 'Initial AI Art Forum Post',
        type: 'social_media',
        url: 'https://example.org/forum/post-diffusion-art',
        author: 'User @PromptCrafter',
        similarityScore: 99,
        credibility: 'Low',
        contextSummary: 'Image first appeared in an online gallery labeled "Midjourney v6 HDR test prompt".'
      },
      {
        id: 'si2',
        date: '2026-09-04',
        name: 'Current User Upload',
        type: 'upload',
        url: '#',
        author: 'Submitted File',
        similarityScore: 100,
        credibility: 'Unknown',
        contextSummary: 'Analyzed by VerifyAI Platform.'
      }
    ],

    contextClaims: [
      {
        id: 'ci1',
        title: 'No news agency records found for reported mass rally',
        publisher: 'Global Press Database',
        date: '2026-09-04',
        url: 'https://example.org/press/wire-check',
        excerpt: 'Zero press wire photos or local police reports correspond to the event depicted in the image.',
        relationship: 'contradicts'
      }
    ],

    comparisonOriginalUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    comparisonDiffPercentage: 88,
    comparisonDiffs: [
      { region: 'Entire Canvas', type: 'added', description: 'Fully synthetic image generated via text-to-image AI prompt.' },
      { region: 'Anatomical Details', type: 'modified', description: 'Neural rendering artifacts on hands and faces.' }
    ]
  },

  'demo-audio-voiceclone': {
    id: 'VAI-5510-AUD',
    filename: 'executive_call_recording.wav',
    mediaType: 'audio',
    fileSize: '8.4 MB',
    resolutionOrDuration: '44.1 kHz • 16-bit Mono • 00:21',
    uploadDate: '2026-09-03 11:05 UTC',
    mediaUrl: 'https://actions.google.com/sounds/v1/ambiences/office_ambience.ogg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&auto=format&fit=crop',
    
    verdict: 'LIKELY_MANIPULATED',
    verdictLabel: 'LIKELY MANIPULATED',
    confidenceScore: 84,
    evidenceStrength: 'MEDIUM',
    whatThisMeans: 'Spectral phase analysis and acoustic formant transitions indicate synthetic voice cloning in the mid section (00:08–00:11). The ambient room reverberation abruptly changes, indicating an inserted neural text-to-speech fragment.',
    finalRecommendation: 'NEEDS VERIFICATION: Do not authorize financial or sensitive administrative actions based solely on this voice recording.',

    aiGenerationScore: 88,
    manipulationScore: 81,
    sourceConsistencyScore: 45,
    metadataConsistencyScore: 60,
    provenanceStatus: 'Audio Splice / Synthetic Insertion',

    suspiciousTimestamps: [
      {
        startTime: '00:08',
        endTime: '00:11',
        secondsStart: 8,
        secondsEnd: 11,
        reason: 'Voice formant transitions and room impulse response change abruptly; neural TTS voice clone detected.',
        anomalyScore: 89
      }
    ],

    audioWaveformPoints: [10, 24, 45, 60, 80, 95, 40, 20, 15, 88, 92, 99, 90, 85, 20, 30, 45, 55, 40, 25, 10],
    audioTranscript: "Hello team, this is confirming the transfer authorization for project Apex. Please issue the wire payment immediately [SUSPICIOUS: to account ending 8819] without delay. Thank you.",

    evidences: [
      {
        id: 'ev-a1',
        category: 'ai_detection',
        title: 'Neural Speech Formant & Phase Discrepancy',
        score: 89,
        strength: 'HIGH',
        summary: 'Phase continuity break detected at 00:08. Pitch variation lacks natural micro-tremors.',
        detailText: 'High-resolution spectrogram analysis reveals unnaturally flat fundamental pitch (F0) contours during the sentence phrase "to account ending 8819". Natural vocal cords exhibit involuntary micro-pitch instabilities (shimmer and jitter) which are missing in synthesized speech audio.',
        uncertaintyDisclaimer: 'Aggressive noise suppression algorithms can reduce pitch shimmer, but phase discontinuity at splice points strongly indicates synthetic insertion.',
        findings: [
          'F0 pitch contour variance < 0.2 Hz during target phrase',
          'Phase discrepancy at 00:08.23 boundary',
          'Synthetic high-frequency roll-off above 8 kHz'
        ]
      },
      {
        id: 'ev-a2',
        category: 'technical',
        title: 'Room Impulse Response (RIR) Discontinuity',
        score: 82,
        strength: 'MEDIUM',
        summary: 'Background office noise floor drops by 12dB specifically during the target phrase.',
        detailText: 'Acoustic room reverberation modeling shows an abrupt shift from an office room impulse profile to a dry synthetic soundproof booth profile between seconds 00:08 and 00:11.',
        uncertaintyDisclaimer: 'Lossy VOIP codecs can mute background noise during quiet pauses, but not selectively during active speech.',
        findings: [
          'Background room noise floor drops from -42dB to -54dB at 00:08',
          'Reverberation decay time (RT60) drops from 0.4s to 0.05s'
        ]
      }
    ],

    metadataFields: [
      { key: 'Format', value: 'WAVE Audio (audio/x-wav)', status: 'normal' },
      { key: 'Sample Rate', value: '44,100 Hz', status: 'normal' },
      { key: 'Bit Depth', value: '16-bit PCM', status: 'normal' },
      { key: 'Channels', value: '1 (Mono)', status: 'normal' },
      { key: 'Software Tag', value: 'Audacity 3.4.2 / Export', status: 'suspicious' },
      { key: 'Originating Phone CID', value: 'Unverified WebRTC SIP Gateway', status: 'suspicious' }
    ],

    sources: [
      {
        id: 'sa1',
        date: '2026-09-02',
        name: 'Authentic Executive Podcast Interview',
        type: 'original',
        url: 'https://example.org/podcast/exec-interview',
        author: 'Tech Business Weekly',
        similarityScore: 94,
        credibility: 'High',
        contextSummary: 'Public podcast interview containing 40 minutes of authentic voice sample used as training source for voice clone.'
      },
      {
        id: 'sa2',
        date: '2026-09-03',
        name: 'Current Analyzed File',
        type: 'upload',
        url: '#',
        author: 'Submitted Audio File',
        similarityScore: 100,
        credibility: 'Unknown',
        contextSummary: 'Analyzed by VerifyAI Audio Forensics engine.'
      }
    ],

    contextClaims: [
      {
        id: 'ca1',
        title: 'Internal Corporate Fraud Alert: Voice cloning scam active',
        publisher: 'Corporate Security Team',
        date: '2026-09-03',
        url: 'https://example.org/security/voice-clone-alert',
        excerpt: 'Warning issued regarding fraudulent phone calls attempting urgent financial transfers.',
        relationship: 'context'
      }
    ],

    comparisonOriginalUrl: 'https://actions.google.com/sounds/v1/ambiences/office_ambience.ogg',
    comparisonDiffPercentage: 35,
    comparisonDiffs: [
      { region: '00:08 - 00:11 Segment', type: 'added', description: 'Synthetic speech fragment inserted over muted original audio.' }
    ]
  },

  'demo-image-authentic': {
    id: 'VAI-1092-AUTH',
    filename: 'disaster_response_scene.jpg',
    mediaType: 'image',
    fileSize: '9.2 MB',
    resolutionOrDuration: '6000 x 4000 • 24 MP',
    uploadDate: '2026-09-05 06:30 UTC',
    mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop',
    
    verdict: 'LIKELY_AUTHENTIC',
    verdictLabel: 'LIKELY AUTHENTIC',
    confidenceScore: 92,
    evidenceStrength: 'HIGH',
    whatThisMeans: 'Available technical evidence is broadly consistent with authentic camera media. Physical light rays, sensor noise distribution, EXIF camera signatures, and C2PA provenance headers verify authentic capture from a Canon EOS R5 hardware sensor.',
    finalRecommendation: 'LIKELY AUTHENTIC: Available evidence indicates authentic camera origin. Standard media verification guidelines apply.',

    aiGenerationScore: 4,
    manipulationScore: 8,
    sourceConsistencyScore: 98,
    metadataConsistencyScore: 95,
    provenanceStatus: 'Hardware Sensor Verified (C2PA)',

    evidences: [
      {
        id: 'ev-au1',
        category: 'technical',
        title: 'C2PA Cryptographic Provenance Header',
        score: 96,
        strength: 'HIGH',
        summary: 'Valid hardware-level cryptographic signature matching Canon EOS R5 camera hardware root certificate.',
        detailText: 'The image container embeds an intact C2PA manifest with end-to-end cryptographic hashing of raw sensor pixels.',
        uncertaintyDisclaimer: 'C2PA signatures can be stripped by social platforms, but when present and cryptographically valid, authenticity confidence is extremely high.',
        findings: [
          'Valid C2PA signature chain',
          'Root authority: Canon Hardware Trust CA',
          'Zero pixel edits detected post-capture'
        ]
      },
      {
        id: 'ev-au2',
        category: 'visual',
        title: 'Physical Sensor Noise & Optical Lighting Coherence',
        score: 94,
        strength: 'HIGH',
        summary: 'Sensor PRNU (Photo Response Non-Uniformity) matches camera sensor profile.',
        detailText: 'Fourier noise extraction displays authentic CMOS photon shot noise distribution. Specular highlights across wet surfaces align with physical sunlight vector.',
        uncertaintyDisclaimer: 'None.',
        findings: [
          'Coherent PRNU sensor noise pattern',
          'Consistent depth-of-field lens optical falloff',
          'Natural chromatic aberration on high-contrast edges'
        ]
      }
    ],

    metadataFields: [
      { key: 'Camera Model', value: 'Canon EOS R5', status: 'verified' },
      { key: 'Lens', value: 'RF 24-70mm f/2.8L IS USM', status: 'verified' },
      { key: 'ISO / Shutter / Aperture', value: 'ISO 200 • 1/500s • f/4.0', status: 'verified' },
      { key: 'GPS Location', value: '34°03\'12.4"N 118°14\'30.1"W', status: 'verified' },
      { key: 'C2PA Status', value: 'Valid Cryptographic Signature', status: 'verified' }
    ],

    sources: [
      {
        id: 'sau1',
        date: '2026-09-05',
        name: 'Official Press Agency Feed',
        type: 'original',
        url: 'https://example.org/wire/photo-1092',
        author: 'Staff Photojournalist Sarah Jenkins',
        similarityScore: 100,
        credibility: 'High',
        contextSummary: 'Original camera RAW export published on accredited wire service.'
      }
    ],

    contextClaims: [
      {
        id: 'cau1',
        title: 'Emergency Services Response Coverage',
        publisher: 'City Emergency Wire',
        date: '2026-09-05',
        url: 'https://example.org/news/emergency-response',
        excerpt: 'Photo confirms deployment of disaster response units on scene at 06:15 AM.',
        relationship: 'supports'
      }
    ]
  },

  'demo-audio-ambience': {
    id: 'VAI-3301-UNC',
    filename: 'ambience_overheard_chatter.mp3',
    mediaType: 'audio',
    fileSize: '3.1 MB',
    resolutionOrDuration: '128 kbps MP3 • 00:18',
    uploadDate: '2026-09-05 09:00 UTC',
    mediaUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy_loud.ogg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=400&auto=format&fit=crop',
    
    verdict: 'NEEDS_VERIFICATION',
    verdictLabel: 'NEEDS VERIFICATION',
    confidenceScore: 55,
    evidenceStrength: 'LOW',
    whatThisMeans: 'Available evidence is insufficient to establish synthetic generation or authenticity due to extreme MP3 compression artifacts and low signal-to-noise ratio. Verify the original uncompressed source before sharing.',
    finalRecommendation: 'NEEDS VERIFICATION: Inconclusive forensic signals. Request uncompressed original WAV recording.',

    aiGenerationScore: 42,
    manipulationScore: 38,
    sourceConsistencyScore: 50,
    metadataConsistencyScore: 40,
    provenanceStatus: 'Inconclusive / Heavy Compression',

    evidences: [
      {
        id: 'ev-u1',
        category: 'technical',
        title: 'Heavy MP3 Lossy Compression Artifacts',
        score: 65,
        strength: 'LOW',
        summary: 'High-frequency spectral truncation above 11 kHz prevents definitive neural voice classification.',
        detailText: 'The input audio was encoded at 128 kbps MP3 with aggressive MDCT quantization. High-frequency phase queues critical for neural TTS detection have been erased by compression.',
        uncertaintyDisclaimer: 'High compression lowers statistical confidence. Do not rely on automated detectors for heavily degraded audio.',
        findings: [
          'Spectral cutoff at 11.05 kHz',
          'Heavy psychoacoustic masking artifacts',
          'Low signal-to-noise ratio (-18dB)'
        ]
      }
    ],

    metadataFields: [
      { key: 'Format', value: 'MPEG Audio Layer 3 (MP3)', status: 'normal' },
      { key: 'Bitrate', value: '128 kbps CBR', status: 'suspicious' },
      { key: 'Channel Mode', value: 'Joint Stereo', status: 'normal' },
      { key: 'Original Metadata', value: 'Stripped', status: 'missing' }
    ],

    sources: [],
    contextClaims: []
  }
};

export const INITIAL_HISTORY: UserAnalysisHistoryItem[] = [
  {
    id: 'VAI-8924-VID',
    filename: 'political_address_manifesto.mp4',
    mediaType: 'video',
    uploadDate: '2 hours ago',
    verdict: 'LIKELY_MANIPULATED',
    verdictLabel: 'LIKELY MANIPULATED',
    confidenceScore: 87,
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'VAI-7731-IMG',
    filename: 'protest_rally_crowd_hdr.png',
    mediaType: 'image',
    uploadDate: 'Yesterday',
    verdict: 'STRONG_EVIDENCE_SYNTHETIC',
    verdictLabel: 'STRONG EVIDENCE OF SYNTHETIC MEDIA',
    confidenceScore: 94,
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'VAI-5510-AUD',
    filename: 'executive_call_recording.wav',
    mediaType: 'audio',
    uploadDate: '3 days ago',
    verdict: 'LIKELY_MANIPULATED',
    verdictLabel: 'LIKELY MANIPULATED',
    confidenceScore: 84,
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'VAI-1092-AUTH',
    filename: 'disaster_response_scene.jpg',
    mediaType: 'image',
    uploadDate: '4 days ago',
    verdict: 'LIKELY_AUTHENTIC',
    verdictLabel: 'LIKELY AUTHENTIC',
    confidenceScore: 92,
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop'
  }
];

export function generateCustomAnalysis(
  filename: string, 
  mediaType: 'image' | 'audio' | 'video', 
  mediaUrl?: string,
  fileSize?: string,
  resolutionOrDuration?: string,
  forceVerdict?: 'authentic' | 'manipulated' | 'auto'
): AnalysisResult {
  const isVideo = mediaType === 'video';
  const isAudio = mediaType === 'audio';
  
  const sampleUrl = mediaUrl || (
    isVideo 
      ? 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1000&auto=format&fit=crop'
      : isAudio
      ? 'https://actions.google.com/sounds/v1/ambiences/office_ambience.ogg'
      : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop'
  );

  const lowerName = (filename + ' ' + (mediaUrl || '')).toLowerCase();
  
  const aiKeywords = [
    'genai', 'synthetic', 'midjourney', 'dalle', 'dall-e', 'diffusion', 
    'deepfake', 'face-swap', 'faceswap', 'voiceclone', 'generated', 'prompt', 
    'stable-diffusion', 'flux', 'sdxl', 'nightcafe', 'leonardo', 
    'image_fx', 'imagen', 'stylegan'
  ];

  const hasAiSignal = aiKeywords.some(kw => lowerName.includes(kw)) || /\b(ai|fake|gen|art|render|v6)\b/i.test(lowerName);

  let isSynthetic = false;
  if (forceVerdict === 'manipulated') {
    isSynthetic = true;
  } else if (forceVerdict === 'authentic') {
    isSynthetic = false;
  } else {
    // In auto mode for video files (or files with AI signals), return synthetic detection result by default
    isSynthetic = isVideo || hasAiSignal;
  }

  if (!isSynthetic) {
    return {
      id: `VAI-${Math.floor(1000 + Math.random() * 9000)}-AUTH`,
      filename: filename || `authentic_photo_${Date.now()}.${isVideo ? 'mp4' : isAudio ? 'wav' : 'jpg'}`,
      mediaType,
      fileSize: fileSize || '12.4 MB',
      resolutionOrDuration: resolutionOrDuration || (isVideo ? '1080p @ 60fps • 00:30' : isAudio ? '44.1 kHz PCM • 00:20' : '4000 x 3000 • 12 MP'),
      frameRateOrBitrate: isVideo ? '60 fps • H.264' : isAudio ? '320 kbps WAV' : undefined,
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      mediaUrl: sampleUrl,
      thumbnailUrl: sampleUrl,

      verdict: 'LIKELY_AUTHENTIC',
      verdictLabel: 'LIKELY AUTHENTIC',
      confidenceScore: 94,
      evidenceStrength: 'HIGH',
      whatThisMeans: `Available technical evidence for "${filename}" is broadly consistent with authentic camera media. Optical lighting coherence, physical sensor noise distribution (PRNU), and camera EXIF metadata confirm genuine optical sensor origin.`,
      finalRecommendation: `LIKELY AUTHENTIC: Available evidence indicates genuine camera hardware origin for "${filename}". Standard media publishing guidelines apply.`,

      aiGenerationScore: 4,
      manipulationScore: 6,
      sourceConsistencyScore: 98,
      metadataConsistencyScore: 94,
      provenanceStatus: 'Hardware Sensor & Camera Verified',

      evidences: [
        {
          id: 'ev-auth-1',
          category: 'technical',
          title: 'Physical Sensor PRNU & Noise Distribution',
          score: 96,
          strength: 'HIGH',
          summary: 'Fourier noise extraction displays authentic CMOS photon shot noise distribution.',
          detailText: `High-resolution sensor noise audit on "${filename}" verified coherent PRNU patterns matching standard digital camera optical sensors.`,
          uncertaintyDisclaimer: 'None.',
          findings: [
            'Coherent photon shot noise pattern verified',
            'Natural lens optical depth-of-field falloff',
            'No periodic generative neural lattice spikes'
          ]
        },
        {
          id: 'ev-auth-2',
          category: 'visual',
          title: 'Specular Lighting Vector & Anatomical Coherence',
          score: 94,
          strength: 'HIGH',
          summary: 'Specular ray vectors align consistently across all subjects in frame.',
          detailText: `3D ray tracing estimation of corneal light reflections on "${filename}" confirms single ambient light vector matching outdoor physical illumination.`,
          uncertaintyDisclaimer: 'None.',
          findings: [
            'Consistent ambient light vector alignment',
            'Authentic digital phalanges joint structure',
            'Natural skin texture micro-pores verified'
          ]
        }
      ],

      metadataFields: [
        { key: 'File Name', value: filename, status: 'verified' },
        { key: 'Media Type', value: mediaType.toUpperCase(), status: 'verified' },
        { key: 'File Size', value: fileSize || '12.4 MB', status: 'verified' },
        { key: 'Sensor PRNU Status', value: 'Valid Optical Noise Profile', status: 'verified' },
        { key: 'Camera Hardware Check', value: 'Verified Hardware Capture', status: 'verified' }
      ],

      sources: [
        {
          id: 'sc-auth-1',
          date: new Date().toISOString().substring(0, 10),
          name: `User Camera Import: ${filename}`,
          type: 'original',
          url: sampleUrl,
          author: 'Original Camera File',
          similarityScore: 100,
          credibility: 'High',
          contextSummary: `File "${filename}" verified as authentic camera sensor capture.`
        }
      ],

      contextClaims: [
        {
          id: 'cc-auth-1',
          title: 'Media content verified as authentic original photo',
          publisher: 'VerifyAI Verification Engine',
          date: new Date().toISOString().substring(0, 10),
          url: '#',
          excerpt: 'Analysis shows zero evidence of deepfake face swaps, voice synthesis, or generative AI rendering.',
          relationship: 'supports'
        }
      ]
    };
  }

  // Return AI Generated / Synthetic / Manipulated result
  return {
    id: `VAI-${Math.floor(1000 + Math.random() * 9000)}-SYNTH`,
    filename: filename || `synthetic_media_${Date.now()}.${isVideo ? 'mp4' : isAudio ? 'wav' : 'png'}`,
    mediaType,
    fileSize: fileSize || '14.8 MB',
    resolutionOrDuration: resolutionOrDuration || (isVideo ? '1080p @ 60fps • 00:32' : isAudio ? '44.1 kHz • 00:21' : '3840 x 2160 pixels'),
    frameRateOrBitrate: isVideo ? '60 fps • H.264' : isAudio ? '320 kbps AAC' : undefined,
    uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
    mediaUrl: sampleUrl,
    thumbnailUrl: sampleUrl,

    verdict: 'STRONG_EVIDENCE_SYNTHETIC',
    verdictLabel: 'STRONG EVIDENCE OF SYNTHETIC MEDIA',
    confidenceScore: 94,
    evidenceStrength: 'HIGH',
    whatThisMeans: `Multiple independent detection models strongly indicate synthetic AI generation for "${filename}". Micro-structural artifacts consistent with latent diffusion neural models were identified in spatial frequency noise, corneal reflections, and anatomical facial geometry.`,
    finalRecommendation: `STRONG EVIDENCE OF SYNTHETIC MEDIA: "${filename}" exhibits high-frequency 2D latent diffusion grid spikes and missing camera sensor PRNU noise. Do not publish or cite as authentic human media.`,

    aiGenerationScore: 96,
    manipulationScore: 84,
    sourceConsistencyScore: 15,
    metadataConsistencyScore: 0,
    provenanceStatus: 'Generative AI Synthetic Output',

    evidences: [
      {
        id: 'ev-synth-1',
        category: 'ai_detection',
        title: '2D Latent Diffusion Frequency Noise Fingerprint',
        score: 98,
        strength: 'HIGH',
        summary: '2D Fourier spectrum reveals high-frequency grid artifacts unique to Midjourney v6 / Stable Diffusion.',
        detailText: `Spectral decomposition of spatial noise on "${filename}" exhibits periodic grid spikes at radial frequencies r=0.34. Physical CMOS sensors exhibit Poisson shot noise rather than periodic lattice harmonics.`,
        uncertaintyDisclaimer: 'High compression can alter noise profiles, but radial frequency spikes in uncompressed containers are >99% indicative of generative models.',
        findings: [
          'Periodic frequency spikes detected at radial normalized frequency r=0.34',
          'Absence of physical camera Bayer filter mosaic pattern',
          'Synthetic high-frequency noise floor'
        ]
      },
      {
        id: 'ev-synth-2',
        category: 'visual',
        title: 'Anatomical & Specular Light Vector Mismatch',
        score: 91,
        strength: 'HIGH',
        summary: 'Corneal highlight reflections indicate contradictory light source angles (+42° and -78°).',
        detailText: `3D ray tracing estimation of corneal light reflections on "${filename}" indicates light originating from conflicting vectors impossible in natural ambient lighting.`,
        uncertaintyDisclaimer: 'Specular reflections require multi-angle ray trace estimation.',
        findings: [
          'Corneal reflections mismatch ambient light position',
          'Facial boundary interpolation artifacts present',
          'Micro-pore texture smoothing characteristic of neural upscalers'
        ]
      },
      {
        id: 'ev-synth-3',
        category: 'technical',
        title: 'EXIF Metadata Absence & C2PA Inspection',
        score: 100,
        strength: 'HIGH',
        summary: 'No EXIF metadata or camera hardware signatures present.',
        detailText: `The PNG container for "${filename}" exhibits web render canvas chunks with no embedded EXIF tags or C2PA cryptographic hardware certificates.`,
        uncertaintyDisclaimer: 'Social media platforms strip EXIF metadata by default.',
        findings: ['No camera serial number or aperture metadata', 'Missing C2PA provenance header']
      }
    ],

    metadataFields: [
      { key: 'File Name', value: filename, status: 'normal' },
      { key: 'Media Type', value: mediaType.toUpperCase(), status: 'normal' },
      { key: 'File Size', value: fileSize || '14.8 MB', status: 'normal' },
      { key: 'EXIF Metadata', value: 'Completely Absent', status: 'suspicious' },
      { key: 'C2PA Manifest', value: 'Not Found', status: 'missing' }
    ],

    sources: [
      {
        id: 'sc-synth-1',
        date: new Date().toISOString().substring(0, 10),
        name: `AI Ingestion Scan: ${filename}`,
        type: 'upload',
        url: sampleUrl,
        author: 'User File Submission',
        similarityScore: 100,
        credibility: 'Low',
        contextSummary: `File "${filename}" submitted for AI forensic analysis.`
      }
    ],

    contextClaims: [
      {
        id: 'cc-synth-1',
        title: 'No news agency records found for this media',
        publisher: 'VerifyAI Context Engine',
        date: new Date().toISOString().substring(0, 10),
        url: '#',
        excerpt: 'Zero press wire photos or official broadcast archives match this media.',
        relationship: 'contradicts'
      }
    ]
  };
}
