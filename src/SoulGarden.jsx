import { useEffect, useMemo, useRef, useState } from "react";
import "./soulGarden.css";

const STORE_KEY = "soulGardenState";
const W = 840;
const H = 1160;
const VIEW_W = 390;
const VIEW_H = 610;

const REMINDERS = [
  "你不需要一次變好，只需要每天回來一點點",
  "真正的穩定，是允許自己慢慢長大",
  "今天先不用完美，只要願意開始",
  "當你願意照顧自己，世界也會慢慢回應你",
  "你的光不是消失了，只是正在重新聚集",
];

const RESOURCES = {
  weeds: { name: "情緒雜草", icon: "weeds" },
  seeds: { name: "光種子", icon: "seeds" },
  dew: { name: "靈感露水", icon: "dew" },
  petals: { name: "心願花瓣", icon: "petals" },
  stardust: { name: "星塵", icon: "stardust" },
};

const PRODUCTS = {
  lightOrb: { name: "淨化光球", icon: "lightOrb", price: 32 },
  soulFlower: { name: "靈魂小花", icon: "soulFlower", price: 45 },
  moonPearl: { name: "月光露珠", icon: "moonPearl", price: 80 },
  wishBouquet: { name: "願望花束", icon: "wishBouquet", price: 170 },
  butterflyBlessing: { name: "蝴蝶祝福", icon: "butterflyBlessing", price: 360 },
  innerLight: { name: "內在之光", icon: "innerLight", price: 880 },
};

const AREAS = {
  seed: { name: "種子庭院", price: 0, x: 0, y: 0, w: 420, h: 390, chapter: 1 },
  moon: { name: "月光溫室", price: 500, x: 420, y: 0, w: 420, h: 390, chapter: 2 },
  crystal: { name: "水晶花田", price: 950, x: 0, y: 390, w: 420, h: 380, chapter: 2 },
  butterfly: { name: "蝴蝶花徑", price: 1500, x: 420, y: 390, w: 420, h: 380, chapter: 3 },
  altar: { name: "星光祭壇", price: 2600, x: 0, y: 770, w: 420, h: 390, chapter: 4 },
  forest: { name: "願望森林", price: 4200, x: 420, y: 770, w: 420, h: 390, chapter: 5 },
};

const BAG_CAP = [10, 20, 35, 50, 80];
const BAG_COST = [0, 100, 300, 800, 1500];
const SPEED_MULT = [1, 1.1, 1.2, 1.35];
const SPEED_COST = [0, 150, 500, 1200];
const MACHINE_MULT = [1, 0.8, 0.65, 0.5];
const MACHINE_COST = [0, 200, 600, 1200];
const FAIRY_COST = [0, 450, 900, 1800, 3200];
const DECO_COST = {
  moonLamp: 260,
  crystalPillar: 520,
  butterflyChair: 900,
  flowerArch: 1400,
  starPond: 2200,
  quietPavilion: 3600,
};

const RESOURCE_POINTS = [
  { id: "w1", type: "weeds", area: "seed", x: 104, y: 150 },
  { id: "w2", type: "weeds", area: "seed", x: 235, y: 104 },
  { id: "s1", type: "seeds", area: "seed", x: 118, y: 310 },
  { id: "s2", type: "seeds", area: "seed", x: 286, y: 282 },
  { id: "d1", type: "dew", area: "moon", x: 548, y: 128 },
  { id: "d2", type: "dew", area: "moon", x: 705, y: 286 },
  { id: "d3", type: "dew", area: "crystal", x: 150, y: 548 },
  { id: "p1", type: "petals", area: "butterfly", x: 575, y: 535 },
  { id: "p2", type: "petals", area: "butterfly", x: 725, y: 690 },
  { id: "star1", type: "stardust", area: "altar", x: 150, y: 925 },
  { id: "star2", type: "stardust", area: "forest", x: 660, y: 930 },
];

const MACHINES = {
  purifier: {
    name: "淨化機",
    icon: "purifier",
    area: "seed",
    x: 110,
    y: 238,
    recipe: { weeds: 3 },
    out: "lightOrb",
    seconds: 5,
  },
  flower: {
    name: "花朵培育台",
    icon: "flowerMachine",
    area: "seed",
    x: 296,
    y: 205,
    recipe: { seeds: 3 },
    out: "soulFlower",
    seconds: 5,
  },
  dew: {
    name: "露水蒸餾器",
    icon: "dewMachine",
    area: "moon",
    x: 620,
    y: 215,
    recipe: { dew: 3 },
    out: "moonPearl",
    seconds: 6,
  },
  bouquet: {
    name: "願望花束台",
    icon: "bouquetMachine",
    area: "crystal",
    x: 275,
    y: 590,
    recipe: { soulFlower: 1, moonPearl: 1 },
    out: "wishBouquet",
    seconds: 8,
  },
  blessing: {
    name: "祝福編織台",
    icon: "blessingMachine",
    area: "butterfly",
    x: 625,
    y: 620,
    recipe: { wishBouquet: 1, petals: 2 },
    out: "butterflyBlessing",
    seconds: 10,
  },
  light: {
    name: "內在之光台",
    icon: "lightMachine",
    area: "altar",
    x: 245,
    y: 965,
    recipe: { butterflyBlessing: 1, stardust: 2 },
    out: "innerLight",
    seconds: 14,
  },
};

