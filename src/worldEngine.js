export const WORLD_ENGINE_VERSION = 1;

export const WORLD_PROFILE_KEYS = [
  "calm",
  "courage",
  "gratitude",
  "connection",
  "hope",
  "curiosity",
  "acceptance",
  "vitality",
];

const ELEMENT_CATALOG = {
  calm_lake: { name: "靜心湖泊", category: "terrain" },
  water_lily: { name: "睡蓮", category: "flowers", growth: ["seed", "sprout", "bloom"] },
  white_egret: { name: "白鷺", category: "animals" },
  chamomile: { name: "洋甘菊", category: "flowers", growth: ["seed", "sprout", "bloom"] },
  wooden_bench: { name: "木椅", category: "decorations" },
  resting_cat: { name: "休息的貓咪", category: "animals" },
  white_butterfly: { name: "白蝴蝶", category: "animals", growth: ["cocoon", "emerging", "flying"] },
  songbird: { name: "小鳥", category: "animals" },
  companion_garden: { name: "陪伴花園", category: "terrain" },
  life_tree: { name: "生命樹", category: "terrain", growth: ["seedling", "young-tree", "tree"] },
  sunflower: { name: "向日葵", category: "flowers", growth: ["seed", "sprout", "bloom"] },
  stone_path: { name: "石頭步道", category: "terrain" },
  warm_light: { name: "暖光", category: "weather" },
  morning_mist: { name: "晨霧", category: "weather" },
  gentle_rain: { name: "柔雨", category: "weather" },
  clear_sky: { name: "晴空", category: "weather" },
  hope_seed: { name: "希望種子", category: "flowers", growth: ["seed", "sprout", "bloom"] },
  curiosity_path: { name: "好奇小徑", category: "terrain" },
  acceptance_stone: { name: "接納之石", category: "decorations" },
  boundary_stone: { name: "界線石", category: "decorations" },
  rest_cabin: { name: "休息小屋", category: "decorations" },
  connection_vine: { name: "連結藤蔓", category: "flowers", growth: ["seed", "sprout", "vine"] },
  gratitude_ginkgo: { name: "金杏葉", category: "decorations" },
  new_dawn: { name: "新晨光", category: "weather" },
  moonlight: { name: "月光", category: "weather" },
  feather: { name: "森林羽毛", category: "decorations" },
  crystal: { name: "微光晶石", category: "decorations" },
  small_lamp: { name: "林間小燈", category: "decorations" },
  flower: { name: "生命之花", category: "flowers", growth: ["seed", "sprout", "bloom"] },
  seed: { name: "生命種子", category: "flowers", growth: ["seed", "sprout", "bloom"] },
  leaf: { name: "新生葉", category: "flowers", growth: ["bud", "young-leaf", "leaf"] },
  butterfly: { name: "陪伴蝴蝶", category: "animals", growth: ["cocoon", "emerging", "flying"] },
  animal: { name: "森林訪客", category: "animals" },
  path: { name: "心意小徑", category: "terrain" },
  memory_light: { name: "記憶光點", category: "weather" },
};

const STATE_RULES = {
  "我有點難過": {
    profile: { acceptance: 3, hope: 2, calm: 1 },
    elements: ["gentle_rain", "warm_light", "hope_seed"],
  },
  "我有點生氣": {
    profile: { courage: 4, acceptance: 2, vitality: 2 },
    elements: ["boundary_stone", "clear_sky", "life_tree"],
  },
  "我有點焦慮": {
    profile: { calm: 4, acceptance: 2, hope: 1 },
    elements: ["calm_lake", "morning_mist", "water_lily"],
  },
  "我覺得無奈": {
    profile: { acceptance: 4, hope: 2, curiosity: 1 },
    elements: ["acceptance_stone", "curiosity_path", "hope_seed"],
  },
  "我有些懊悔": {
    profile: { acceptance: 4, gratitude: 2, hope: 2 },
    elements: ["gratitude_ginkgo", "hope_seed", "new_dawn"],
  },
  "我真的累了": {
    profile: { calm: 4, vitality: 1, acceptance: 2 },
    elements: ["chamomile", "wooden_bench", "resting_cat"],
  },
  "我有點迷惘": {
    profile: { curiosity: 4, hope: 3, courage: 1 },
    elements: ["curiosity_path", "warm_light", "hope_seed"],
  },
  "我想被陪伴": {
    profile: { connection: 5, hope: 2, vitality: 1 },
    elements: ["white_butterfly", "songbird", "companion_garden"],
  },
  "我感到平靜": {
    profile: { calm: 5, gratitude: 2, acceptance: 2 },
    elements: ["calm_lake", "water_lily", "white_egret"],
  },
  "我今天有力量": {
    profile: { courage: 5, vitality: 4, hope: 1 },
    elements: ["life_tree", "sunflower", "stone_path"],
  },
  "我充滿期待": {
    profile: { curiosity: 4, hope: 4, vitality: 2 },
    elements: ["new_dawn", "hope_seed", "white_butterfly"],
  },
  "我今天充滿感謝": {
    profile: { gratitude: 5, connection: 2, vitality: 2 },
    elements: ["gratitude_ginkgo", "flower", "warm_light"],
  },
};

