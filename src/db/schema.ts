import { pgTable, uuid, text, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";

export const registrations = pgTable(
  "registrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull(),
    gameSlug: text("game_slug").notNull(),
    tournamentId: text("tournament_id").notNull(),
    ign: text("ign").notNull(),
    realName: text("real_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    uid: text("uid").notNull(),
    teamName: text("team_name"),
    role: text("role"),
    main: text("main"),
    rank: text("rank"),
    platform: text("platform"),
    experience: text("experience").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("registrations_code_idx").on(t.code),
    uniqueIndex("registrations_uid_tournament_idx").on(t.uid, t.tournamentId),
    index("registrations_tournament_idx").on(t.tournamentId),
  ],
);

export type Registration = typeof registrations.$inferSelect;