const ORDERS = [
  {
    id: "o1",
    title: "晨光整理",
    need: { soulFlower: 2 },
    coins: 120,
    xp: 25,
    rep: 10,
    rare: { seeds: 2 },
  },
  {
    id: "o2",
    title: "月光委託",
    need: { lightOrb: 2, soulFlower: 1 },
    coins: 180,
    xp: 35,
    rep: 16,
    rare: { dew: 1 },
  },
  {
    id: "o3",
    title: "花束訂單",
    need: { wishBouquet: 1 },
    coins: 320,
    xp: 70,
    rep: 34,
    rare: { petals: 1 },
  },
];

const CHAPTERS = [
  { id: 1, title: "Chapter 1 種子甦醒", goal: "完成 2 張訂單，解鎖月光溫室", target: 2 },
  { id: 2, title: "Chapter 2 月光回來", goal: "解鎖水晶花田，製作願望花束", target: 1 },
  { id: 3, title: "Chapter 3 蝴蝶造訪", goal: "解鎖蝴蝶花徑，交付蝴蝶祝福", target: 1 },
  { id: 4, title: "Chapter 4 願望森林", goal: "解鎖星光祭壇，累積 200 聲望", target: 200 },
  { id: 5, title: "Chapter 5 內在之光", goal: "製作內在之光", target: 1 },
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function emptyInventory() {
  return { weeds: 0, seeds: 0, dew: 0, petals: 0, stardust: 0 };
}

function emptyProducts() {
  return { lightOrb: 0, soulFlower: 0, moonPearl: 0, wishBouquet: 0, butterflyBlessing: 0, innerLight: 0 };
}

function emptyTasks() {
  return { seeds: 0, flowers: 0, bouquets: 0, orders: 0, rewarded: false };
}

function defaultState() {
  return {
    coins: 0,
    reputation: 0,
    experience: 0,
    backpackLevel: 1,
    speedLevel: 1,
    machineLevel: 1,
    gatherFairyLevel: 0,
    transportFairyLevel: 0,
    sellFairyLevel: 0,
    gardenFairyLevel: 0,
    unlockedAreas: ["seed"],
    unlockedDecor: [],
    inventory: emptyInventory(),
    products: emptyProducts(),
    completedOrders: [],
    orderCycle: 0,
    chapter: 1,
    streak: 0,
    lastLoginDate: "",
    lastSeenAt: Date.now(),
    dailyTasks: emptyTasks(),
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      unlockedAreas: parsed.unlockedAreas?.length ? parsed.unlockedAreas : ["seed"],
      unlockedDecor: parsed.unlockedDecor || [],
      inventory: { ...emptyInventory(), ...(parsed.inventory || {}) },
      products: { ...emptyProducts(), ...(parsed.products || {}) },
      completedOrders: parsed.completedOrders || [],
      dailyTasks: { ...emptyTasks(), ...(parsed.dailyTasks || {}) },
      lastSeenAt: parsed.lastSeenAt || Date.now(),
    };
  } catch {
    return defaultState();
  }
}

function inventoryCount(state) {
  return Object.values(state.inventory).reduce((a, b) => a + b, 0);
}

function bagCap(state) {
  return BAG_CAP[state.backpackLevel - 1] || 10;
}

function hasItems(state, recipe) {
  return Object.entries(recipe).every(([key, count]) => {
    const bucket = state.inventory[key] !== undefined ? state.inventory : state.products;
    return (bucket[key] || 0) >= count;
  });
}

function takeItems(state, recipe) {
  const next = { ...state, inventory: { ...state.inventory }, products: { ...state.products } };
  Object.entries(recipe).forEach(([key, count]) => {
    if (next.inventory[key] !== undefined) next.inventory[key] -= count;
    else next.products[key] -= count;
  });
  return next;
}

function addProducts(state, key, count = 1) {
  return { ...state, products: { ...state.products, [key]: (state.products[key] || 0) + count } };
}