const CARE_RULES = [
  { match: /陪伴|連結|靠近|真心|需要人|分享|愛說出口/, profile: { connection: 3 }, elements: ["white_butterfly", "songbird", "companion_garden"] },
  { match: /勇敢|行動|力量|界線|選擇/, profile: { courage: 3, vitality: 2 }, elements: ["life_tree", "sunflower", "stone_path"] },
  { match: /感謝|珍惜|溫暖|記住/, profile: { gratitude: 3 }, elements: ["gratitude_ginkgo", "flower", "warm_light"] },
  { match: /好奇|方向|一步|可能|開始|冒險/, profile: { curiosity: 3, hope: 1 }, elements: ["curiosity_path", "new_dawn", "hope_seed"] },
  { match: /希望|原諒|機會|相信|學習/, profile: { hope: 3, acceptance: 1 }, elements: ["hope_seed", "new_dawn", "warm_light"] },
  { match: /休息|慢|安心|呼吸|不用|空間/, profile: { calm: 3, acceptance: 1 }, elements: ["chamomile", "wooden_bench", "morning_mist"] },
  { match: /接受|耐心|放下/, profile: { acceptance: 3, calm: 1 }, elements: ["acceptance_stone", "water_lily", "gentle_rain"] },
];

const MARK_TYPE_RULES = {
  flower: "flower",
  seed: "seed",
  leaf: "leaf",
  butterfly: "butterfly",
  feather: "feather",
  crystal: "crystal",
  lamp: "small_lamp",
  light: "memory_light",
  stone: "acceptance_stone",
  path: "path",
  gate: "path",
};

const MARK_OVERRIDES = {
  "sad-white-feather": "feather",
  "sad-rain-light-flower": "flower",
  "anxious-wind-seed": "hope_seed",
  "companionship-near-light": "small_lamp",
  "companionship-echo-flower": "flower",
  "companionship-warm-feather": "feather",
  "expectation-butterfly-wing": "butterfly",
  "gratitude-lightwing-butterfly": "butterfly",
  "strength-courage-sprout": "life_tree",
};

const EMPTY_CATEGORIES = ["flowers", "animals", "decorations", "terrain", "weather", "memories"];

function dateAtOffset(dateString, days) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function stableNumber(value) {
  return Array.from(String(value)).reduce(
    (sum, character, index) => sum + character.charCodeAt(0) * (index + 7),
    0
  );
}

function clampProfile(value) {
  return Math.max(0, Math.min(999, Number(value) || 0));
}

function createElement(elementId, source, date, sequence = 0) {
  const definition = ELEMENT_CATALOG[elementId] || ELEMENT_CATALOG.memory_light;
  const stages = definition.growth || ["present"];
  return {
    instanceId: `${date}:${source.type}:${source.id || elementId}:${sequence}`,
    elementId,
    name: definition.name,
    category: definition.category,
    stage: stages[0],
    createdAt: date,
    source,
  };
}

function createGrowthEvents(element) {
  const stages = ELEMENT_CATALOG[element.elementId]?.growth || [];
  return stages.slice(1).map((stage, index) => ({
    id: `${element.instanceId}:${stage}`,
    elementInstanceId: element.instanceId,
    elementId: element.elementId,
    fromStage: stages[index],
    toStage: stage,
    dueDate: dateAtOffset(element.createdAt, index === 0 ? 3 : 7),
    status: "pending",
  }));
}

function incrementProfile(profile, delta = {}) {
  const next = normalizeWorldProfile(profile);
  WORLD_PROFILE_KEYS.forEach((key) => {
    next[key] = clampProfile(next[key] + (delta[key] || 0));
  });
  return next;
}

