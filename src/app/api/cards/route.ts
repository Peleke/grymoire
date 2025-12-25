import { NextResponse } from 'next/server'
import { getAllCards, getCardsByRealm } from '@/lib/cards'
import { Realm } from '@/lib/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const realm = searchParams.get('realm') as Realm | null

  try {
    const cards = realm
      ? await getCardsByRealm(realm)
      : await getAllCards()

    return NextResponse.json({
      success: true,
      count: cards.length,
      cards,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cards' },
      { status: 500 }
    )
  }
}
