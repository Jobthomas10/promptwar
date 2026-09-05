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
      reportHeader: "VerifyAI MEDIA VERIFICATION REPORT",
      caseId: match.id,
      date: match.uploadDate,
      mediaType: match.mediaType,
      filename: match.filename,
      assessment: match.verdictLabel,
      confidenceScore: match.confidenceScore,
      evidenceSummary: match.whatThisMeans,
      recommendation: match.finalRecommendation,
      fullAnalysis: match
    }
  });
}
