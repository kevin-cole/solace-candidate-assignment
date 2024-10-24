import { NextResponse } from 'next/server';
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql } from 'drizzle-orm';
import { or } from 'drizzle-orm/expressions';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term')?.toLowerCase();
    if (!term) {
      console.log(searchParams)
      return NextResponse.json(
        { error: 'Search term required in advocate search' },
        { status: 400 }
      )
    }

    const startsWithTerm = `${term}%`
    const containsSearchTerm = `%${term}%`
    const data =
      await db
            .select()
            .from(advocates)
            .where(
              or(
                sql`${advocates.firstName} ILIKE ${startsWithTerm}`, // ILIKE names
                sql`${advocates.lastName} ILIKE ${startsWithTerm}`, // ILIKE names
                sql`${advocates.city} ILIKE ${startsWithTerm}`, // ILIKE names
                sql`array_to_string("advocates"."specialties", ',') ILIKE ${containsSearchTerm}` // contains search on any specialties (converted to string for search purposes, easier to read than unnest)
              )
            );

    return NextResponse.json({ data });
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: JSON.stringify(e) },
      { status: 400 }
    )
  }
}
