// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // TODO: ここでメール送信やDB保存の処理を追加する
    // 例: Resend / SendGrid / Supabase / Airtable など
    console.log('[RSVP]', data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[RSVP ERROR]', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
