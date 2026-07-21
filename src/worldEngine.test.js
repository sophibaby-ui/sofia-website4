import test from "node:test";
import assert from "node:assert/strict";
import {
  applyDailyWorldAddition,
  createIslandState,
  createWorldProfile,
  evolveWorld,
  generateDailyWorldAddition,
  lifeMarkToWorldElement,
  normalizeIslandState,
  processGrowthQueue,
  WORLD_PROFILE_KEYS,
} from "./worldEngine.js";

test("creates the canonical cumulative world data model", () => {
  const profile = createWorldProfile();
  const island = createIslandState();

  assert.deepEqual(Object.keys(profile), WORLD_PROFILE_KEYS);
  assert.ok(WORLD_PROFILE_KEYS.every((key) => profile[key] === 0));
  assert.equal(island.treeStage, "seedling");
  ["flowers", "animals", "decorations", "terrain", "weather", "memories", "growthQueue"]
    .forEach((key) => assert.ok(Array.isArray(island[key])));
});

test("Step 1 and Step 2 deterministically generate today's additions", () => {
  const input = {
    date: "2026-07-09",
    state: "我真的累了",
    care: "一段休息",
    marks: [],
  };
  const first = generateDailyWorldAddition(input);
  const second = generateDailyWorldAddition(input);

  assert.deepEqual(first, second);
  assert.ok(first.elements.some((element) => element.elementId === "chamomile"));
  assert.ok(first.elements.length <= 3);
  assert.equal(first.profileDelta.calm, 7);
});

test("a completed day is applied only once", () => {
  const addition = generateDailyWorldAddition({
    date: "2026-07-09",
    state: "我感到平靜",
    care: "一份珍惜",
    marks: [],
  });
  const first = applyDailyWorldAddition(createWorldProfile(), createIslandState(), addition);
  const second = applyDailyWorldAddition(first.worldProfile, first.islandState, addition);

  assert.deepEqual(second.worldProfile, first.worldProfile);
  assert.equal(second.islandState.memories.length, 1);
  assert.equal(second.islandState.processedDates.length, 1);
});

test("growth queue matures elements after three and seven days", () => {
  const result = evolveWorld({
    worldProfile: createWorldProfile(),
    islandState: createIslandState(),
    date: "2026-07-09",
    state: "我真的累了",
    care: "一段休息",
    marks: [],
  });
  const chamomile = result.islandState.flowers.find((element) => element.elementId === "chamomile");
  assert.equal(chamomile.stage, "seed");

  const dayThree = processGrowthQueue(result.islandState, "2026-07-12");
  assert.equal(
    dayThree.flowers.find((element) => element.elementId === "chamomile").stage,
    "sprout"
  );

  const daySeven = processGrowthQueue(dayThree, "2026-07-16");
  assert.equal(
    daySeven.flowers.find((element) => element.elementId === "chamomile").stage,
    "bloom"
  );
});

test("life marks become traceable world elements", () => {
  const element = lifeMarkToWorldElement(
    { id: "sad-white-feather", name: "白色羽毛", visualType: "feather" },
    "2026-07-09"
  );

  assert.equal(element.elementId, "feather");
  assert.equal(element.category, "decorations");
  assert.deepEqual(element.source, {
    type: "life-mark",
    id: "sad-white-feather",
    name: "白色羽毛",
  });
});

test("legacy numeric island data migrates without being discarded", () => {
  const island = normalizeIslandState({
    treeStage: "young-tree",
    flowers: 4,
    butterflies: 2,
    lights: 3,
    benches: 1,
    stream: true,
    path: true,
  });

  assert.equal(island.flowers.length, 4);
  assert.equal(island.animals.length, 2);
  assert.equal(island.weather.length, 3);
  assert.equal(island.decorations.length, 1);
  assert.equal(island.terrain.length, 2);
  assert.equal(island.treeStage, "young-tree");
});
