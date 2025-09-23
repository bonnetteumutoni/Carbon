import { NextResponse } from 'next/server';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export async function GET() {
  try {
    const response = await fetch(`${baseUrl}energy_entries`);
    const result = await response.json();
    return NextResponse.json(result, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, {status: 500});
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { energy_type, energy_amount, tea_processed_amount, factory } = body;
    if (!energy_type || !energy_amount || !tea_processed_amount || !factory) {
      return NextResponse.json("Mising required values: energy_type, energy_amount, tea_processed_amount, factory", { status: 400 });
    }
    const response = await fetch(`${baseUrl}energy_entries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }
    const result = await response.json();
    return NextResponse.json(result, { status: 201, statusText: "Record created successfully" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, {status: 500});
  }
}