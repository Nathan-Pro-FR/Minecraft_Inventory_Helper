// items.js - La grande base de données des objets Minecraft connecté à Mojang
const MOJANG_REPO = "https://raw.githubusercontent.com/Mojang/bedrock-samples/main/resource_pack/textures";

const itemDatabase = {
    // --- MINERAIS & MÉTAUX ---
    "iron_ingot": {
        name: "Lingot de Fer",
        image: `${MOJANG_REPO}/items/iron_ingot.png`,
        compactsInto: "iron_block",
        ratio: 9
    },
    "iron_block": {
        name: "Bloc de Fer",
        image: `${MOJANG_REPO}/blocks/iron_block.png`,
        compactsInto: null,
        ratio: 1
    },
    "raw_iron": {
        name: "Fer Brut",
        image: `${MOJANG_REPO}/items/raw_iron.png`,
        compactsInto: "raw_iron_block",
        ratio: 9
    },
    "raw_iron_block": {
        name: "Bloc de Fer Brut",
        image: `${MOJANG_REPO}/blocks/raw_iron_block.png`,
        compactsInto: null,
        ratio: 1
    },
    "gold_ingot": {
        name: "Lingot d'Or",
        image: `${MOJANG_REPO}/items/gold_ingot.png`,
        compactsInto: "gold_block",
        ratio: 9
    },
    "gold_block": {
        name: "Bloc d'Or",
        image: `${MOJANG_REPO}/blocks/gold_block.png`,
        compactsInto: null,
        ratio: 1
    },
    "diamond": {
        name: "Diamant",
        image: `${MOJANG_REPO}/items/diamond.png`,
        compactsInto: "diamond_block",
        ratio: 9
    },
    "diamond_block": {
        name: "Bloc de Diamant",
        image: `${MOJANG_REPO}/blocks/diamond_block.png`,
        compactsInto: null,
        ratio: 1
    },
    "redstone": {
        name: "Poudre de Redstone",
        image: `${MOJANG_REPO}/items/redstone_dust.png`,
        compactsInto: "redstone_block",
        ratio: 9
    },
    "redstone_block": {
        name: "Bloc de Redstone",
        image: `${MOJANG_REPO}/blocks/redstone_block.png`,
        compactsInto: null,
        ratio: 1
    },
    "lapis_lazuli": {
        name: "Lapis-lazuli",
        image: `${MOJANG_REPO}/items/lapis_lazuli.png`,
        compactsInto: "lapis_block",
        ratio: 9
    },
    "lapis_block": {
        name: "Bloc de Lapis-lazuli",
        image: `${MOJANG_REPO}/blocks/lapis_block.png`,
        compactsInto: null,
        ratio: 1
    },
    "emerald": {
        name: "Émeraude",
        image: `${MOJANG_REPO}/items/emerald.png`,
        compactsInto: "emerald_block",
        ratio: 9
    },
    "emerald_block": {
        name: "Bloc d'Émeraude",
        image: `${MOJANG_REPO}/blocks/emerald_block.png`,
        compactsInto: null,
        ratio: 1
    },
    "coal": {
        name: "Charbon",
        image: `${MOJANG_REPO}/items/coal.png`,
        compactsInto: "coal_block",
        ratio: 9
    },
    "coal_block": {
        name: "Bloc de Charbon",
        image: `${MOJANG_REPO}/blocks/coal_block.png`,
        compactsInto: null,
        ratio: 1
    },

    // --- MONSTRES & AGRICULTURE ---
    "slime_ball": {
        name: "Boule de Slime",
        image: `${MOJANG_REPO}/items/slimeball.png`,
        compactsInto: "slime_block",
        ratio: 9
    },
    "slime_block": {
        name: "Bloc de Slime",
        image: `${MOJANG_REPO}/blocks/slime.png`,
        compactsInto: null,
        ratio: 1
    },
    "bone_meal": {
        name: "Poudre d'Os",
        image: `${MOJANG_REPO}/items/dye_powder_white.png`,
        compactsInto: "bone_block",
        ratio: 9
    },
    "bone_block": {
        name: "Bloc d'Os",
        image: `${MOJANG_REPO}/blocks/bone_block_side.png`,
        compactsInto: null,
        ratio: 1
    },
    "wheat": {
        name: "Blé",
        image: `${MOJANG_REPO}/items/wheat.png`,
        compactsInto: "hay_block",
        ratio: 9
    },
    "hay_block": {
        name: "Botte de Paille",
        image: `${MOJANG_REPO}/blocks/hay_block_side.png`,
        compactsInto: null,
        ratio: 1
    },
    "nether_wart": {
        name: "Verrue du Nether",
        image: `${MOJANG_REPO}/items/nether_wart.png`,
        compactsInto: "nether_wart_block",
        ratio: 9
    },
    "nether_wart_block": {
        name: "Bloc de Verrues du Nether",
        image: `${MOJANG_REPO}/blocks/nether_wart_block.png`,
        compactsInto: null,
        ratio: 1
    },

    // --- BLOCS DE BOIS ET DECORATION (Exemples) ---
    "acacia_trapdoor": {
        name: "Trappe en Acacia",
        image: `${MOJANG_REPO}/blocks/acacia_trapdoor.png`,
        compactsInto: null,
        ratio: 1
    }
};