function mergeProfileDelta(...deltas) {
  return deltas.reduce((result, delta = {}) => {
    WORLD_PROFILE_KEYS.forEach((key) => {
      result[key] = (result[key] || 0) + (delta[key] || 0);
    });
    return result;
  }, {});
}

function pick(list, seed, offset = 0) {
  return list[(stableNumber(seed) + offset) % list.length];
}

function normalizeElement(element, fallbackCategory, index) {
  if (typeof element === "string") {
    return createElement(element, { type: "migration", id: element }, "legacy", index);
  }
  const definition = ELEMENT_CATALOG[element?.elementId] || {};
  return {
    ...element,
    instanceId: element?.instanceId || `legacy:${fallbackCategory}:${index}`,
    elementId: element?.elementId || "memory_light",
    name: element?.name || definition.name || "世界記憶",
    category: element?.category || definition.category || fallbackCategory,
    stage: element?.stage || definition.growth?.[0] || "present",
    createdAt: element?.createdAt || "legacy",
    source: element?.source || { type: "migration", id: "legacy" },
  };
}

function migrateLegacyIsland(island = {}) {
  const migrated = createIslandState();
  const addCopies = (category, elementId, count) => {
    for (let index = 0; index < Math.min(Number(count) || 0, 12); index += 1) {
      migrated[category].push(createElement(elementId, { type: "migration", id: "legacy" }, "legacy", index));
    }
  };

  addCopies("flowers", "flower", island.flowers);
  addCopies("animals", "butterfly", island.butterflies);
  addCopies("weather", "memory_light", island.lights);
  addCopies("decorations", "wooden_bench", island.benches);
  if (island.stream) migrated.terrain.push(createElement("calm_lake", { type: "migration", id: "stream" }, "legacy"));
  if (island.path) migrated.terrain.push(createElement("path", { type: "migration", id: "path" }, "legacy"));
  if (island.moonlight) migrated.weather.push(createElement("moonlight", { type: "migration", id: "moonlight" }, "legacy"));
  if (island.mist) migrated.weather.push(createElement("morning_mist", { type: "migration", id: "mist" }, "legacy"));
  migrated.treeStage = island.treeStage || "seedling";
  return migrated;
}

export function createWorldProfile() {
  return Object.fromEntries(WORLD_PROFILE_KEYS.map((key) => [key, 0]));
}

export function createIslandState() {
  return {
    version: WORLD_ENGINE_VERSION,
    treeStage: "seedling",
    flowers: [],
    animals: [],
    decorations: [],
    terrain: [],
    weather: [],
    memories: [],
    growthQueue: [],
    processedDates: [],
  };
}

export function normalizeWorldProfile(profile = {}) {
  return Object.fromEntries(
    WORLD_PROFILE_KEYS.map((key) => [key, clampProfile(profile[key])])
  );
}

export function normalizeIslandState(island = {}) {
  const source = EMPTY_CATEGORIES.some((category) => Array.isArray(island[category]))
    ? { ...createIslandState(), ...island }
    : migrateLegacyIsland(island);

  EMPTY_CATEGORIES.forEach((category) => {
    source[category] = (Array.isArray(source[category]) ? source[category] : [])
      .map((element, index) => normalizeElement(element, category, index));
  });

  source.growthQueue = Array.isArray(source.growthQueue) ? source.growthQueue : [];
  source.processedDates = Array.isArray(source.processedDates) ? source.processedDates : [];
  source.version = WORLD_ENGINE_VERSION;
  return source;
}

export function lifeMarkToWorldElement(mark, date) {
  const elementId = MARK_OVERRIDES[mark.id] || MARK_TYPE_RULES[mark.visualType] || "memory_light";
  return createElement(
    elementId,
    { type: "life-mark", id: mark.id, name: mark.name },
    date
  );
}

