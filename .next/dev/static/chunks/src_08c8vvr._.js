(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/games.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GAMES",
    ()=>GAMES,
    "GAME_SLUGS",
    ()=>GAME_SLUGS,
    "getGame",
    ()=>getGame
]);
function hexA(hex, alpha) {
    const n = hex.replace("#", "");
    const r = parseInt(n.slice(0, 2), 16);
    const g = parseInt(n.slice(2, 4), 16);
    const b = parseInt(n.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function makeTheme(accent, accent2, ink = "#0a0a0e") {
    return {
        accent,
        accent2,
        ink,
        heroBg: [
            `radial-gradient(1100px 520px at 78% -12%, ${hexA(accent, 0.22)}, transparent 65%)`,
            `radial-gradient(760px 460px at 6% 22%, ${hexA(accent2, 0.13)}, transparent 70%)`
        ].join(", "),
        vars: {
            "--accent": accent,
            "--accent-2": accent2,
            "--accent-ink": ink,
            "--glow": hexA(accent, 0.38)
        }
    };
}
const EXPERIENCE = {
    name: "experience",
    label: "Competitive experience",
    type: "select",
    options: [
        "My first tournament",
        "Amateur circuit regular",
        "Semi-pro stack",
        "Professional roster"
    ],
    required: true,
    half: true
};
const NOTES = {
    name: "notes",
    label: "Anything we should know? (optional)",
    type: "textarea",
    placeholder: "Substitutes, streaming handles, accessibility needs…",
    required: false,
    maxLength: 280
};
function identityFields() {
    return [
        {
            name: "ign",
            label: "In-game name (IGN)",
            type: "text",
            placeholder: "e.g. VyperStroke",
            required: true,
            half: true,
            maxLength: 24
        },
        {
            name: "realName",
            label: "Full name",
            type: "text",
            placeholder: "As it appears on your ID",
            required: true,
            half: true,
            maxLength: 60
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
            required: true,
            half: true,
            maxLength: 120
        }
    ];
}
function uidField(label, placeholder) {
    return {
        name: "uid",
        label,
        type: "text",
        placeholder,
        required: true,
        half: true,
        maxLength: 30
    };
}
function squadFields(opts) {
    return [
        ...identityFields(),
        {
            name: "phone",
            label: "Phone / WhatsApp",
            type: "tel",
            placeholder: "+1 555 000 1234",
            required: true,
            half: true,
            maxLength: 18
        },
        uidField(opts.uidLabel, opts.uidPlaceholder),
        {
            name: "teamName",
            label: "Team / squad name",
            type: "text",
            placeholder: "Letters, numbers & spaces only",
            required: true,
            half: true,
            maxLength: 30
        },
        {
            name: "role",
            label: "Your in-game role",
            type: "select",
            options: opts.roles,
            required: true,
            half: true
        },
        EXPERIENCE,
        NOTES
    ];
}
function soloFields(opts) {
    return [
        ...identityFields(),
        uidField(opts.uidLabel, opts.uidPlaceholder),
        {
            name: "main",
            label: "Main fighter",
            type: "select",
            options: opts.mains,
            required: true,
            half: true
        },
        {
            name: "rank",
            label: "Current competitive rank",
            type: "select",
            options: opts.ranks,
            required: true,
            half: true
        },
        EXPERIENCE,
        {
            name: "platform",
            label: "Platform",
            type: "select",
            options: [
                "PC",
                "PlayStation 5",
                "Xbox Series X|S",
                "Arcade stick setup"
            ],
            required: true,
            half: true
        },
        NOTES
    ];
}
const GAMES = [
    {
        slug: "bgmi",
        name: "BGMI",
        fullName: "Battlegrounds Mobile India",
        tagline: "100 drop in. One chicken dinner.",
        description: "India's premier battlegrounds stage. Squad up, rotate smart, and leave Erangel with the pan held high.",
        mode: "squad",
        modeLabel: "Squad · 4 players",
        chipLabel: "Battle Royale",
        image: "/games/bgmi.jpg",
        theme: makeTheme("#F2A83B", "#A3A84A", "#1d1202"),
        fields: squadFields({
            uidLabel: "BGMI Character ID",
            uidPlaceholder: "e.g. 5123456789",
            roles: [
                "Assaulter",
                "IGL (In-game Leader)",
                "Support",
                "Sniper",
                "Scout"
            ]
        })
    },
    {
        slug: "tekken-8",
        name: "Tekken 8",
        fullName: "Tekken 8",
        tagline: "Fist meets fate. Heat engaged.",
        description: "The next chapter of the Iron Fist saga. New blood, new Heat system — same question: who's the king?",
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
                "Other"
            ],
            ranks: [
                "Beginner range",
                "Warrior range",
                "Vanquisher range",
                "Fujin or above",
                "Raijin or above",
                "God of Destruction"
            ]
        })
    },
    {
        slug: "tekken-7",
        name: "Tekken 7",
        fullName: "Tekken 7",
        tagline: "Honor the legacy. Hold the stage.",
        description: "The classic King of Iron Fist battleground. Rage art at 1HP is still the scariest sound in esports.",
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
                "Other"
            ],
            ranks: [
                "Beginner range",
                "Vanquisher range",
                "Genbu range",
                "Fujin range",
                "Raijin range",
                "Tekken God"
            ]
        })
    },
    {
        slug: "mortal-kombat",
        name: "Mortal Kombat",
        fullName: "Mortal Kombat 1",
        tagline: "Flawless venue. Flawless victory.",
        description: "Step into the arena where kombatants are made and friendships end at the fatality prompt. Finish them.",
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
                "Other"
            ],
            ranks: [
                "Casual kombatant",
                "Kombat League regular",
                "Grand Master",
                "Pro circuit seed"
            ]
        })
    },
    {
        slug: "call-of-duty",
        name: "Call of Duty",
        fullName: "Call of Duty",
        tagline: "Boots on the ground. Comms up.",
        description: "Disciplined 4v4 tactical warfare. Hardpoint rotations, SnD clutches, and a bracket that respects nobody.",
        mode: "squad",
        modeLabel: "Squad · 4v4",
        chipLabel: "Tactical FPS",
        image: "/games/call-of-duty.jpg",
        theme: makeTheme("#9DAF6B", "#C8A96A", "#11150a"),
        fields: squadFields({
            uidLabel: "Activision ID",
            uidPlaceholder: "e.g. Soldier#4928110",
            roles: [
                "Slayer",
                "Anchor",
                "SMG",
                "Flex",
                "Sniper"
            ]
        })
    },
    {
        slug: "free-fire",
        name: "Free Fire",
        fullName: "Garena Free Fire",
        tagline: "Ten minutes. Pure chaos. Booyah.",
        description: "Fast drops, faster fights. The highest-energy battle royale on the circuit — bring your best emotes.",
        mode: "squad",
        modeLabel: "Squad · 4 players",
        chipLabel: "Battle Royale",
        image: "/games/free-fire.jpg",
        theme: makeTheme("#FF7A1A", "#FFC42E", "#1d0d01"),
        fields: squadFields({
            uidLabel: "Free Fire UID",
            uidPlaceholder: "e.g. 2345678901",
            roles: [
                "Rusher",
                "IGL (In-game Leader)",
                "Support",
                "Sniper",
                "Grenadier"
            ]
        })
    }
];
const GAMES_MAP = new Map(GAMES.map((g)=>[
        g.slug,
        g
    ]));
