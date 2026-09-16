import type { CSSProperties } from "react";

export type GameMode = "squad" | "solo";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  required: boolean;
  half?: boolean;
  maxLength?: number;
}

export interface GameTheme {
  accent: string;
  accent2: string;
  ink: string;
  heroBg: string;
  vars: CSSProperties;
}

export interface Game {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  mode: GameMode;
  modeLabel: string;
  chipLabel: string;
  image: string;
  theme: GameTheme;
  fields: FieldDef[];
}

function hexA(hex: string, alpha: number): string {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function makeTheme(accent: string, accent2: string, ink = "#0a0a0e"): GameTheme {
  return {
    accent,
    accent2,
    ink,
    heroBg: [
      `radial-gradient(1100px 520px at 78% -12%, ${hexA(accent, 0.22)}, transparent 65%)`,
      `radial-gradient(760px 460px at 6% 22%, ${hexA(accent2, 0.13)}, transparent 70%)`,
    ].join(", "),
    vars: {
      "--accent": accent,
      "--accent-2": accent2,
      "--accent-ink": ink,
      "--glow": hexA(accent, 0.38),
    } as CSSProperties,
  };
}

const EXPERIENCE: FieldDef = {
  name: "experience",
  label: "Competitive experience",
  type: "select",
  options: [
    "My first tournament",
    "Amateur circuit regular",
    "Semi-pro stack",
    "Professional roster",
  ],
  required: true,
  half: true,
};

const NOTES: FieldDef = {
  name: "notes",
  label: "Anything we should know? (optional)",
  type: "textarea",
  placeholder: "Substitutes, streaming handles, accessibility needs…",
  required: false,
  maxLength: 280,
};

function identityFields(): FieldDef[] {
  return [
    {
      name: "ign",
      label: "In-game name (IGN)",
      type: "text",
      placeholder: "e.g. VyperStroke",
      required: true,
      half: true,
      maxLength: 24,
    },
    {
      name: "realName",
      label: "Full name",
      type: "text",
      placeholder: "As it appears on your ID",
      required: true,
      half: true,
      maxLength: 60,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      required: true,
      half: true,
      maxLength: 120,
    },
  ];
}

function uidField(label: string, placeholder: string): FieldDef {
  return {
    name: "uid",
    label,
    type: "text",
    placeholder,
    required: true,
    half: true,
    maxLength: 30,
  };
}

function squadFields(opts: {
  uidLabel: string;
  uidPlaceholder: string;
  roles: string[];
}): FieldDef[] {
  return [
    ...identityFields(),
    {
      name: "phone",
      label: "Phone / WhatsApp",
      type: "tel",
      placeholder: "+1 555 000 1234",
      required: true,
      half: true,
      maxLength: 18,
    },
    uidField(opts.uidLabel, opts.uidPlaceholder),
    {
      name: "teamName",
      label: "Team / squad name",
      type: "text",
      placeholder: "Letters, numbers & spaces only",
      required: true,
      half: true,
      maxLength: 30,
    },
    {
      name: "role",
      label: "Your in-game role",
      type: "select",
      options: opts.roles,
      required: true,
      half: true,
    },
    EXPERIENCE,
    NOTES,
  ];
}

function soloFields(opts: {
  uidLabel: string;
  uidPlaceholder: string;
  mains: string[];
  ranks: string[];
}): FieldDef[] {
  return [
    ...identityFields(),
    uidField(opts.uidLabel, opts.uidPlaceholder),
    {
      name: "main",
      label: "Main fighter",
      type: "select",
      options: opts.mains,
      required: true,
      half: true,
    },
    {
      name: "rank",
      label: "Current competitive rank",
      type: "select",
      options: opts.ranks,
      required: true,
      half: true,
    },
    EXPERIENCE,
    {
      name: "platform",
      label: "Platform",
      type: "select",
      options: ["PC", "PlayStation 5", "Xbox Series X|S", "Arcade stick setup"],
      required: true,
      half: true,
    },
    NOTES,
  ];
}

export const GAMES: Game[] = [
  {
    slug: "bgmi",
    name: "BGMI",
    fullName: "Battlegrounds Mobile India",
    tagline: "100 drop in. One chicken dinner.",
    description:
      "India's premier battlegrounds stage. Squad up, rotate smart, and leave Erangel with the pan held high.",
    mode: "squad",
    modeLabel: "Squad · 4 players",
    chipLabel: "Battle Royale",
    image: "/games/bgmi.jpg",
    theme: makeTheme("#F2A83B", "#A3A84A", "#1d1202"),
    fields: squadFields({
      uidLabel: "BGMI Character ID",
      uidPlaceholder: "e.g. 5123456789",
      roles: ["Assaulter", "IGL (In-game Leader)", "Support", "Sniper", "Scout"],
    }),
  },
  {
    slug: "tekken-8",
    name: "Tekken 8",
    fullName: "Tekken 8",
    tagline: "Fist meets fate. Heat engaged.",
    description:
      "The next chapter of the Iron Fist saga. New blood, new Heat system — same question: who's the king?",
    mode: "solo",
    modeLabel: "1v1 · Fighting",
    chipLabel: "Fighting · Next Gen",
    image: "/games/tekken-8.jpg",
    theme: makeTheme("#FF2E57", "#2FD4F2", "#20030d"),
    fields: soloFields({
      uidLabel: "Tekken 8 Player ID",
      uidPlaceholder: "Your in-game player ID",
      mains: [
        "Jin Kazama",
        "Kazuya Mishima",
        "Reina",
        "Lars Alexandersson",
        "Hwoarang",
        "King",
        "Dragunov",
        "Claudio Serafino",
        "Victor Chevalier",
        "Azucena",
        "Other",
      ],
      ranks: [
        "Beginner range",
        "Warrior range",
        "Vanquisher range",
        "Fujin or above",
        "Raijin or above",
        "God of Destruction",
      ],
    }),
  },
  {
    slug: "tekken-7",
    name: "Tekken 7",
    fullName: "Tekken 7",
    tagline: "Honor the legacy. Hold the stage.",
    description:
      "The classic King of Iron Fist battleground. Rage art at 1HP is still the scariest sound in esports.",
    mode: "solo",
    modeLabel: "1v1 · Fighting",
    chipLabel: "Fighting · Classic",
    image: "/games/tekken-7.jpg",
    theme: makeTheme("#C9182E", "#A8B0BC", "#ffffff"),
    fields: soloFields({
      uidLabel: "Bandai Namco ID",
      uidPlaceholder: "Your BNID account name",
      mains: [
        "Jin Kazama",
        "Kazuya Mishima",
        "Hwoarang",
        "King",
        "Paul Phoenix",
        "Marshall Law",
        "Lili",
        "Dragunov",
        "Steve Fox",
        "Leroy Smith",
        "Other",
      ],
      ranks: [
        "Beginner range",
        "Vanquisher range",
        "Genbu range",
        "Fujin range",
        "Raijin range",
        "Tekken God",
      ],
    }),
  },
  {
    slug: "mortal-kombat",
    name: "Mortal Kombat",
    fullName: "Mortal Kombat 1",
    tagline: "Flawless venue. Flawless victory.",
    description:
      "Step into the arena where kombatants are made and friendships end at the fatality prompt. Finish them.",
    mode: "solo",
    modeLabel: "1v1 · Fighting",
    chipLabel: "Fighting · Klassic",
    image: "/games/mortal-kombat.jpg",
    theme: makeTheme("#A855F7", "#DC2645", "#17051f"),
    fields: soloFields({
      uidLabel: "WB Games ID",
      uidPlaceholder: "Your WB Games account",
      mains: [
        "Scorpion",
        "Sub-Zero",
        "Liu Kang",
        "Raiden",
        "Kung Lao",
        "Johnny Cage",
        "Kitana",
        "Mileena",
        "Noob Saibot",
        "Other",
      ],
      ranks: [
        "Casual kombatant",
        "Kombat League regular",
        "Grand Master",
        "Pro circuit seed",
      ],
    }),
  },
  {
    slug: "call-of-duty",
    name: "Call of Duty",
    fullName: "Call of Duty",
    tagline: "Boots on the ground. Comms up.",
    description:
      "Disciplined 4v4 tactical warfare. Hardpoint rotations, SnD clutches, and a bracket that respects nobody.",
    mode: "squad",
    modeLabel: "Squad · 4v4",
    chipLabel: "Tactical FPS",
    image: "/games/call-of-duty.jpg",
    theme: makeTheme("#9DAF6B", "#C8A96A", "#11150a"),
    fields: squadFields({
      uidLabel: "Activision ID",
      uidPlaceholder: "e.g. Soldier#4928110",
      roles: ["Slayer", "Anchor", "SMG", "Flex", "Sniper"],
    }),
  },
  {
    slug: "free-fire",
    name: "Free Fire",
    fullName: "Garena Free Fire",
    tagline: "Ten minutes. Pure chaos. Booyah.",
    description:
      "Fast drops, faster fights. The highest-energy battle royale on the circuit — bring your best emotes.",
    mode: "squad",
    modeLabel: "Squad · 4 players",
    chipLabel: "Battle Royale",
    image: "/games/free-fire.jpg",
    theme: makeTheme("#FF7A1A", "#FFC42E", "#1d0d01"),
    fields: squadFields({
      uidLabel: "Free Fire UID",
      uidPlaceholder: "e.g. 2345678901",
      roles: ["Rusher", "IGL (In-game Leader)", "Support", "Sniper", "Grenadier"],
    }),
  },
];

const GAMES_MAP = new Map(GAMES.map((g) => [g.slug, g] as const));

export function getGame(slug: string): Game | undefined {
  return GAMES_MAP.get(slug);
}

export const GAME_SLUGS = GAMES.map((g) => g.slug);
