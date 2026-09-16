export interface PrizeTier {
  place: string;
  amount: number;
  note: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  detail: string;
}

export interface Tournament {
  id: string;
  gameSlug: string;
  name: string;
  startDate: string; // ISO date
  regDeadline: string; // ISO date
  checkIn: string;
  teamLabel: string;
  mapsLabel: string;
  formatLines: string[];
  rules: string[];
  schedule: ScheduleItem[];
  prizePool: number;
  prizeBreakdown: PrizeTier[];
  slots: number;
  slotLabel: string;
}

export const TOURNAMENTS: Tournament[] = [
  {
    id: "king-of-iron-fist-open-26",
    gameSlug: "tekken-8",
    name: "King of Iron Fist Open '26",
    startDate: "2026-06-20",
    regDeadline: "2026-06-14",
    checkIn: "10:30 AM local",
    teamLabel: "Solo entry",
    mapsLabel: "Rotating stage list",
    formatLines: [
      "Double-elimination bracket, seeding by registration order and rank",
      "First-to-2 (best of 3 rounds) through pools and winner/loser brackets",
      "Top 8 switches to first-to-3 on the main stage with commentary desk",
      "One character lock per set — counter-pick stage only after a loss",
    ],
    rules: [
      "All players must check in 30 minutes before their pool start",
      "Wireless controllers must be desynced after every set",
      "Blind character selection is available on request before a set",
      "Button-check window of 60 seconds is granted before round one",
      "Stalling to run out the clock is legal; deliberately pausing is a round loss",
      "Coaching is allowed between sets, not during",
    ],
    schedule: [
      { time: "10:30", title: "Player check-in", detail: "Desk A — bring photo ID and your Player ID" },
      { time: "11:30", title: "Pools A–D begin", detail: "Four stations per pool, reported to desk within 5 minutes of finish" },
      { time: "14:00", title: "Winners & losers brackets", detail: "Top two from each pool advance" },
      { time: "17:00", title: "Top 8 main stage", detail: "FT3 sets, full production and crowd seating" },
      { time: "20:00", title: "Grand finals & awards", detail: "Bracket reset rules in effect" },
    ],
    prizePool: 6000,
    prizeBreakdown: [
      { place: "1st", amount: 3000, note: "+ Champion trophy & pro season invite" },
      { place: "2nd", amount: 1800, note: "+ Runner-up medal" },
      { place: "3rd", amount: 1200, note: "+ Podium medal" },
    ],
    slots: 64,
    slotLabel: "fighter slots",
  },
  {
    id: "battlegrounds-championship-s3",
    gameSlug: "bgmi",
    name: "Battlegrounds Championship · Season 3",
    startDate: "2026-07-04",
    regDeadline: "2026-06-28",
    checkIn: "2:00 PM local",
    teamLabel: "Squad of 4",
    mapsLabel: "Erangel · Miramar · Sanhok",
    formatLines: [
      "16 squads, one lobby — cumulative points across 4 matches",
      "Points: 15 per win with 1 point per elimination, placement scaled to 16th",
      "Maps run Erangel, Miramar, Erangel, Sanhok with a 10-minute swap break",
      "Top 4 squads qualify for the Season 3 LAN finale",
    ],
    rules: [
      "Devices must run the latest game build — emulators are disqualifying",
      "Screenshots of final rank screens are mandatory after every match",
      "One registered substitute may be fielded between matches only",
      "Teaming outside your squad or stream-sniping results in instant removal",
      "The IGL phone line must stay reachable for admin calls",
      "Unsportsmanlike conduct in all-chat is penalized 10 points",
    ],
    schedule: [
      { time: "14:00", title: "Lobby check-in", detail: "Custom room codes sent to registered IGLs" },
      { time: "15:00", title: "Match 1 — Erangel", detail: "Warm-up lobby opens 10 minutes prior" },
      { time: "16:00", title: "Match 2 — Miramar", detail: "Substitutions allowed before plane path lock" },
      { time: "17:00", title: "Match 3 — Erangel", detail: "Standings published during the 10-minute break" },
      { time: "18:00", title: "Match 4 — Sanhok + awards", detail: "Final map, then live podium ceremony" },
    ],
    prizePool: 6000,
    prizeBreakdown: [
      { place: "1st", amount: 3000, note: "+ Season 3 champion jerseys" },
      { place: "2nd", amount: 1800, note: "+ LAN finale qualification" },
      { place: "3rd", amount: 1200, note: "+ In-game title pack" },
    ],
    slots: 16,
    slotLabel: "squad slots",
  },
  {
    id: "klassic-kombat-cup",
    gameSlug: "mortal-kombat",
    name: "Klassic Kombat Cup",
    startDate: "2026-07-05",
    regDeadline: "2026-06-29",
    checkIn: "11:00 AM local",
    teamLabel: "Solo entry",
    mapsLabel: "Kommunity stage vote",
    formatLines: [
      "Double-elimination bracket, first-to-3 sets from round one",
      "Character variation lock per set; loser may switch fighter",
      "Fatalities are mandatory on match point — organizers insist",
      "Top 4 play on the main stage under the lights",
    ],
    rules: [
      "Check in at the kombat desk at least 30 minutes before pools",
      "Any licensed controller is fine — turbo and macros are banned",
      "Losing player may request stage or fighter switch between games",
      "Mid-set pauses that aren't stick failures forfeit the game",
      "Excessive taunting past the ranked threshold gets one warning",
      "All disputes go to the head TO; their call is final",
    ],
    schedule: [
      { time: "11:00", title: "Kombatant check-in", detail: "Verify WB Games ID at the desk" },
      { time: "12:00", title: "Bracket round 1–2", detail: "Four off-stream stations running in parallel" },
      { time: "14:30", title: "Quarterfinals", detail: "Two streamed sets in parallel" },
      { time: "16:30", title: "Semifinals", detail: "Main stage with caster desk" },
      { time: "18:00", title: "Grand finals & podium", detail: "Fatality showcase closes the night" },
    ],
    prizePool: 3500,
    prizeBreakdown: [
      { place: "1st", amount: 1800, note: "+ Klassic Cup trophy" },
      { place: "2nd", amount: 1000, note: "+ Runner-up medal" },
      { place: "3rd", amount: 700, note: "+ Kombat gear pack" },
    ],
    slots: 48,
    slotLabel: "kombatant slots",
  },
  {
    id: "operation-triple-threat-4v4",
    gameSlug: "call-of-duty",
    name: "Operation Triple Threat — 4v4 Clash",
    startDate: "2026-07-12",
    regDeadline: "2026-07-06",
    checkIn: "9:30 AM local",
    teamLabel: "Squad of 4",
    mapsLabel: "Hardpoint · S&D · Control",
    formatLines: [
      "16 teams, double-elimination — best of 3 series until finals",
      "Modes rotate Hardpoint → Search & Destroy → Control per map",
      "Upper and lower bracket finals are best of 5",
      "Map veto: higher seed picks first, A-B-A snake draft",
    ],
    rules: [
      "CDL-style ruleset with the published competitive settings build",
      "Rosters lock at registration; one emergency transfer day is allowed",
      "All weapons, perks and equipment follow the current GA list",
      "Technical timeouts are capped at 5 minutes per team per series",
      "Players must sit in the designated team area while live",
      "Any proof of exploiting out-of-map glitches forfeits the map",
    ],
    schedule: [
      { time: "09:30", title: "Team check-in", detail: "Captains confirm rosters and hardware" },
      { time: "10:30", title: "Upper bracket R1", detail: "Four stations, BO3 series" },
      { time: "13:30", title: "Upper semis & lower R1", detail: "Stations A/B are streamed" },
      { time: "16:30", title: "Bracket finals", detail: "Upper and lower — best of 5" },
      { time: "19:00", title: "Grand final & medals", detail: "Optional bracket reset series" },
    ],
    prizePool: 4000,
    prizeBreakdown: [
      { place: "1st", amount: 2000, note: "+ Operation champion patches" },
      { place: "2nd", amount: 1200, note: "+ Silver medals" },
      { place: "3rd", amount: 800, note: "+ Bronze medals" },
    ],
    slots: 16,
    slotLabel: "team slots",
  },
  {
    id: "booyah-blitz-cup",
    gameSlug: "free-fire",
    name: "Booyah Blitz Cup",
    startDate: "2026-07-19",
    regDeadline: "2026-07-13",
    checkIn: "1:00 PM local",
    teamLabel: "Squad of 4",
    mapsLabel: "Bermuda · Alpine · Purgatory",
    formatLines: [
      "12 squads, round-robin lobby — 6 matches in one afternoon",
      "Booyah bonus points plus kill multipliers keep every match alive",
      "Maps cycle Bermuda ×2, Alpine ×2, Purgatory ×2",
      "Highest total score takes the cup — no elimination until the end",
    ],
    rules: [
      "Latest patch required; jailbroken or rooted devices are not permitted",
      "Only registered UIDs may enter the custom lobby",
      "Disconnects before the first circle may be replayed once per squad",
      "Deliberately delaying lobby start costs 5 points",
      "Character skill combinations follow the published restrictions list",
      "All squads must stream or screen-share one member during play",
    ],
    schedule: [
      { time: "13:00", title: "Squad check-in", detail: "Lobby credentials sent to IGLs" },
      { time: "14:00", title: "Matches 1–2 — Bermuda", detail: "Back-to-back drops, 5-minute turnarounds" },
      { time: "15:30", title: "Matches 3–4 — Alpine", detail: "Mid-event standings shown on the big screen" },
      { time: "17:00", title: "Matches 5–6 — Purgatory", detail: "Final stretch — every elimination counts" },
      { time: "18:30", title: "Awards & Booyah wall", detail: "Podium, highlights reel and MVP reveal" },
    ],
    prizePool: 2500,
    prizeBreakdown: [
      { place: "1st", amount: 1200, note: "+ Booyah Cup trophy" },
      { place: "2nd", amount: 800, note: "+ Elite passes for the squad" },
      { place: "3rd", amount: 500, note: "+ Diamond voucher pack" },
    ],
    slots: 12,
    slotLabel: "squad slots",
  },
  {
    id: "king-of-iron-fist-classic",
    gameSlug: "tekken-7",
    name: "King of Iron Fist Classic",
    startDate: "2026-07-26",
    regDeadline: "2026-07-20",
    checkIn: "10:00 AM local",
    teamLabel: "Solo entry",
    mapsLabel: "Rotating stage list",
    formatLines: [
      "Double-elimination bracket honoring the classic FGC ruleset",
      "First-to-2 sets through the bracket; grand finals are first-to-3",
      "Stage select by mutual agreement or random on disagreement",
      "Loser of each game may switch character; winner is locked",
    ],
    rules: [
      "Check in 30 minutes before your first scheduled pool",
      "Any stick, pad or hitbox is welcome — macros are banned",
      "Saver enforced: accidental pauses award the round to the opponent",
      "Costume overrides that obscure hit-effects are not allowed",
      "Bracket matches not reported within 10 minutes risk double DQ",
      "Bring your own converter if your hardware needs one",
    ],
    schedule: [
      { time: "10:00", title: "Player check-in", detail: "Verify BNID and controller at Desk B" },
      { time: "11:00", title: "Pools wave 1", detail: "Seeds split across six stations" },
      { time: "13:00", title: "Pools wave 2 + bracket lock", detail: "Live bracket published to the venue screens" },
      { time: "15:00", title: "Top 16 single stream", detail: "Commentated from the main stage" },
      { time: "18:30", title: "Grand finals & trophy", detail: "Classic trophy ceremony closes the circuit" },
    ],
    prizePool: 3000,
    prizeBreakdown: [
      { place: "1st", amount: 1500, note: "+ King of Iron Fist medal" },
      { place: "2nd", amount: 900, note: "+ Runner-up medal" },
      { place: "3rd", amount: 600, note: "+ Podium medal" },
    ],
    slots: 64,
    slotLabel: "fighter slots",
  },
];

const TOURNAMENTS_MAP = new Map(TOURNAMENTS.map((t) => [t.id, t] as const));
const TOURNAMENT_BY_GAME = new Map(TOURNAMENTS.map((t) => [t.gameSlug, t] as const));

export function getTournament(id: string): Tournament | undefined {
  return TOURNAMENTS_MAP.get(id);
}

export function getTournamentForGame(gameSlug: string): Tournament | undefined {
  return TOURNAMENT_BY_GAME.get(gameSlug);
}

export const TOTAL_PRIZE_POOL = TOURNAMENTS.reduce((s, t) => s + t.prizePool, 0);
export const TOTAL_SLOTS = TOURNAMENTS.reduce((s, t) => s + t.slots, 0);

export function formatMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

export function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(`${iso}T00:00:00`).getTime() - today.getTime()) / 86_400_000);
}