function getGame(slug) {
    return GAMES_MAP.get(slug);
}
const GAME_SLUGS = GAMES.map(_c = (g)=>g.slug);
_c1 = GAME_SLUGS;
var _c, _c1;
__turbopack_context__.k.register(_c, "GAME_SLUGS$GAMES.map");
__turbopack_context__.k.register(_c1, "GAME_SLUGS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/site-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/swords.mjs [app-client] (ecmascript) <export default as Swords>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/games.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SiteHeader() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteHeader.useEffect": ()=>{
            setOpen(false);
        }
    }["SiteHeader.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#08090e]/80 backdrop-blur-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "group flex items-center gap-2.5",
                        "aria-label": "TripleThreatEsports home",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "grid size-9 place-items-center rounded-lg bg-amber-400/15 text-amber-400 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"], {
                                    className: "size-5",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/site-header.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-display text-[15px] font-bold tracking-tight",
                                children: [
                                    "TripleThreat",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-400",
                                        children: "Esports"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/site-header.tsx",
                                        lineNumber: 25,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/site-header.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-1 md:flex",
                        "aria-label": "Primary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                href: "/#games",
                                children: "Games"
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                href: "/#tournaments",
                                children: "Tournaments"
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                href: "/#how-it-works",
                                children: "How it works"
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/site-header.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-3 md:flex",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/#games",
                            className: "group inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-[13px] font-bold text-[#1d1202] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-8px_rgba(242,168,59,0.55)]",
                            children: [
                                "Register now",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "size-3.5 transition-transform duration-300 group-hover:translate-x-0.5",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/site-header.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/site-header.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/site-header.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "grid size-10 place-items-center rounded-lg border border-white/10 text-zinc-300 md:hidden",
                        onClick: ()=>setOpen((v)=>!v),
                        "aria-expanded": open,
                        "aria-label": open ? "Close menu" : "Open menu",
                        children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site-header.tsx",
                            lineNumber: 51,
                            columnNumber: 19
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/site-header.tsx",
                            lineNumber: 51,
                            columnNumber: 46
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/site-header.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/site-header.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "border-t border-white/8 bg-[#0a0b11] px-5 pb-6 pt-4 md:hidden",
                "aria-label": "Mobile",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                href: "/#games",
                                children: "Games"
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                href: "/#tournaments",
                                children: "Tournaments"
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileLink, {
                                href: "/#how-it-works",
                                children: "How it works"
                            }, void 0, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/site-header.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500",
                        children: "Register for a game"
                    }, void 0, false, {
                        fileName: "[project]/src/components/site-header.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-2 gap-1.5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$games$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GAMES"].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/games/${g.slug}`,
                                className: "rounded-lg border border-white/8 px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white",
                                children: g.name
                            }, g.slug, false, {
                                fileName: "[project]/src/components/site-header.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/site-header.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/site-header.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site-header.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(SiteHeader, "cPPloHdmmqpvPwaD00PIccMz5O4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SiteHeader;
function NavLink({ href, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "rounded-full px-3.5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/site-header.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c1 = NavLink;
function MobileLink({ href, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "rounded-lg px-2 py-2.5 text-[15px] font-semibold text-zinc-200 transition-colors hover:bg-white/5",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/site-header.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c2 = MobileLink;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SiteHeader");
__turbopack_context__.k.register(_c1, "NavLink");
__turbopack_context__.k.register(_c2, "MobileLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_08c8vvr._.js.map