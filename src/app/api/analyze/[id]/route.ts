import { NextResponse } from 'next/server';
import { MOCK_ANALYSES } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  // Find in mock analyses by ID or preset key
  const match = Object.values(MOCK_ANALYSES).find(
    (item) => item.id === id || item.id.toLowerCase() === id.toLowerCase()
  ) || MOCK_ANALYSES['demo-video-deepfake'];

  return NextResponse.json({
    success: true,
    data: match
  });
}