export function generateDailyWorldAddition({ date, state, care, marks = [] }) {
  const stateRule = STATE_RULES[state] || {
    profile: { acceptance: 1, hope: 1 },
    elements: ["hope_seed", "warm_light", "acceptance_stone"],
  };
  const careRule = CARE_RULES.find((rule) => rule.match.test(care || "")) || {
    profile: { acceptance: 1 },
    elements: ["warm_light", "hope_seed", "acceptance_stone"],
  };
  const seed = `${date}:${state}:${care}`;
  const stateElement = pick(stateRule.elements, seed);
  const careElement = pick(careRule.elements, seed, 1);
  const mark = marks.length ? marks[stableNumber(seed) % marks.length] : null;
  const elements = [
    createElement(stateElement, { type: "daily-state", id: state }, date, 0),
    createElement(careElement, { type: "daily-care", id: care }, date, 1),
    mark
      ? lifeMarkToWorldElement(mark, date)
      : createElement("memory_light", { type: "daily-memory", id: date }, date, 2),
  ];
  const uniqueElements = elements.filter(
    (element, index, all) => all.findIndex((item) => item.elementId === element.elementId) === index
  );

  return {
    date,
    state,
    care,
    profileDelta: mergeProfileDelta(stateRule.profile, careRule.profile),
    elements: uniqueElements,
    growthEvents: uniqueElements.flatMap(createGrowthEvents),
    lifeMarkIds: marks.map((item) => item.id),
  };
}

export function processGrowthQueue(islandState, currentDate) {
  const island = normalizeIslandState(islandState);
  const dueEvents = island.growthQueue.filter(
    (event) => event.status === "pending" && event.dueDate <= currentDate
  );
  if (!dueEvents.length) return island;

  const stagesByInstance = Object.fromEntries(
    dueEvents.map((event) => [event.elementInstanceId, event.toStage])
  );
  EMPTY_CATEGORIES.forEach((category) => {
    if (category === "memories") return;
    island[category] = island[category].map((element) => (
      stagesByInstance[element.instanceId]
        ? { ...element, stage: stagesByInstance[element.instanceId], maturedAt: currentDate }
        : element
    ));
  });
  island.growthQueue = island.growthQueue.map((event) => (
    stagesByInstance[event.elementInstanceId] && event.dueDate <= currentDate
      ? { ...event, status: "completed", completedAt: currentDate }
      : event
  ));
  return island;
}

export function applyDailyWorldAddition(worldProfile, islandState, addition) {
  let island = processGrowthQueue(islandState, addition.date);
  if (island.processedDates.includes(addition.date)) {
    return { worldProfile: normalizeWorldProfile(worldProfile), islandState: island };
  }

  addition.elements.forEach((element) => {
    island[element.category] = [...island[element.category], element];
  });
  island.growthQueue = [...island.growthQueue, ...addition.growthEvents];
  island.memories = [
    ...island.memories,
    {
      instanceId: `memory:${addition.date}`,
      elementId: "daily-memory",
      name: `${addition.state} × ${addition.care}`,
      category: "memories",
      stage: "remembered",
      createdAt: addition.date,
      source: { type: "daily-reflection", id: addition.date },
      lifeMarkIds: addition.lifeMarkIds,
      addedElementIds: addition.elements.map((element) => element.instanceId),
    },
  ];
  island.processedDates = [...island.processedDates, addition.date];

  const treeElements = island.terrain.filter((element) => element.elementId === "life_tree");
  island.treeStage = treeElements.at(-1)?.stage || island.treeStage;

  return {
    worldProfile: incrementProfile(worldProfile, addition.profileDelta),
    islandState: island,
  };
}

export function evolveWorld({ worldProfile, islandState, date, state, care, marks }) {
  const todayWorldAddition = generateDailyWorldAddition({ date, state, care, marks });
  return {
    ...applyDailyWorldAddition(worldProfile, islandState, todayWorldAddition),
    todayWorldAddition,
  };
}

export function getWorldRenderState(islandState) {
  const island = normalizeIslandState(islandState);
  const count = (category, elementIds) => island[category]
    .filter((element) => !elementIds || elementIds.includes(element.elementId)).length;
  return {
    treeStage: island.treeStage,
    flowers: count("flowers"),
    butterflies: count("animals", ["butterfly", "white_butterfly"]),
    lights: count("weather", ["memory_light", "warm_light", "new_dawn", "moonlight"]),
    benches: count("decorations", ["wooden_bench"]),
    mist: count("weather", ["morning_mist", "gentle_rain"]),
    stream: count("terrain", ["calm_lake"]) > 0,
    moonlight: count("weather", ["moonlight"]) > 0,
    path: count("terrain", ["path", "curiosity_path", "stone_path"]) > 0,
  };
}

export const WORLD_GENERATION_RULES = {
  states: STATE_RULES,
  care: CARE_RULES,
  lifeMarks: {
    overrides: MARK_OVERRIDES,
    byVisualType: MARK_TYPE_RULES,
  },
  catalog: ELEMENT_CATALOG,
};
