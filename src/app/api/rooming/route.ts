import { NextResponse } from 'next/server';
import roomingData from '../../../data/combined_rooming_data.json';

export async function GET() {
  return NextResponse.json(roomingData);
}