function addResources(state, key, count = 1) {
  return { ...state, inventory: { ...state.inventory, [key]: (state.inventory[key] || 0) + count } };
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function posStyle(x, y) {
  return { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` };
}

function getGardenLevel(rep) {
  if (rep >= 520) return { level: 5, name: "內在之光綻放" };
  if (rep >= 280) return { level: 4, name: "蝴蝶回來" };
  if (rep >= 120) return { level: 3, name: "花園開啟" };
  if (rep >= 40) return { level: 2, name: "微光發芽" };
  return { level: 1, name: "種子甦醒" };
}

function makeMachineState() {
  return Object.fromEntries(
    Object.entries(MACHINES).map(([id, m]) => [
      id,
      { ...m, active: false, startedAt: 0, duration: m.seconds * 1000, ready: 0 },
    ])
  );
}

function isAreaUnlocked(state, area) {
  return (state.unlockedAreas || ["seed"]).includes(area);
}

function unlockedOrders(state) {
  return ORDERS.filter((o) => {
    if (o.id === "o3") return isAreaUnlocked(state, "crystal");
    return true;
  });
}

function productValue(products) {
  return Object.entries(products).reduce((sum, [key, count]) => sum + (PRODUCTS[key]?.price || 0) * count, 0);
}

function calculateOffline(prev) {
  const minutes = Math.min(480, Math.max(0, (Date.now() - (prev.lastSeenAt || Date.now())) / 60000));
  const helperPower = prev.gatherFairyLevel + prev.transportFairyLevel + prev.sellFairyLevel + prev.gardenFairyLevel;
  if (minutes < 8 || helperPower <= 0) return { coins: 0, resources: {}, minutes: Math.round(minutes) };
  const areaBonus = (prev.unlockedAreas?.length || 1) * 3;
  const coins = Math.floor(minutes * (helperPower * 1.8 + areaBonus));
  const resources = { seeds: Math.min(20, Math.floor(minutes / 12) + prev.gatherFairyLevel * 2) };
  if (isAreaUnlocked(prev, "moon")) resources.dew = Math.min(12, Math.floor(minutes / 22) + prev.gatherFairyLevel);
  return { coins, resources, minutes: Math.round(minutes) };
}

function GameIcon({ type, label }) {
  return <span className={`soul-icon soul-icon-${type}`} aria-label={label || type} role="img" />;
}

export default function SoulGarden({ go }) {
  const [state, setState] = useState(() => loadState());
  const [player, setPlayer] = useState({ x: 190, y: 310 });
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [resources, setResources] = useState(() =>
    RESOURCE_POINTS.map((r) => ({ ...r, available: true, respawnAt: 0 }))
  );
  const [machines, setMachines] = useState(() => makeMachineState());
  const [panel, setPanel] = useState(null);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);
  const [liffName, setLiffName] = useState("");

  const stateRef = useRef(state);
  const playerRef = useRef(player);
  const joyRef = useRef({ x: 0, y: 0, active: false, pointer: null });
  const dragRef = useRef({ active: false, startX: 0, startY: 0 });
  const keysRef = useRef({});
  const cooldownRef = useRef({});
  const lastRef = useRef(performance.now());

  const cap = bagCap(state);
  const bagCount = inventoryCount(state);
  const gardenLevel = getGardenLevel(state.reputation);
  const currentChapter = CHAPTERS[Math.min((state.chapter || 1) - 1, CHAPTERS.length - 1)];
  const orders = useMemo(() => unlockedOrders(state), [state.unlockedAreas, state.orderCycle]);

  useEffect(() => {
    playerRef.current = player;
    setCamera({
      x: Math.max(0, Math.min(W - VIEW_W, player.x - VIEW_W / 2)),
      y: Math.max(0, Math.min(H - VIEW_H, player.y - VIEW_H / 2)),
    });
  }, [player]);

  useEffect(() => {
    stateRef.current = state;
    const id = window.setTimeout(() => {
      localStorage.setItem(STORE_KEY, JSON.stringify({ ...state, lastSeenAt: Date.now() }));
    }, 120);
    return () => window.clearTimeout(id);
  }, [state]);

  useEffect(() => {
    const id = import.meta.env.VITE_LINE_LIFF_ID || import.meta.env.NEXT_PUBLIC_LINE_LIFF_ID;
    if (!id || window.liff) return;
    const script = document.createElement("script");
    script.src = "https://static.line-scdn.net/liff/edge/2/sdk.js";
    script.async = true;
    script.onload = async () => {
      try {
        await window.liff.init({ liffId: id });
        if (window.liff.isLoggedIn()) {
          const profile = await window.liff.getProfile();
          setLiffName(profile.displayName || "");
        }
      } catch {
        setLiffName("");
      }
    };
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  useEffect(() => {
    const today = todayKey();
    setState((prev) => {
      let next = prev;
      const offline = calculateOffline(prev);
      if (offline.coins > 0) {
        next = {
          ...next,
          coins: next.coins + offline.coins,
          inventory: { ...next.inventory },
        };
        Object.entries(offline.resources).forEach(([key, count]) => {
          next.inventory[key] = Math.min((next.inventory[key] || 0) + count, bagCap(next));
        });
        setModal({
          title: "花園持續運作中",
          body: `你離開的 ${Math.max(1, Math.round(offline.minutes / 60))} 小時裡，花園精靈幫你累積了 ${offline.coins} Soul Coins`,
          cta: false,
        });
      }
      if (next.lastLoginDate === today) return { ...next, lastSeenAt: Date.now() };
      const continued = next.lastLoginDate === yesterdayKey();
      const nextStreak = continued ? (next.streak || 0) + 1 : 1;
      setModal({
        title: liffName ? `${liffName}，歡迎回到你的靈魂花園` : "歡迎回到你的靈魂花園",
        body: `${REMINDERS[Math.floor(Math.random() * REMINDERS.length)]}\n今日光種子 +5`,
        cta: false,
      });
      return {
        ...next,
        streak: nextStreak,
        lastLoginDate: today,
        lastSeenAt: Date.now(),
        dailyTasks: emptyTasks(),
        inventory: { ...next.inventory, seeds: Math.min((next.inventory.seeds || 0) + 5, bagCap(next)) },
      };
    });
  }, [liffName]);

  useEffect(() => {
    const down = (e) => {
      keysRef.current[e.key.toLowerCase()] = true;
    };
    const up = (e) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const flash = (message) => {
    setToast(message);
    window.clearTimeout(cooldownRef.current.toast);
    cooldownRef.current.toast = window.setTimeout(() => setToast(""), 1500);
  };

  const updateTask = (key, amount) => {
    setState((prev) => {
      const limit = key === "seeds" ? 10 : key === "flowers" ? 3 : key === "bouquets" ? 1 : 3;
      const tasks = { ...prev.dailyTasks, [key]: Math.min(limit, (prev.dailyTasks[key] || 0) + amount) };
      let next = { ...prev, dailyTasks: tasks };
      const done = tasks.seeds >= 10 && tasks.flowers >= 3 && tasks.bouquets >= 1 && tasks.orders >= 1;
      if (done && !tasks.rewarded) {
        next.coins += 100;
        next.reputation += 18;
        next.dailyTasks = { ...tasks, rewarded: true };
        setModal({
          title: liffName ? `${liffName}，今天你的靈魂花園又亮了一點` : "今天你的靈魂花園又亮了一點",
          body: "你照顧的不只是花園，也是正在慢慢回來的自己\nSoul Coins +100｜聲望 +18",
          cta: true,
        });
      }
      return next;
    });
  };

  const maybeAdvanceChapter = (next) => {
    if (next.chapter === 1 && next.completedOrders.length >= 2 && next.unlockedAreas.includes("moon")) {
      setModal({ title: "Chapter 2 月光回來", body: "你開始看見，那些沒有說出口的感受，也值得被慢慢照顧", cta: false });
      return { ...next, chapter: 2 };
    }
    if (next.chapter === 2 && next.unlockedAreas.includes("crystal") && (next.products.wishBouquet || 0) >= 1) {
      setModal({ title: "Chapter 3 蝴蝶造訪", body: "當你願意整理自己，新的路也會慢慢出現", cta: false });
      return { ...next, chapter: 3 };
    }
    if (next.chapter === 3 && next.unlockedAreas.includes("butterfly") && (next.products.butterflyBlessing || 0) >= 1) {
      setModal({ title: "Chapter 4 願望森林", body: "有些改變不是突然發生，而是你每天都往自己靠近一點", cta: true });
      return { ...next, chapter: 4 };
    }
    if (next.chapter === 4 && next.unlockedAreas.includes("altar") && next.reputation >= 200) {
      setModal({ title: "Chapter 5 內在之光", body: "你已經不是只在維持，而是在重新長出自己的方向", cta: true });
      return { ...next, chapter: 5 };
    }
    return next;
  };

  useEffect(() => {
    let raf = 0;
    const tick = (now) => {
      const dt = Math.min(40, now - lastRef.current) / 1000;
      lastRef.current = now;
      const current = stateRef.current;
      const speed = 138 * (SPEED_MULT[current.speedLevel - 1] || 1);
      const keys = keysRef.current;
      let vx = joyRef.current.x;
      let vy = joyRef.current.y;
      if (keys.arrowleft || keys.a) vx -= 1;
      if (keys.arrowright || keys.d) vx += 1;
      if (keys.arrowup || keys.w) vy -= 1;
      if (keys.arrowdown || keys.s) vy += 1;
      const len = Math.hypot(vx, vy);
      if (len > 0) {
        vx /= len;
        vy /= len;
        setPlayer((p) => ({
          x: Math.max(24, Math.min(W - 24, p.x + vx * speed * dt)),
          y: Math.max(56, Math.min(H - 36, p.y + vy * speed * dt)),
        }));
      }

      const p = playerRef.current;
      const nowMs = Date.now();
      const unlocked = new Set(stateRef.current.unlockedAreas || ["seed"]);

      setResources((prev) => {
        let changed = false;
        const next = prev.map((r) => {
          if (!r.available && nowMs >= r.respawnAt) {
            changed = true;
            return { ...r, available: true };
          }
          const capacity = bagCap(stateRef.current);
          if (r.available && unlocked.has(r.area) && inventoryCount(stateRef.current) < capacity && dist(p, r) < 42) {
            changed = true;
            setState((s) => addResources(s, r.type, 1));
            if (r.type === "seeds") updateTask("seeds", 1);
            flash(`收集 ${RESOURCES[r.type].name}`);
            return { ...r, available: false, respawnAt: nowMs + 3600 };
          }
          return r;
        });
        return changed ? next : prev;
      });

      setMachines((prev) => {
        let changed = false;
        const next = { ...prev };
        Object.entries(prev).forEach(([id, m]) => {
          if (!unlocked.has(m.area)) return;
          if (m.active && nowMs - m.startedAt >= m.duration) {
            changed = true;
            next[id] = { ...m, active: false, ready: (m.ready || 0) + 1 };
            flash(`${m.name} 完成 ${PRODUCTS[m.out].name}`);
            return;
          }
          if (!m.active && (m.ready || 0) > 0 && dist(p, { x: m.x + 22, y: m.y + 22 }) < 52) {
            changed = true;
            next[id] = { ...m, ready: m.ready - 1 };
            setState((s) => maybeAdvanceChapter(addProducts(s, m.out, 1)));
            if (m.out === "soulFlower") updateTask("flowers", 1);
            if (m.out === "wishBouquet") updateTask("bouquets", 1);
            flash(`收取 ${PRODUCTS[m.out].name}`);
            return;
          }
          if (!m.active && !m.ready && dist(p, m) < 52 && hasItems(stateRef.current, m.recipe)) {
            changed = true;
            const duration = m.seconds * 1000 * (MACHINE_MULT[stateRef.current.machineLevel - 1] || 1);
            next[id] = { ...m, active: true, startedAt: nowMs, duration };
            setState((s) => takeItems(s, m.recipe));
            flash(`${m.name} 開始加工`);
          }
        });
        return changed ? next : prev;
      });

      const shop = { x: 365, y: 344 };
      if (dist(p, shop) < 58 && !cooldownRef.current.shop) {
        const products = stateRef.current.products;
        const total = productValue(products);
        if (total > 0) {
          cooldownRef.current.shop = true;
          window.setTimeout(() => (cooldownRef.current.shop = false), 850);
          setState((s) => ({
            ...s,
            coins: s.coins + total,
            reputation: s.reputation + Math.max(1, Math.floor(total / 55)),
            products: emptyProducts(),
          }));
          flash(`販售完成 +${total} Soul Coins`);
        }
      }

      if (stateRef.current.gatherFairyLevel > 0 && nowMs - (cooldownRef.current.fairyGather || 0) > 5200 / stateRef.current.gatherFairyLevel) {
        cooldownRef.current.fairyGather = nowMs;
        const open = RESOURCE_POINTS.filter((r) => unlocked.has(r.area));
        const target = open[Math.floor(Math.random() * open.length)];
        if (target && inventoryCount(stateRef.current) < bagCap(stateRef.current)) {
          setState((s) => addResources(s, target.type, 1));
          if (target.type === "seeds") updateTask("seeds", 1);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [liffName]);

  const unlockArea = (area) => {
    setState((prev) => {
      const info = AREAS[area];
      if (!info || prev.unlockedAreas.includes(area) || prev.coins < info.price) return prev;
      const next = maybeAdvanceChapter({
        ...prev,
        coins: prev.coins - info.price,
        reputation: prev.reputation + 28,
        unlockedAreas: [...prev.unlockedAreas, area],
      });
      setModal({
        title: `${info.name} 已解鎖`,
        body: "新的道路打開了，花園也多了一個可以慢慢整理自己的地方",
        cta: true,
      });
      return next;
    });
  };

  const upgrade = (kind) => {
    setState((prev) => {
      if (kind === "bag") {
        const lvl = prev.backpackLevel + 1;
        const cost = BAG_COST[lvl - 1];
        if (!cost || prev.coins < cost) return prev;
        flash("背包變大了");
        return { ...prev, coins: prev.coins - cost, backpackLevel: lvl, reputation: prev.reputation + 6 };
      }
      if (kind === "speed") {
        const lvl = prev.speedLevel + 1;
        const cost = SPEED_COST[lvl - 1];
        if (!cost || prev.coins < cost) return prev;
        flash("移動更輕盈了");
        return { ...prev, coins: prev.coins - cost, speedLevel: lvl, reputation: prev.reputation + 8 };
      }
      const lvl = prev.machineLevel + 1;
      const cost = MACHINE_COST[lvl - 1];
      if (!cost || prev.coins < cost) return prev;
      flash("產線變快了");
      return { ...prev, coins: prev.coins - cost, machineLevel: lvl, reputation: prev.reputation + 10 };
    });
  };

  const buyFairy = (kind) => {
    setState((prev) => {
      const key = `${kind}FairyLevel`;
      const lvl = (prev[key] || 0) + 1;
      const cost = FAIRY_COST[lvl];
      if (!cost || prev.coins < cost) return prev;
      flash("小精靈加入花園");
      return { ...prev, coins: prev.coins - cost, [key]: lvl, reputation: prev.reputation + 20 };
    });
  };

  const buyDecor = (key) => {
    setState((prev) => {
      const cost = DECO_COST[key];
      if (!cost || prev.coins < cost || prev.unlockedDecor.includes(key)) return prev;
      flash("花園多了一個新的角落");
      return { ...prev, coins: prev.coins - cost, unlockedDecor: [...prev.unlockedDecor, key], reputation: prev.reputation + 14 };
    });
  };

  const completeOrder = (order) => {
    setState((prev) => {
      if (!hasItems(prev, order.need)) return prev;
      let next = takeItems(prev, order.need);
      next.coins += order.coins;
      next.experience += order.xp;
      next.reputation += order.rep;
      next.completedOrders = [...next.completedOrders, `${order.id}-${Date.now()}`];
      Object.entries(order.rare || {}).forEach(([key, count]) => {
        next = addResources(next, key, count);
      });
      next.orderCycle += 1;
      const tasks = {
        ...next.dailyTasks,
        orders: Math.min(1, (next.dailyTasks.orders || 0) + 1),
      };
      next.dailyTasks = tasks;
      if (tasks.seeds >= 10 && tasks.flowers >= 3 && tasks.bouquets >= 1 && tasks.orders >= 1 && !tasks.rewarded) {
        next.coins += 100;
        next.reputation += 18;
        next.dailyTasks = { ...tasks, rewarded: true };
        setModal({
          title: liffName ? `${liffName}，今天你的靈魂花園又亮了一點` : "今天你的靈魂花園又亮了一點",
          body: "你照顧的不只是花園，也是正在慢慢回來的自己\nSoul Coins +100｜聲望 +18",
          cta: true,
        });
      }
      flash(`完成訂單 +${order.coins} Soul Coins`);
      return maybeAdvanceChapter(next);
    });
  };

  const shareToday = async () => {
    const text = `我今天照顧了自己的靈魂花園\n今天獲得：${stateRef.current.coins} Soul Coins\n連續照顧：${stateRef.current.streak} 天\n你也來照顧你的內在世界`;
    try {
      if (window.liff?.isInClient?.() && window.liff?.shareTargetPicker) {
        await window.liff.shareTargetPicker([{ type: "text", text }]);
        return;
      }
    } catch {}
    navigator.clipboard?.writeText(text);
    flash("已複製今日成果");
  };

  const joystickStart = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    joyRef.current = { ...joyRef.current, active: true, pointer: e.pointerId };
  };

  const joystickMove = (e) => {
    if (!joyRef.current.active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setDirectionFromDelta(e.clientX - cx, e.clientY - cy, e.currentTarget);
  };

  const joystickEnd = (e) => {
    joyRef.current = { x: 0, y: 0, active: false, pointer: null };
    e.currentTarget.style.setProperty("--jx", "0px");
    e.currentTarget.style.setProperty("--jy", "0px");
  };

  const setDirectionFromDelta = (dx, dy, el) => {
    const max = 34;
    const len = Math.hypot(dx, dy) || 1;
    joyRef.current = { active: true, pointer: joyRef.current.pointer, x: Math.max(-1, Math.min(1, dx / max)), y: Math.max(-1, Math.min(1, dy / max)) };
    if (el) {
      el.style.setProperty("--jx", `${Math.min(max, (dx / len) * Math.min(len, max))}px`);
      el.style.setProperty("--jy", `${Math.min(max, (dy / len) * Math.min(len, max))}px`);
    }
  };

  const mapPointerDown = (e) => {
    if (e.target.closest("button") || e.target.closest(".soul-joystick")) return;
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY };
    joyRef.current = { ...joyRef.current, active: true };
  };

  const mapPointerMove = (e) => {
    if (!dragRef.current.active) return;
    setDirectionFromDelta(e.clientX - dragRef.current.startX, e.clientY - dragRef.current.startY, null);
  };

  const mapPointerUp = () => {
    dragRef.current = { active: false, startX: 0, startY: 0 };
    joyRef.current = { x: 0, y: 0, active: false, pointer: null };
  };

  const taskText = [
    `收集光種子 ${Math.min(state.dailyTasks.seeds || 0, 10)}/10`,
    `製作靈魂小花 ${Math.min(state.dailyTasks.flowers || 0, 3)}/3`,
    `販售願望花束 ${Math.min(state.dailyTasks.bouquets || 0, 1)}/1`,
    `完成訂單 ${Math.min(state.dailyTasks.orders || 0, 1)}/1`,
  ];

  const unlocked = new Set(state.unlockedAreas);

  return (
    <div className="soul-garden-page">
      <div className="soul-phone">
        <header className="soul-top">
          <div>
            <strong>Sofia 靈魂花園工坊</strong>
            <span>{liffName ? `${liffName}，歡迎回來` : `${gardenLevel.name} · Lv.${gardenLevel.level}`}</span>
          </div>
          <button className="soul-settings-btn" onClick={() => setPanel("settings")} aria-label="設定" />
        </header>

        <div className="soul-status">
          <div><GameIcon type="coin" /> {state.coins}</div>
          <div><GameIcon type="reputation" /> {state.reputation}</div>
          <div><GameIcon type="bag" /> {bagCount}/{cap}</div>
          <div><GameIcon type="streak" /> {state.streak} 天</div>
        </div>

        <div
          className="soul-map"
          onPointerDown={mapPointerDown}
          onPointerMove={mapPointerMove}
          onPointerUp={mapPointerUp}
          onPointerCancel={mapPointerUp}
        >
          <div className="soul-world" style={{ transform: `translate(${-camera.x}px, ${-camera.y}px)` }}>
            {Object.entries(AREAS).map(([id, area]) => (
              <div
                key={id}
                className={`soul-area soul-area-${id} ${unlocked.has(id) ? "is-open" : "is-locked"}`}
                style={{ left: area.x, top: area.y, width: area.w, height: area.h }}
              >
                <span>{area.name}</span>
                {!unlocked.has(id) && <button onClick={() => unlockArea(id)}>{area.price} 解鎖</button>}
              </div>
            ))}

            <div className="soul-path soul-path-a" />
            <div className="soul-path soul-path-b" />
            <div className="soul-path soul-path-c" />

            {resources.map((r) => (
              <div key={r.id} className={`soul-resource ${r.available && unlocked.has(r.area) ? "" : "is-hidden"}`} style={posStyle(r.x, r.y)}>
                <GameIcon type={RESOURCES[r.type].icon} label={RESOURCES[r.type].name} />
              </div>
            ))}

            {Object.entries(machines).map(([id, m]) => {
              const progress = m.active ? Math.min(100, ((Date.now() - m.startedAt) / m.duration) * 100) : 0;
              return (
                <div key={id} className={`soul-machine ${unlocked.has(m.area) ? "" : "is-hidden"}`} style={posStyle(m.x, m.y)}>
                  <GameIcon type={m.icon} label={m.name} />
                  <small>{m.name}</small>
                  {m.active && <div className="soul-progress"><i style={{ width: `${progress}%` }} /></div>}
                  {(m.ready || 0) > 0 && <b className="soul-ready"><GameIcon type={PRODUCTS[m.out].icon} /></b>}
                </div>
              );
            })}

            <div className="soul-shop" style={posStyle(365, 344)}>
              <GameIcon type="shop" />
              <small>販售小亭</small>
            </div>

            {state.unlockedDecor.includes("moonLamp") && <Decor type="moonLamp" x={510} y={95} />}
            {state.unlockedDecor.includes("crystalPillar") && <Decor type="crystalPillar" x={210} y={675} />}
            {state.unlockedDecor.includes("butterflyChair") && <Decor type="butterflyChair" x={725} y={610} />}
            {state.unlockedDecor.includes("flowerArch") && <Decor type="flowerArch" x={320} y={410} />}
            {state.unlockedDecor.includes("starPond") && <Decor type="starPond" x={145} y={1030} />}
            {state.unlockedDecor.includes("quietPavilion") && <Decor type="quietPavilion" x={660} y={1040} />}

            {state.gatherFairyLevel > 0 && <div className="soul-fairy soul-fairy-a" style={posStyle(player.x - 50, player.y - 34)} />}
            <div className="soul-player" style={posStyle(player.x, player.y)} aria-label="玩家角色" />
            <div className="soul-sparkles" />
          </div>
          <div className="soul-side-tabs">
            <button
              onClick={() =>
                setModal({
                  title: "每日光種子",
                  body: state.dailyTasks.rewarded
                    ? "今天的花園已經被你照顧過了，明天再回來領新的光種子。"
                    : "今天回到花園，完成任務後可以領取 Soul Coins 與一則療癒提醒。",
                })
              }
            >
              <GameIcon type="gift" />
              <span>每日</span>
            </button>
            <button onClick={() => setPanel("orders")}>
              <GameIcon type="task" />
              <span>任務</span>
            </button>
          </div>
        </div>

        <div className="soul-hud">
          <div className="soul-chapter">
            <strong>{currentChapter.title}</strong>
            <span>{currentChapter.goal}</span>
          </div>
          <button onClick={() => setPanel("orders")}>訂單板</button>
        </div>

        <div className="soul-bottom">
          <div className="soul-tasks">
            <div>
              <strong>每日任務</strong>
              <span>{state.dailyTasks.rewarded ? "已完成" : "自然遊玩即可完成"}</span>
            </div>
            {taskText.map((task) => <p key={task}>{task}</p>)}
          </div>
        </div>

        <div
          className="soul-joystick"
          onPointerDown={joystickStart}
          onPointerMove={joystickMove}
          onPointerUp={joystickEnd}
          onPointerCancel={joystickEnd}
        >
          <i />
        </div>

        <div className="soul-actions">
          <button onClick={() => setPanel("upgrades")}>升級</button>
          <button onClick={() => setPanel("fairies")}>精靈</button>
          <button onClick={() => setPanel("decor")}>裝飾</button>
          <button onClick={() => setPanel("bag")}>背包</button>
        </div>

        {toast && <div className="soul-toast">{toast}</div>}

        {panel && (
          <div className="soul-modal">
            <div className="soul-modal-card">
              <button className="soul-close" onClick={() => setPanel(null)}>×</button>
              {panel === "upgrades" && (
                <>
                  <h2>升級系統</h2>
                  <UpgradeRow title="背包容量" level={state.backpackLevel} max={5} cost={BAG_COST[state.backpackLevel]} onClick={() => upgrade("bag")} />
                  <UpgradeRow title="移動速度" level={state.speedLevel} max={4} cost={SPEED_COST[state.speedLevel]} onClick={() => upgrade("speed")} />
                  <UpgradeRow title="加工速度" level={state.machineLevel} max={4} cost={MACHINE_COST[state.machineLevel]} onClick={() => upgrade("machine")} />
                </>
              )}
              {panel === "fairies" && (
                <>
                  <h2>精靈管理</h2>
                  <FairyRow title="採集精靈" level={state.gatherFairyLevel} onClick={() => buyFairy("gather")} />
                  <FairyRow title="搬運精靈" level={state.transportFairyLevel} onClick={() => buyFairy("transport")} disabled />
                  <FairyRow title="販售精靈" level={state.sellFairyLevel} onClick={() => buyFairy("sell")} disabled />
                  <FairyRow title="花園精靈" level={state.gardenFairyLevel} onClick={() => buyFairy("garden")} disabled />
                  <p className="soul-note">第一版先開放採集精靈，之後可以擴充搬運與販售自動化。</p>
                </>
              )}
              {panel === "decor" && (
                <>
                  <h2>裝飾商店</h2>
                  <DecorRow title="月亮燈" value="收益 +5%" cost={DECO_COST.moonLamp} owned={state.unlockedDecor.includes("moonLamp")} onClick={() => buyDecor("moonLamp")} />
                  <DecorRow title="水晶柱" value="稀有素材 +3%" cost={DECO_COST.crystalPillar} owned={state.unlockedDecor.includes("crystalPillar")} onClick={() => buyDecor("crystalPillar")} />
                  <DecorRow title="蝴蝶椅" value="聲望 +5%" cost={DECO_COST.butterflyChair} owned={state.unlockedDecor.includes("butterflyChair")} onClick={() => buyDecor("butterflyChair")} />
                  <DecorRow title="花拱門" value="加工速度 +5%" cost={DECO_COST.flowerArch} owned={state.unlockedDecor.includes("flowerArch")} onClick={() => buyDecor("flowerArch")} />
                  <DecorRow title="星光池" value="離線收益 +10%" cost={DECO_COST.starPond} owned={state.unlockedDecor.includes("starPond")} onClick={() => buyDecor("starPond")} />
                  <DecorRow title="靜心亭" value="全收益 +8%" cost={DECO_COST.quietPavilion} owned={state.unlockedDecor.includes("quietPavilion")} onClick={() => buyDecor("quietPavilion")} />
                </>
              )}
              {panel === "orders" && (
                <>
                  <h2>每日訂單</h2>
                  <p className="soul-note">交付商品會獲得 Soul Coins、經驗值與花園聲望。</p>
                  {orders.map((order) => <OrderCard key={order.id} order={order} state={state} onClick={() => completeOrder(order)} />)}
                </>
              )}
              {panel === "bag" && (
                <>
                  <h2>背包內容</h2>
                  <InventoryList title="資源" data={state.inventory} labels={RESOURCES} />
                  <InventoryList title="商品" data={state.products} labels={PRODUCTS} />
                </>
              )}
              {panel === "settings" && (
                <>
                  <h2>花園設定</h2>
                  <p>進度會先保存在這台裝置裡。後續可以接會員資料庫與 LIFF。</p>
                  <button className="soul-soft-btn" onClick={() => setPanel(null)}>回到花園</button>
                </>
              )}
            </div>
          </div>
        )}

        {modal && (
          <div className="soul-modal">
            <div className="soul-modal-card">
              <button className="soul-close" onClick={() => setModal(null)}>×</button>
              <h2>{modal.title}</h2>
              {modal.body.split("\n").map((line) => <p key={line}>{line}</p>)}
              {modal.cta && (
                <div className="soul-cta-list">
                  <button onClick={shareToday}>分享今日成果到 LINE 好友</button>
                  <button onClick={() => go?.("apply")}>預約初談</button>
                  <button onClick={() => go?.("frequency")}>了解 TimeWaver 頻率調整</button>
                  <button onClick={() => go?.("deep")}>了解 90 天陪伴旅程</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UpgradeRow({ title, level, max, cost, onClick }) {
  const done = level >= max;
  return (
    <div className="soul-upgrade-row">
      <div>
        <strong>{title}</strong>
        <span>Level {level}</span>
      </div>
      <button disabled={done || !cost} onClick={onClick}>{done ? "已滿級" : `${cost} Soul Coins`}</button>
    </div>
  );
}

function FairyRow({ title, level, onClick, disabled }) {
  const nextCost = FAIRY_COST[level + 1];
  return (
    <div className={`soul-upgrade-row ${disabled ? "is-muted" : ""}`}>
      <div>
        <strong>{title}</strong>
        <span>{disabled ? "預留擴充" : `Level ${level}`}</span>
      </div>
      <button disabled={disabled || !nextCost} onClick={onClick}>{disabled ? "即將開放" : level ? `${nextCost} 升級` : `${nextCost} 雇用`}</button>
    </div>
  );
}

function DecorRow({ title, value, cost, owned, onClick }) {
  return (
    <div className="soul-upgrade-row">
      <div>
        <strong>{title}</strong>
        <span>{value}</span>
      </div>
      <button disabled={owned} onClick={onClick}>{owned ? "已放置" : `${cost} Soul Coins`}</button>
    </div>
  );
}

function OrderCard({ order, state, onClick }) {
  const ready = hasItems(state, order.need);
  return (
    <div className="soul-order-card">
      <div>
        <strong>{order.title}</strong>
        <span>{Object.entries(order.need).map(([key, count]) => `${PRODUCTS[key]?.name} x${count}`).join("、")}</span>
      </div>
      <p>+{order.coins} Coins｜聲望 +{order.rep}</p>
      <button disabled={!ready} onClick={onClick}>{ready ? "交付訂單" : "材料不足"}</button>
    </div>
  );
}

function InventoryList({ title, data, labels }) {
  return (
    <div className="soul-inventory">
      <h3>{title}</h3>
      {Object.entries(data).map(([key, count]) => (
        <div key={key}>
          <span><GameIcon type={labels[key]?.icon} label={labels[key]?.name} /> {labels[key]?.name}</span>
          <strong>{count}</strong>
        </div>
      ))}
    </div>
  );
}

function Decor({ type, x, y }) {
  return <div className={`soul-decor soul-decor-${type}`} style={posStyle(x, y)} />;
}
