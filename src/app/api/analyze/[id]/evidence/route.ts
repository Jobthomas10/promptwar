import { NextResponse } from 'next/server';
import { MOCK_ANALYSES } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const match = Object.values(MOCK_ANALYSES).find(
    (item) => item.id === params.id
  ) || MOCK_ANALYSES['demo-video-deepfake'];

  return NextResponse.json({
    success: true,
    data: {
      caseId: match.id,
      evidences: match.evidences,
      scores: {
        aiGeneration: match.aiGenerationScore,
        manipulation: match.manipulationScore,
        sourceConsistency: match.sourceConsistencyScore,
        metadataConsistency: match.metadataConsistencyScore
      }
    }
  });
}
