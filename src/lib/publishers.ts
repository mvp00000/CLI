/**
 * Data-access helpers for publisher records used by the static catalog pages.
 * These helpers query the local SQLite database at build time and map raw
 * Drizzle rows to the shared app-facing Publisher type.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Returns every publisher in alphabetical order by name.
 *
 * @param db - Database client used to query the publishers table.
 * @returns All publishers mapped to the app-facing Publisher type.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
