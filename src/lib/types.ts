export type MediaType = 'image' | 'audio' | 'video';

export type VerdictType = 
  | 'LIKELY_MANIPULATED'
  | 'STRONG_EVIDENCE_SYNTHETIC'
  | 'LIKELY_AUTHENTIC'
  | 'NEEDS_VERIFICATION'
  | 'INCONCLUSIVE';

export type EvidenceStrength = 'HIGH' | 'MEDIUM' | 'LOW';

export interface EvidenceItem {
  id: string;
  category: 'visual' | 'technical' | 'ai_detection' | 'source' | 'context';
  title: string;
  score: number; // 0-100
  strength: EvidenceStrength;
  summary: string;
  detailText: string;
  uncertaintyDisclaimer: string;
  findings: string[];
}

export interface SourceNode {
  id: string;
  date: string;
  name: string;
  type: 'original' | 'article' | 'social_media' | 'upload';
  url: string;
  author: string;
  similarityScore: number; // 0-100
  credibility: 'High' | 'Medium' | 'Low' | 'Unknown';
  contextSummary: string;
}

export interface ContextClaim {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  excerpt: string;
  relationship: 'supports' | 'contradicts' | 'context' | 'unrelated';
}

export interface MetadataField {
  key: string;
  value: string;
  status: 'normal' | 'suspicious' | 'missing' | 'verified';
}

export interface TimestampSegment {
  startTime: string;
  endTime: string;
  secondsStart: number;
  secondsEnd: number;
  reason: string;
  anomalyScore: number; // 0-100
}

export interface ComparisonDiff {
  region: string;
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  description: string;
}

export interface AnalysisResult {
  id: string;
  filename: string;
  mediaType: MediaType;
  fileSize: string;
  resolutionOrDuration: string;
  frameRateOrBitrate?: string;
  uploadDate: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  
  // High-level Verdict
  verdict: VerdictType;
  verdictLabel: string;
  confidenceScore: number; // 0-100
  evidenceStrength: EvidenceStrength;
  whatThisMeans: string;
  finalRecommendation: string;
  
  // Categorical Breakdown Scores
  aiGenerationScore: number;
  manipulationScore: number;
  sourceConsistencyScore: number;
  metadataConsistencyScore: number;
  provenanceStatus: string;
  
  // Detailed Analysis Data
  evidences: EvidenceItem[];
  metadataFields: MetadataField[];
  suspiciousTimestamps?: TimestampSegment[];
  sources: SourceNode[];
  contextClaims: ContextClaim[];
  
  // Comparison
  comparisonOriginalUrl?: string;
  comparisonDiffPercentage?: number;
  comparisonDiffs?: ComparisonDiff[];

  // Image Specific overlays
  suspiciousOverlayUrl?: string;
  
  // Audio specific
  audioWaveformPoints?: number[];
  audioTranscript?: string;

  // Video specific
  faceTrackingActive?: boolean;
  lipSyncAnomalyScore?: number;
}

export interface UserAnalysisHistoryItem {
  id: string;
  filename: string;
  mediaType: MediaType;
  uploadDate: string;
  verdict: VerdictType;
  verdictLabel: string;
  confidenceScore: number;
  thumbnailUrl?: string;
}
