import { useEffect, useMemo, useRef, useState } from "react";
import "./becoming.css";
import {
  createIslandState,
  createWorldProfile,
  evolveWorld,
  getWorldRenderState,
  normalizeWorldProfile,
  processGrowthQueue,
} from "./worldEngine.js";

const STORAGE_KEY = "becomingState";
const VERSION = "0.4";

const STATES = [
  { id: "sad", label: "我有點難過", description: "心裡像下著一場安靜的雨。", tone: "rain", sceneIndex: 0 },
  { id: "angry", label: "我有點生氣", description: "有些界線，正在提醒我自己很重要。", tone: "amber", sceneIndex: 1 },
  { id: "anxious", label: "我有點焦慮", description: "心跑得比較快，需要慢慢回來。", tone: "breath", sceneIndex: 2 },
  { id: "helpless", label: "我覺得無奈", description: "有些事情暫時改變不了，但我可以陪自己走過。", tone: "sand", sceneIndex: 3 },
  { id: "regret", label: "我有些懊悔", description: "我正在學習，如何對過去溫柔一點。", tone: "mist", sceneIndex: 4 },
  { id: "tired", label: "我真的累了", description: "今天的我，需要先被放回第一位。", tone: "moon", sceneIndex: 5 },
  { id: "lost", label: "我有點迷惘", description: "看不清方向時，也可以先看見腳下。", tone: "fog", sceneIndex: 6 },
  { id: "companionship", label: "我想被陪伴", description: "我可以允許自己，不必什麼都一個人扛。", tone: "rose", sceneIndex: 7 },
  { id: "peace", label: "我感到平靜", description: "今天的心，有一點安穩的空間。", tone: "sage", sceneIndex: 8 },
  { id: "strength", label: "我今天有力量", description: "我感覺自己，可以往前一步。", tone: "sun", sceneIndex: 9 },
  { id: "expectation", label: "我充滿期待", description: "我對今天，還保有一點好奇。", tone: "dawn", sceneIndex: 10 },
  { id: "gratitude", label: "我今天充滿感謝", description: "我想好好珍惜，此刻擁有的一切。", tone: "gold", sceneIndex: 11 },
];

const CARE_OPTIONS_MAP = {
  "我有點難過": ["一點陪伴", "允許自己哭一下", "一份溫柔", "一點希望"],
  "我有點生氣": ["一次深呼吸", "一點空間", "一份理解", "一個界線"],
  "我有點焦慮": ["慢一點", "一份安心", "一次深呼吸", "相信自己"],
  "我覺得無奈": ["一點接受", "一份耐心", "一個小小選擇", "先不用解決"],
  "我有些懊悔": ["一次原諒", "一份學習", "再給自己一次機會", "放下昨天"],
  "我真的累了": ["一段休息", "慢慢呼吸", "什麼都不必急", "把自己放回第一位"],
  "我有點迷惘": ["一點方向", "一份好奇", "先走一步", "相信會慢慢清楚"],
  "我想被陪伴": ["一份連結", "一點靠近", "一句真心話", "允許自己需要人"],
  "我感到平靜": ["一份珍惜", "一點感謝", "慢慢感受", "留住這份安定"],
  "我今天有力量": ["一步勇敢", "一個行動", "相信自己的力量", "把光分享出去"],
  "我充滿期待": ["一份好奇", "一個新的開始", "一點冒險", "打開今天的可能"],
  "我今天充滿感謝": ["珍惜當下", "分享溫暖", "把愛說出口", "記住今天"],
};

const CARE_DESCRIPTIONS = {
  "一點陪伴": "讓自己知道，現在不是孤單的。",
  "允許自己哭一下": "眼淚也是身體替心說話。",
  "一份溫柔": "今天先不要對自己太用力。",
  "一點希望": "就算很小，也值得被留下。",
  "一次深呼吸": "先讓身體知道，現在是安全的。",
  "一點空間": "不是逃避，是讓自己有地方整理。",
  "一份理解": "先不急著責怪自己。",
  "一個界線": "我可以保護自己的感受。",
  "慢一點": "不用急著追上誰，先回到自己的節奏。",
  "一份安心": "讓心知道，現在可以先停在這裡。",
  "相信自己": "你已經走過很多，今天也可以慢慢來。",
  "一點接受": "有些事暫時如此，也不代表你無能為力。",
  "一份耐心": "答案不一定今天就出現。",
  "一個小小選擇": "就算很小，也是你把自己帶回來的一步。",
  "先不用解決": "有些時候，先陪著自己就已經很好。",
  "一次原諒": "你可以學習，也可以不再反覆懲罰自己。",
  "一份學習": "過去不是為了困住你，而是提醒你怎麼更懂自己。",
  "再給自己一次機會": "你不是只能被昨天定義。",
  "放下昨天": "把昨天放回昨天，今天重新呼吸。",
  "一段休息": "休息不是退後，是替自己補回力量。",
  "慢慢呼吸": "先不急著振作，先讓身體回來。",
  "什麼都不必急": "今天可以慢一點，真的可以。",
  "把自己放回第一位": "你也需要被照顧，不只是照顧別人。",
  "一點方向": "不用看見全部，只要看見下一步。",
  "一份好奇": "迷惘裡，也可能藏著新的可能。",
  "先走一步": "路會在你走的時候，慢慢清楚。",
  "相信會慢慢清楚": "看不清，不代表沒有路。",
  "一份連結": "你可以被理解，也可以讓人靠近一點。",
  "一點靠近": "不用一次全說出口，靠近一點就好。",
  "一句真心話": "真心話會讓關係有光進來。",
  "允許自己需要人": "需要陪伴不是脆弱，是你仍然願意連結。",
  "一份珍惜": "把今天的安穩，輕輕收進心裡。",
  "一點感謝": "看見已經擁有的，也是一種力量。",
  "慢慢感受": "不用急著往下一站，現在也很值得。",
  "留住這份安定": "讓這份平靜，在心裡多停留一下。",
  "一步勇敢": "不需要很大步，只要真的往前一點。",
  "一個行動": "力量會在行動裡被自己看見。",
  "相信自己的力量": "你比自己想像的，更能穿越此刻。",
  "把光分享出去": "當你有力量時，也可以成為別人的微光。",
  "一個新的開始": "今天也可以是新的起點。",
  "一點冒險": "你可以試著打開一扇新的門。",
  "打開今天的可能": "把今天交給可能，而不是交給害怕。",
  "珍惜當下": "今天的一切，都值得慢慢感受。",
  "分享溫暖": "把心裡的光，傳遞給另一個人。",
  "把愛說出口": "有些話，今天很適合說。",
  "記住今天": "把這份美好，留在心裡久一點。",
};

const LIFE_MARKS = [
  { id: "sad-rain-light-flower", name: "雨光花", state: "我有點難過", careThemes: ["一點陪伴", "允許自己哭一下", "一份溫柔", "一點希望"], description: "只在心裡下過雨的日子裡盛開，花瓣會留下柔柔的光。", quote: "你的難過，不需要被趕走，它也值得被溫柔地接住。", rarity: "common", visualType: "flower", colorTheme: "rain-blue" },
  { id: "sad-lakeside-lamp", name: "湖邊小燈", state: "我有點難過", careThemes: ["一點陪伴", "一份溫柔"], description: "在安靜的湖邊亮著，提醒你此刻不是一個人。", quote: "有人懂你之前，你也可以先陪陪自己。", rarity: "common", visualType: "lamp", colorTheme: "warm-blue" },
  { id: "sad-soft-moss", name: "溫柔苔蘚", state: "我有點難過", careThemes: ["允許自己哭一下", "一份溫柔"], description: "在雨後悄悄長出，柔軟地接住每一滴落下的心情。", quote: "眼淚不是退步，是心正在找到出口。", rarity: "rare", visualType: "leaf", colorTheme: "moss-green" },
  { id: "sad-white-feather", name: "白色羽毛", state: "我有點難過", careThemes: ["一點希望", "一點陪伴"], description: "從很遠的地方飄來，輕輕停在你的世界裡。", quote: "就算今天很低，也仍有一點光願意靠近你。", rarity: "special", visualType: "feather", colorTheme: "soft-white" },
  { id: "angry-amber-sprout", name: "琥珀樹芽", state: "我有點生氣", careThemes: ["一次深呼吸", "一點空間", "一份理解", "一個界線"], description: "雷雨之後才會冒出的新芽，帶著清醒而堅定的光。", quote: "生氣不是壞事，它正在告訴你，有些界線很重要。", rarity: "common", visualType: "seed", colorTheme: "amber" },
  { id: "angry-wind-leaf", name: "風之葉", state: "我有點生氣", careThemes: ["一點空間", "一次深呼吸"], description: "被風吹亮的葉子，替心裡擁擠的地方開出空間。", quote: "你可以先退一步，不是認輸，是保護自己。", rarity: "common", visualType: "leaf", colorTheme: "wind-green" },
  { id: "angry-after-thunder-crystal", name: "雷後晶石", state: "我有點生氣", careThemes: ["一份理解", "一個界線"], description: "只有在雷聲過後才會浮現，內側藏著清楚的邊界。", quote: "有些憤怒，是你終於聽見自己了。", rarity: "rare", visualType: "crystal", colorTheme: "storm-gold" },
  { id: "angry-boundary-stone", name: "界線小石", state: "我有點生氣", careThemes: ["一個界線", "一點空間"], description: "小小一顆，卻能替你的世界留下剛剛好的距離。", quote: "界線不是拒絕愛，而是讓愛不要傷到自己。", rarity: "special", visualType: "stone", colorTheme: "earth-gold" },
  { id: "anxious-wind-seed", name: "風種子", state: "我有點焦慮", careThemes: ["慢一點", "一份安心", "一次深呼吸", "相信自己"], description: "在風裡旋轉的小種子，等到心慢下來就會落地。", quote: "焦慮不是你太糟，而是心跑得比身體更快了一點。", rarity: "common", visualType: "seed", colorTheme: "mist-green" },
  { id: "anxious-safe-light", name: "安心光點", state: "我有點焦慮", careThemes: ["一份安心", "一次深呼吸"], description: "一閃一閃地停在路邊，像在提醒你此刻可以先呼吸。", quote: "先讓身體知道，現在是安全的。", rarity: "common", visualType: "light", colorTheme: "soft-gold" },
  { id: "anxious-slow-grass", name: "慢慢草", state: "我有點焦慮", careThemes: ["慢一點", "相信自己"], description: "長得很慢，卻每一天都沒有停止。", quote: "慢不是落後，是用自己的節奏走回穩定。", rarity: "rare", visualType: "leaf", colorTheme: "sage" },
  { id: "anxious-breath-crystal", name: "呼吸水晶", state: "我有點焦慮", careThemes: ["一次深呼吸", "一份安心"], description: "會隨著呼吸微微明暗的水晶，安靜地陪心回來。", quote: "呼吸還在，你就還有地方可以回來。", rarity: "special", visualType: "crystal", colorTheme: "breath-blue" },
  { id: "helpless-turning-path", name: "轉彎小路", state: "我覺得無奈", careThemes: ["一點接受", "一份耐心", "一個小小選擇", "先不用解決"], description: "看起來繞了一點，卻會帶你去沒想過的地方。", quote: "有些路不是走錯，只是還沒看見轉彎後的風景。", rarity: "common", visualType: "path", colorTheme: "sand" },
  { id: "helpless-acceptance-stone", name: "接受之石", state: "我覺得無奈", careThemes: ["一點接受", "先不用解決"], description: "安靜地躺在路旁，承認此刻就是這樣。", quote: "接受不是放棄，是先停止和自己對抗。", rarity: "common", visualType: "stone", colorTheme: "warm-gray" },
  { id: "helpless-soft-vine", name: "柔軟藤蔓", state: "我覺得無奈", careThemes: ["一份耐心", "一個小小選擇"], description: "不急著往上爬，只在可以前進的地方慢慢伸展。", quote: "你不用一次找到全部答案，先照顧下一小步。", rarity: "rare", visualType: "leaf", colorTheme: "olive" },
  { id: "helpless-blank-flower", name: "留白花", state: "我覺得無奈", careThemes: ["先不用解決", "一點接受"], description: "花瓣中間有一塊空白，像在替未知留下位置。", quote: "不是每件事都需要今天被解決。", rarity: "special", visualType: "flower", colorTheme: "cream" },
  { id: "regret-forgiveness-seed", name: "原諒種子", state: "我有些懊悔", careThemes: ["一次原諒", "一份學習", "再給自己一次機會", "放下昨天"], description: "從一個很小的遺憾裡長出，等待你重新善待自己。", quote: "你可以記得教訓，但不必永遠懲罰自己。", rarity: "common", visualType: "seed", colorTheme: "soft-green" },
  { id: "regret-yesterday-leaf", name: "昨日落葉", state: "我有些懊悔", careThemes: ["放下昨天", "一次原諒"], description: "從昨天落下，最後成為今天土壤的一部分。", quote: "昨天沒有消失，它正在變成你更懂自己的養分。", rarity: "common", visualType: "leaf", colorTheme: "autumn" },
  { id: "regret-new-sprout", name: "新生嫩芽", state: "我有些懊悔", careThemes: ["再給自己一次機會", "一份學習"], description: "在舊土裡冒出的新芽，提醒你仍然可以重新開始。", quote: "做錯不代表結束，有時它只是另一種開始。", rarity: "rare", visualType: "seed", colorTheme: "new-green" },
  { id: "regret-white-mist-crystal", name: "白霧水晶", state: "我有些懊悔", careThemes: ["一次原諒", "放下昨天"], description: "藏在白霧裡的水晶，靠近時會慢慢變清澈。", quote: "原諒自己，不是忘記，而是願意重新看見自己。", rarity: "special", visualType: "crystal", colorTheme: "mist-white" },
  { id: "tired-moon-bench", name: "月光長椅", state: "我真的累了", careThemes: ["一段休息", "慢慢呼吸", "什麼都不必急", "把自己放回第一位"], description: "月光下的一張椅子，專門留給終於願意停下來的人。", quote: "你不需要一直撐著，休息也是前進的一部分。", rarity: "common", visualType: "stone", colorTheme: "moon-blue" },
  { id: "tired-rest-cabin", name: "休息小屋", state: "我真的累了", careThemes: ["一段休息", "把自己放回第一位"], description: "森林深處的小屋，裡面沒有催促，只有一盞溫暖的燈。", quote: "今天先回到自己身邊，不必急著照顧全世界。", rarity: "rare", visualType: "lamp", colorTheme: "warm-cream" },
  { id: "tired-slow-light-leaf", name: "慢光葉", state: "我真的累了", careThemes: ["慢慢呼吸", "什麼都不必急"], description: "葉脈裡流著很慢的光，讓時間也變柔和。", quote: "慢下來不是浪費，是讓生命重新充電。", rarity: "common", visualType: "leaf", colorTheme: "pale-gold" },
  { id: "tired-stillness-stone", name: "靜心石", state: "我真的累了", careThemes: ["什麼都不必急", "一段休息"], description: "安靜得像一個深呼吸，適合在旁邊坐一會兒。", quote: "什麼都不做的時候，你也仍然值得被愛。", rarity: "special", visualType: "stone", colorTheme: "quiet-gray" },
  { id: "lost-distant-light", name: "遠方微光", state: "我有點迷惘", careThemes: ["一點方向", "一份好奇", "先走一步", "相信會慢慢清楚"], description: "在霧裡若隱若現，不催你，只讓你知道前方還有路。", quote: "看不清全部時，看見下一步就夠了。", rarity: "common", visualType: "light", colorTheme: "fog-gold" },
  { id: "lost-guiding-stardust", name: "指引星砂", state: "我有點迷惘", careThemes: ["一點方向", "相信會慢慢清楚"], description: "散落在小路上的星砂，會在你靠近時微微發亮。", quote: "不是沒有方向，只是方向還在慢慢浮現。", rarity: "common", visualType: "light", colorTheme: "star" },
  { id: "lost-fog-path", name: "霧中小路", state: "我有點迷惘", careThemes: ["先走一步", "一份好奇"], description: "一條藏在霧裡的小路，只會在你願意前進時出現。", quote: "路不是想清楚才出現，有時是走著走著才長出來。", rarity: "rare", visualType: "path", colorTheme: "mist" },
  { id: "lost-curiosity-seed", name: "好奇種子", state: "我有點迷惘", careThemes: ["一份好奇", "先走一步"], description: "不知道會長成什麼，卻因此值得被種下。", quote: "迷惘裡也有入口，叫做好奇。", rarity: "special", visualType: "seed", colorTheme: "curiosity-green" },
  { id: "companionship-near-light", name: "靠近小燈", state: "我想被陪伴", careThemes: ["一份連結", "一點靠近", "一句真心話", "允許自己需要人"], description: "一盞會慢慢靠近你的燈，亮度剛好，不刺眼也不疏離。", quote: "你可以需要人，這不是脆弱，是心還願意連結。", rarity: "common", visualType: "lamp", colorTheme: "warm-pink" },
  { id: "companionship-connection-vine", name: "連結藤蔓", state: "我想被陪伴", careThemes: ["一份連結", "一點靠近"], description: "從兩個地方同時長出，最後在中間輕輕相遇。", quote: "靠近不必用力，只要真實一點。", rarity: "common", visualType: "leaf", colorTheme: "soft-olive" },
  { id: "companionship-warm-feather", name: "溫暖羽毛", state: "我想被陪伴", careThemes: ["允許自己需要人", "一句真心話"], description: "帶著體溫的羽毛，像一句沒有說出口的我在。", quote: "有些陪伴不需要很多話，只要不離開。", rarity: "rare", visualType: "feather", colorTheme: "warm-white" },
  { id: "companionship-echo-flower", name: "回聲花", state: "我想被陪伴", careThemes: ["一句真心話", "一份連結"], description: "你說出的真心話，會在花瓣裡變成柔柔的回聲。", quote: "當你願意說真話，世界就多了一個靠近你的入口。", rarity: "special", visualType: "flower", colorTheme: "rose-gold" },
  { id: "peace-lake-lotus", name: "湖面蓮花", state: "我感到平靜", careThemes: ["一份珍惜", "一點感謝", "慢慢感受", "留住這份安定"], description: "開在平靜湖面上的花，花心映著清晨的光。", quote: "平靜不是什麼都沒有，而是心終於有地方安放。", rarity: "common", visualType: "flower", colorTheme: "lake-green" },
  { id: "peace-stable-lake-stone", name: "安定湖石", state: "我感到平靜", careThemes: ["留住這份安定", "慢慢感受"], description: "沉在湖邊的石頭，讓整片水面都慢了下來。", quote: "把這份安定留下來，它會在需要時陪你。", rarity: "common", visualType: "stone", colorTheme: "deep-sage" },
  { id: "peace-breeze-leaf", name: "微風葉", state: "我感到平靜", careThemes: ["一份珍惜", "慢慢感受"], description: "隨著微風輕輕擺動，不追趕，也不抗拒。", quote: "今天的你，可以只是好好感受生活。", rarity: "rare", visualType: "leaf", colorTheme: "light-sage" },
  { id: "peace-morning-dew", name: "清晨露珠", state: "我感到平靜", careThemes: ["一點感謝", "一份珍惜"], description: "停在葉尖的一顆露珠，藏著剛醒來的世界。", quote: "能感受到一點點美好，就是心正在回來。", rarity: "special", visualType: "crystal", colorTheme: "dew" },
  { id: "strength-courage-sprout", name: "勇氣小芽", state: "我今天有力量", careThemes: ["一步勇敢", "一個行動", "相信自己的力量", "把光分享出去"], description: "從土裡用力冒出的嫩芽，小小的，卻很堅定。", quote: "勇敢不是沒有害怕，而是帶著害怕仍然往前。", rarity: "common", visualType: "seed", colorTheme: "sun-green" },
  { id: "strength-hill-light", name: "山丘之光", state: "我今天有力量", careThemes: ["相信自己的力量", "一步勇敢"], description: "從山丘後方升起的光，照亮你準備前進的路。", quote: "你身上有一種力量，正在被你重新看見。", rarity: "common", visualType: "light", colorTheme: "sun-gold" },
  { id: "strength-bird-feather", name: "飛鳥羽印", state: "我今天有力量", careThemes: ["一個行動", "把光分享出去"], description: "飛鳥經過時留下的羽印，像一封來自天空的邀請。", quote: "當你開始行動，風也會開始支持你。", rarity: "rare", visualType: "feather", colorTheme: "sky-gold" },
  { id: "strength-sunflower-core", name: "太陽花芯", state: "我今天有力量", careThemes: ["把光分享出去", "相信自己的力量"], description: "花心裡藏著一圈暖光，靠近的人也會被照亮。", quote: "你的光不需要很大，也能溫暖某個人。", rarity: "special", visualType: "flower", colorTheme: "sun" },
  { id: "expectation-dawn-flower", name: "晨曦花", state: "我充滿期待", careThemes: ["一份好奇", "一個新的開始", "一點冒險", "打開今天的可能"], description: "在晨光裡慢慢打開花瓣，像是替今天留了一個入口。", quote: "期待，是你還願意相信今天會有新的可能。", rarity: "common", visualType: "flower", colorTheme: "dawn" },
  { id: "expectation-new-light-seed", name: "新光種子", state: "我充滿期待", careThemes: ["一個新的開始", "打開今天的可能"], description: "裡面藏著尚未發生的光，等待被種進今天。", quote: "新的開始不一定巨大，有時只是你願意打開一點點。", rarity: "common", visualType: "seed", colorTheme: "new-gold" },
  { id: "expectation-butterfly-wing", name: "彩蝶之翼", state: "我充滿期待", careThemes: ["一點冒險", "一份好奇"], description: "帶著彩光的蝶翼，會指向一條沒走過的小路。", quote: "好奇會替生命打開新的窗。", rarity: "rare", visualType: "butterfly", colorTheme: "rainbow-soft" },
  { id: "expectation-beginning-gate", name: "開始之門", state: "我充滿期待", careThemes: ["打開今天的可能", "一個新的開始"], description: "一扇半透明的小門，後面是今天尚未展開的風景。", quote: "你不需要準備完美，門會在你願意時打開。", rarity: "special", visualType: "gate", colorTheme: "morning-gold" },
  { id: "gratitude-golden-ginkgo", name: "金杏葉", state: "我今天充滿感謝", careThemes: ["珍惜當下", "分享溫暖", "把愛說出口", "記住今天"], description: "只有在真心感謝的日子裡，才會輕輕飄落的一片葉子。", quote: "當你懂得珍惜，世界也會悄悄回應你。", rarity: "common", visualType: "leaf", colorTheme: "gold" },
  { id: "gratitude-morning-blossom", name: "晨光花", state: "我今天充滿感謝", careThemes: ["珍惜當下", "記住今天"], description: "吸收了清晨光線的花，會把平凡的一天照得柔軟。", quote: "被你珍惜的此刻，會在心裡留下光。", rarity: "common", visualType: "flower", colorTheme: "morning-cream" },
  { id: "gratitude-lightwing-butterfly", name: "光羽蝶", state: "我今天充滿感謝", careThemes: ["分享溫暖", "把愛說出口"], description: "翅膀像薄薄的光，會飛向你心裡想感謝的人。", quote: "感謝說出口，愛就有了可以抵達的路。", rarity: "rare", visualType: "butterfly", colorTheme: "light-gold" },
  { id: "gratitude-fruit", name: "感恩果", state: "我今天充滿感謝", careThemes: ["記住今天", "珍惜當下"], description: "在被好好珍惜的日子裡成熟，裡面藏著甜甜的記憶。", quote: "有些美好值得被記住，因為它曾經真實地滋養你。", rarity: "special", visualType: "seed", colorTheme: "honey" },
];

const MARK_POSITIONS = [
  { x: 29, y: 70 },
  { x: 69, y: 68 },
  { x: 51, y: 39 },
];

const WORLD_ADDITION_POSITIONS = [
  { x: 23, y: 74 },
  { x: 53, y: 60 },
  { x: 76, y: 43 },
  { x: 36, y: 48 },
  { x: 66, y: 72 },
  { x: 18, y: 50 },
];

function dateKey(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function displayDate(value) {
  return (value || dateKey()).replaceAll("-", "/");
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return dateKey(date);
}

function emptyToday(date = dateKey()) {
  return {
    date,
    state: null,
    care: null,
    careDescription: "",
    marksGenerated: [],
    marksCollected: [],
    worldAddition: null,
    completed: false,
  };
}

function defaultState() {
  const today = dateKey();
  return {
    version: VERSION,
    lastVisitDate: today,
    today: emptyToday(today),
    collection: [],
    stats: { totalDays: 0, totalMarks: 0, streak: 0 },
    worldProfile: createWorldProfile(),
    islandState: createIslandState(),
  };
}

const ISLAND_STAGES = [
  { minDays: 0, name: "初光之地" },
  { minDays: 3, name: "微光原野" },
  { minDays: 7, name: "繁花之島" },
  { minDays: 14, name: "晨光群島" },
  { minDays: 30, name: "永恆光境" },
];

const PROFILE_LABELS = {
  calm: "安定",
  courage: "勇氣",
  gratitude: "感謝",
  connection: "連結",
  curiosity: "好奇",
  hope: "希望",
};

function getIslandGrowthSummary(stats, profile, island) {
  const renderIsland = getWorldRenderState(island);
  const totalDays = Math.max(0, Number(stats?.totalDays || 0));
  const stageIndex = ISLAND_STAGES.reduce(
    (current, stage, index) => (totalDays >= stage.minDays ? index : current),
    0
  );
  const stage = ISLAND_STAGES[stageIndex];
  const nextStage = ISLAND_STAGES[stageIndex + 1];
  const span = nextStage ? nextStage.minDays - stage.minDays : 1;
  const progress = nextStage
    ? Math.min(100, Math.round(((totalDays - stage.minDays) / span) * 100))
    : 100;
  const features = [
    renderIsland.path && "遠行小徑",
    renderIsland.stream && "晨光溪流",
    renderIsland.moonlight && "月光",
    renderIsland.benches > 0 && "休息長椅",
    renderIsland.treeStage === "young-tree" && "年輕生命樹",
    renderIsland.flowers >= 12 && "繁花草地",
    renderIsland.butterflies >= 6 && "光羽蝶群",
  ].filter(Boolean);

  return {
    stage,
    nextStage,
    progress,
    daysToNext: nextStage ? Math.max(0, nextStage.minDays - totalDays) : 0,
    features: features.length ? features : ["生命樹幼苗", "第一束晨光"],
    profile: Object.entries(PROFILE_LABELS).map(([key, label]) => ({
      key,
      label,
      value: Math.max(0, Math.min(100, Number(profile[key] || 0))),
    })),
  };
}

function normalizeCollection(collection = []) {
  return collection.map((entry) => {
    const mark = getMark(entry.markId) || getMark(entry.id) || {};
    return {
      markId: entry.markId || entry.id || mark.id || "",
      name: entry.name || mark.name || "",
      discoveredAt: entry.discoveredAt || entry.firstFoundDate || dateKey(),
      state: entry.state || entry.sourceState || mark.state || "",
      care: entry.care || entry.sourceCare || "",
      careDescription: entry.careDescription || CARE_DESCRIPTIONS[entry.care || entry.sourceCare || ""] || "",
      description: entry.description || mark.description || "",
      quote: entry.quote || mark.quote || "",
      rarity: entry.rarity || mark.rarity || "common",
      visualType: entry.visualType || mark.visualType || "seed",
      colorTheme: entry.colorTheme || mark.colorTheme || "soft-white",
      discoveredDate: entry.discoveredDate || entry.discoveredAt || entry.firstFoundDate || dateKey(),
    };
  }).filter((entry) => entry.markId);
}

function normalizeState(rawState) {
  const today = dateKey();
  const base = defaultState();
  const parsed = rawState || {};
  const savedToday = parsed.today || {};
  const validTodayState = !savedToday.state || STATES.some((item) => item.label === savedToday.state);
  const shouldStartNewDay = savedToday.date !== today || !validTodayState;

  return {
    ...base,
    ...parsed,
    version: VERSION,
    lastVisitDate: today,
    today: shouldStartNewDay
      ? emptyToday(today)
      : {
          ...base.today,
          ...savedToday,
          careDescription: savedToday.careDescription || CARE_DESCRIPTIONS[savedToday.care] || "",
          marksGenerated: savedToday.marksGenerated || [],
          marksCollected: savedToday.marksCollected || [],
          completed: Boolean(savedToday.completed),
        },
    collection: normalizeCollection(parsed.collection || []),
    stats: { ...base.stats, ...(parsed.stats || {}) },
    worldProfile: normalizeWorldProfile(parsed.worldProfile),
    islandState: processGrowthQueue(parsed.islandState, today),
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

function previewStartRequested() {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).has("previewStart");
}

function stableNumber(text) {
  return Array.from(text).reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 5), 0);
}

function generateMarks(stateLabel, careLabel) {
  const pool = LIFE_MARKS.filter((mark) => mark.state === stateLabel);
  const sorted = [...pool].sort((a, b) => {
    const aCare = a.careThemes.includes(careLabel) ? 0 : 1;
    const bCare = b.careThemes.includes(careLabel) ? 0 : 1;
    const rarityOrder = { special: 0, rare: 1, common: 2 };
    if (aCare !== bCare) return aCare - bCare;
    return (rarityOrder[a.rarity] || 3) - (rarityOrder[b.rarity] || 3);
  });
  const offset = sorted.length ? stableNumber(`${dateKey()}-${stateLabel}-${careLabel}`) % sorted.length : 0;
  const rotated = [...sorted.slice(offset), ...sorted.slice(0, offset)];
  const selected = [];
  const usedTypes = new Set();

  rotated.forEach((mark) => {
    if (selected.length < 3 && !usedTypes.has(mark.visualType)) {
      selected.push(mark);
      usedTypes.add(mark.visualType);
    }
  });

  rotated.forEach((mark) => {
    if (selected.length < 3 && !selected.some((item) => item.id === mark.id)) {
      selected.push(mark);
    }
  });

  return selected.slice(0, 3).map((mark) => mark.id);
}

function getMark(id) {
  return LIFE_MARKS.find((mark) => mark.id === id);
}

function getStateByLabel(label) {
  return STATES.find((item) => item.label === label);
}

function sceneStyle(index = 0) {
  return {
    "--scene-x": `${(index % 3) * 50}%`,
    "--scene-y": `${Math.floor(index / 3) * 33.333}%`,
  };
}

const MARK_VISUAL_INDEX = {
  flower: 0,
  lamp: 1,
  leaf: 2,
  feather: 3,
  seed: 4,
  mushroom: 4,
  crystal: 5,
  light: 6,
  stone: 7,
  path: 8,
  butterfly: 9,
  gate: 10,
  fruit: 11,
};

const MARK_VISUAL_VARIANTS = {
  flower: [0, 11, 4],
  lamp: [1, 6, 10],
  leaf: [2, 3, 0],
  feather: [3, 9, 6],
  seed: [4, 7, 11],
  mushroom: [4, 11, 7],
  crystal: [5, 6, 7],
  light: [6, 10, 1],
  stone: [7, 5, 4],
  path: [8, 10, 2],
  butterfly: [9, 11, 3],
  gate: [10, 8, 6],
  fruit: [11, 0, 4],
};

function stableHash(value = "") {
  return String(value).split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

function markSpriteStyle(type = "seed", variantKey = "") {
  const variants = MARK_VISUAL_VARIANTS[type] || [MARK_VISUAL_INDEX[type] ?? MARK_VISUAL_INDEX.seed];
  const index = variantKey ? variants[stableHash(variantKey) % variants.length] : variants[0];
  return {
    "--mark-x": `${(index % 3) * 50}%`,
    "--mark-y": `${Math.floor(index / 3) * 33.333}%`,
  };
}

async function initLiffProfile() {
  const liffId =
    import.meta.env.NEXT_PUBLIC_LINE_LIFF_ID ||
    import.meta.env.VITE_LINE_LIFF_ID ||
    window.NEXT_PUBLIC_LINE_LIFF_ID ||
    "";

  if (!liffId || !window.liff || !/Line|LIFF/i.test(navigator.userAgent)) return null;

  try {
    await window.liff.init({ liffId });
    if (!window.liff.isLoggedIn()) return null;
    const profile = await window.liff.getProfile();
    return profile?.displayName || null;
  } catch {
    return null;
  }
}

function MarkVisual({ type, colorTheme, variantKey }) {
  return (
    <span
      className={`becoming-mark-visual becoming-mark-${type || "seed"} becoming-mark-theme-${colorTheme || "soft-white"}`}
      style={markSpriteStyle(type, variantKey)}
      aria-hidden="true"
    >
      <i />
      <b />
      <em />
    </span>
  );
}

function Sky() {
  return <div className="li-sky" aria-hidden="true" />;
}

function MorningLight() {
  return <div className="li-morning-light" aria-hidden="true" />;
}

function Clouds() {
  return (
    <div className="li-clouds" aria-hidden="true">
      <span className="cloud cloud-a" />
      <span className="cloud cloud-b" />
      <span className="cloud cloud-c" />
    </div>
  );
}

function Breeze() {
  return (
    <div className="li-breeze" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function Grass() {
  return (
    <div className="li-grass" aria-hidden="true">
      <span className="grass grass-a" />
      <span className="grass grass-b" />
      <span className="grass grass-c" />
    </div>
  );
}

function Flowers() {
  return (
    <div className="li-flowers" aria-hidden="true">
      <span className="li-flower flower-a" />
      <span className="li-flower flower-b" />
      <span className="li-flower flower-c" />
    </div>
  );
}

function LifeTree() {
  return (
    <div className="li-life-tree" aria-hidden="true">
      <span className="tree-stem" />
      <span className="tree-leaf leaf-a" />
      <span className="tree-leaf leaf-b" />
      <span className="tree-leaf leaf-c" />
    </div>
  );
}

function Butterflies() {
  return (
    <div className="li-butterflies" aria-hidden="true">
      <span className="butterfly butterfly-a" />
      <span className="butterfly butterfly-b" />
    </div>
  );
}

function Sparkles() {
  return (
    <div className="li-sparkles" aria-hidden="true">
      <span className="sparkle sparkle-a" />
      <span className="sparkle sparkle-b" />
      <span className="sparkle sparkle-c" />
      <span className="sparkle sparkle-d" />
    </div>
  );
}

function GrowthGlow() {
  return <div className="li-growth-glow" aria-hidden="true" />;
}

function SceneMemoryElements({ profile, island }) {
  const renderIsland = getWorldRenderState(island);
  const flowerCount = Math.min(10, Math.max(1, Math.round((renderIsland.flowers || 0) / 3)));
  const butterflyCount = Math.min(6, Math.max(1, Math.round((renderIsland.butterflies || 0) / 3)));
  const lightCount = Math.min(14, Math.max(4, Math.round((renderIsland.lights || 0) / 4)));
  const mistCount = Math.min(5, Math.max(1, renderIsland.mist || 1));
  const flowerPositions = [
    [20, 68], [42, 74], [66, 62], [82, 70], [31, 54], [55, 50], [73, 46], [14, 80], [48, 82], [88, 56],
  ];
  const butterflyPositions = [[72, 38], [24, 52], [58, 30], [84, 48], [38, 36], [66, 72]];
  const lightPositions = [[18, 32], [36, 46], [58, 26], [78, 36], [46, 62], [88, 58], [28, 78], [64, 76], [12, 55], [52, 42], [74, 22], [40, 28], [92, 44], [22, 66]];

  return (
    <div className="li-memory-elements" aria-hidden="true">
      {Array.from({ length: mistCount }).map((_, index) => (
        <span className="li-memory-mist" key={`mist-${index}`} style={{ "--i": index }} />
      ))}
      {renderIsland.path && <span className="li-memory-path" />}
      {renderIsland.stream && <span className="li-memory-stream" />}
      {renderIsland.benches > 0 && <span className="li-memory-bench" />}
      <span className={`li-memory-tree li-tree-${renderIsland.treeStage || "seedling"}`} />
      {Array.from({ length: flowerCount }).map((_, index) => {
        const [x, y] = flowerPositions[index % flowerPositions.length];
        return <span className="li-memory-flower" key={`flower-${index}`} style={{ left: `${x}%`, top: `${y}%`, "--delay": `${index * -0.7}s` }} />;
      })}
      {Array.from({ length: butterflyCount }).map((_, index) => {
        const [x, y] = butterflyPositions[index % butterflyPositions.length];
        return <span className="li-memory-butterfly" key={`butterfly-${index}`} style={{ left: `${x}%`, top: `${y}%`, "--delay": `${index * -1.2}s` }} />;
      })}
      {Array.from({ length: lightCount }).map((_, index) => {
        const [x, y] = lightPositions[index % lightPositions.length];
        return <span className="li-memory-light" key={`light-${index}`} style={{ left: `${x}%`, top: `${y}%`, "--delay": `${index * -0.35}s` }} />;
      })}
      {profile.connection > 48 && <span className="li-memory-warmth" />}
      {profile.calm > 58 && <span className="li-memory-lake" />}
      {profile.curiosity > 52 && <span className="li-memory-far-glow" />}
    </div>
  );
}

function LightIslandScene({ growth, additions = [], profile, island, className = "", children, ariaLabel }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const ignoreClickRef = useRef(false);
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const beginDrag = (event) => {
    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    setDragging(true);
  };

  const moveDrag = (event) => {
    if (!dragRef.current.active) return;
    const nextX = dragRef.current.originX + event.clientX - dragRef.current.startX;
    const nextY = dragRef.current.originY + event.clientY - dragRef.current.startY;
    if (Math.abs(event.clientX - dragRef.current.startX) + Math.abs(event.clientY - dragRef.current.startY) > 8) {
      dragRef.current.moved = true;
    }
    setOffset({ x: clamp(nextX, -260, 260), y: clamp(nextY, -48, 48) });
  };

  const endDrag = () => {
    ignoreClickRef.current = dragRef.current.moved;
    dragRef.current.active = false;
    setDragging(false);
    window.setTimeout(() => {
      ignoreClickRef.current = false;
    }, 0);
  };

  const captureClick = (event) => {
    if (!ignoreClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
  };
  const sceneProfile = normalizeWorldProfile(profile);
  const sceneIsland = getWorldRenderState(island);
  const sceneStyleVars = {
    "--profile-calm": sceneProfile.calm,
    "--profile-courage": sceneProfile.courage,
    "--profile-gratitude": sceneProfile.gratitude,
    "--profile-connection": sceneProfile.connection,
    "--profile-curiosity": sceneProfile.curiosity,
    "--profile-hope": sceneProfile.hope,
  };
  const legendItems = [
    sceneProfile.hope > 52 ? "晨光正在靠近" : "晨光微暖",
    sceneProfile.gratitude > 52 ? "花正在盛開" : "花苞醒來",
    sceneProfile.connection > 52 ? "蝴蝶正在靠近" : "微風經過",
    sceneProfile.courage > 52 ? "生命樹長高一點" : "生命樹幼苗",
    sceneProfile.curiosity > 52 ? "遠方有光" : "光點流動",
  ];

  return (
    <div
      className={`becoming-world light-island-scene becoming-growth-${growth} ${dragging ? "is-dragging" : ""} ${className}`}
      role={ariaLabel ? "group" : undefined}
      aria-label={ariaLabel}
      style={sceneStyleVars}
      onPointerDown={beginDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={captureClick}
    >
      <div className="li-drag-hint" aria-hidden="true">輕輕滑動，慢慢遇見</div>
      <div className="li-draggable-world" style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}>
        <div className="li-scene-depth" aria-hidden="true">
          <img className="li-scene-image li-scene-image-back" src="/becoming/light-island-base-v3.png" alt="" draggable="false" />
          <img className="li-scene-image li-scene-image-mid" src="/becoming/light-island-base-v3.png" alt="" draggable="false" />
          <img className="li-scene-image li-scene-image-front" src="/becoming/light-island-base-v3.png" alt="" draggable="false" />
        </div>
        <div className="li-living-air" aria-hidden="true">
          <span className="li-slow-cloud cloud-a" />
          <span className="li-slow-cloud cloud-b" />
          <span className="li-passing-butterfly" />
          <span className="li-floating-light light-a" />
          <span className="li-floating-light light-b" />
          <span className="li-floating-light light-c" />
        </div>
        <div className="li-gentle-growth" aria-hidden="true">
          <span className="li-first-bloom" />
          <span className="li-new-leaf leaf-one" />
          <span className="li-new-leaf leaf-two" />
          <span className="li-greener-meadow" />
        </div>
        <div className="li-added-elements" aria-hidden="true">
          {additions.map((mark, index) => {
            const pos = WORLD_ADDITION_POSITIONS[index % WORLD_ADDITION_POSITIONS.length];
            return (
              <span
                className={`li-added-item li-added-${mark.visualType || "seed"}`}
                key={`${mark.id}-${index}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, "--delay": `${index * 0.12}s` }}
              >
                <MarkVisual type={mark.visualType} colorTheme={mark.colorTheme} variantKey={mark.id} />
              </span>
            );
          })}
        </div>
        <div className="li-life-marks">{children}</div>
      </div>
      <div className="li-scene-progress" aria-hidden="true">光之島成長中 {Math.min(growth, 3)} / 3</div>
      <div className="li-scene-legend" aria-hidden="true">
        {legendItems.map((item, index) => (
          <span key={item}>
            <i className={`li-legend-mark li-legend-${index}`} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ChoiceArt({ shape }) {
  return (
    <span className={`becoming-choice-art becoming-choice-${shape?.name || shape}`} style={sceneStyle(shape?.sceneIndex || 0)} aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  );
}

function EmotionalLandscape({ stateLabel }) {
  const state = getStateByLabel(stateLabel);
  return <span className="becoming-landscape-mini" style={sceneStyle(state?.sceneIndex || 0)} aria-hidden="true" />;
}

export default function Becoming() {
  const phoneRef = useRef(null);
  const [state, setState] = useState(() => {
    const saved = loadState();
    return previewStartRequested() ? normalizeState({ ...saved, today: emptyToday() }) : saved;
  });
  const [screen, setScreen] = useState(() => {
    const saved = loadState();
    if (previewStartRequested()) return "home";
    if (saved.today.completed) return "done";
    if (saved.today.care) return "world";
    if (saved.today.state) return "care";
    return "home";
  });
  const [displayName, setDisplayName] = useState("");
  const [collectedPulse, setCollectedPulse] = useState("");
  const [collectedHint, setCollectedHint] = useState("");

  useEffect(() => {
    initLiffProfile().then((name) => {
      if (name) setDisplayName(name);
    });
  }, []);

  useEffect(() => {
    if (previewStartRequested()) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectedState = STATES.find((item) => item.label === state.today.state);
  const todayCareDescription = state.today.careDescription || CARE_DESCRIPTIONS[state.today.care] || "";
  const careItems = (CARE_OPTIONS_MAP[state.today.state] || []).map((label, index) => ({
    id: label,
    label,
    description: CARE_DESCRIPTIONS[label],
    tone: selectedState?.tone || "sage",
    scene: selectedState?.id || "care",
    shape: {
      name: ["lamp", "leaf", "light", "seed"][index] || "light",
      sceneIndex: ((selectedState?.sceneIndex || 0) + index * 3 + 1) % STATES.length,
    },
  }));

  const todayMarks = useMemo(
    () => state.today.marksGenerated.map(getMark).filter(Boolean),
    [state.today.marksGenerated]
  );

  const collectedToday = useMemo(
    () => state.today.marksCollected.map(getMark).filter(Boolean),
    [state.today.marksCollected]
  );

  const todayCollectionEntries = useMemo(
    () => state.collection.filter((entry) => entry.discoveredAt === state.today.date || entry.discoveredDate === state.today.date),
    [state.collection, state.today.date]
  );
  const islandGrowth = useMemo(
    () => getIslandGrowthSummary(state.stats, state.worldProfile, state.islandState),
    [state.stats, state.worldProfile, state.islandState]
  );

  const step = screen === "home" ? 0 : screen === "state" ? 1 : screen === "care" || screen === "shift" ? 2 : screen === "world" ? 3 : 4;
  const completedToday = state.today.completed;

  const update = (updater) => {
    setState((current) => normalizeState(typeof updater === "function" ? updater(current) : updater));
  };

  const startToday = () => {
    if (completedToday) {
      setScreen("done");
      return;
    }
    setScreen(state.today.state ? (state.today.care ? "world" : "care") : "state");
  };

  const chooseState = (item) => {
    update((current) => ({
      ...current,
      today: { ...current.today, state: item.label, care: null, marksGenerated: [], marksCollected: [], completed: false },
    }));
    setScreen("care");
  };

  const chooseCare = (item) => {
    update((current) => ({
      ...current,
      today: {
        ...current.today,
        care: item.label,
        careDescription: item.description || CARE_DESCRIPTIONS[item.label] || "",
        marksGenerated: current.today.marksGenerated.length
          ? current.today.marksGenerated
          : generateMarks(current.today.state, item.label),
      },
    }));
    setScreen("shift");
    window.setTimeout(() => setScreen("world"), 1500);
  };

  const collectMark = (markId) => {
    if (state.today.marksCollected.includes(markId)) return;
    setCollectedPulse(markId);
    setCollectedHint(getMark(markId)?.name || "");
    let completedNow = false;

    update((current) => {
      const nextCollected = [...current.today.marksCollected, markId];
      const mark = getMark(markId);
      const alreadyInCollection = current.collection.some(
        (entry) => entry.markId === markId && entry.discoveredAt === current.today.date
      );
      const nextCollection = alreadyInCollection
        ? current.collection
        : [
            ...current.collection,
            {
              markId,
              name: mark?.name || "",
              discoveredAt: current.today.date,
              discoveredDate: current.today.date,
              state: current.today.state,
              care: current.today.care,
              careDescription: current.today.careDescription || CARE_DESCRIPTIONS[current.today.care] || "",
              description: mark?.description || "",
              quote: mark?.quote || "",
              rarity: mark?.rarity || "common",
              visualType: mark?.visualType || "seed",
              colorTheme: mark?.colorTheme || "soft-white",
            },
          ];
      const completed = nextCollected.length >= current.today.marksGenerated.length;
      const wasCompleted = current.today.completed;
      completedNow = completed && !wasCompleted;
      const previousDates = current.collection
        .map((entry) => entry.discoveredAt)
        .filter((date) => date && date !== current.today.date)
        .sort();
      const previousCompletedDate = previousDates[previousDates.length - 1] || "";
      const nextStreak = completed && !wasCompleted
        ? previousCompletedDate === yesterdayKey()
          ? (current.stats?.streak || 0) + 1
          : 1
        : current.stats?.streak || 0;
      const completedDates = new Set(nextCollection.map((entry) => entry.discoveredAt).filter(Boolean));
      const worldMemory = completed && !wasCompleted
        ? evolveWorld({
            worldProfile: current.worldProfile,
            islandState: current.islandState,
            date: current.today.date,
            state: current.today.state,
            care: current.today.care,
            marks: nextCollected.map(getMark).filter(Boolean),
          })
        : {
            worldProfile: normalizeWorldProfile(current.worldProfile),
            islandState: processGrowthQueue(current.islandState, current.today.date),
            todayWorldAddition: current.today.worldAddition,
          };

      return {
        ...current,
        ...worldMemory,
        lastVisitDate: current.today.date,
        today: {
          ...current.today,
          marksCollected: nextCollected,
          worldAddition: worldMemory.todayWorldAddition || current.today.worldAddition,
          completed,
        },
        collection: nextCollection,
        stats: { totalDays: completedDates.size, totalMarks: nextCollection.length, streak: nextStreak },
      };
    });

    window.setTimeout(() => setCollectedPulse(""), 650);
    window.setTimeout(() => setCollectedHint(""), 1800);
    if (completedNow) window.setTimeout(() => setCollectedHint("今天的世界，安靜地亮了一點。"), 720);
  };

  useEffect(() => {
    phoneRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const sourceText = state.today.care ? `今天，我送給自己：${state.today.care}` : "";
  const worldClass = selectedState ? `becoming-world-${selectedState.id}` : "";

  return (
    <div className="becoming-page">
      <div className="becoming-phone" ref={phoneRef}>
        <div className="becoming-ambient becoming-ambient-a" />
        <div className="becoming-ambient becoming-ambient-b" />

        <header className="becoming-top">
          <div>
            <span>Becoming</span>
            <strong>{step ? `Step ${Math.min(step, 3)} / 3` : "Inner care"}</strong>
          </div>
          <button type="button" onClick={() => setScreen("collection")}>收藏</button>
        </header>

        <div className="becoming-progress" aria-hidden="true">
          <i style={{ width: `${Math.min(step, 3) * 33.33}%` }} />
        </div>

        {screen === "home" && !completedToday && (
          <section className="becoming-screen becoming-home">
            <div className="becoming-world-preview">
              <img src="/becoming/light-island-base-v3.png" alt="" aria-hidden="true" draggable="false" />
              <span className="becoming-preview-light one" />
              <span className="becoming-preview-light two" />
              <span className="becoming-preview-light three" />
            </div>
            <div className="becoming-home-copy">
              {displayName && <p className="becoming-welcome">{displayName}，歡迎回來。</p>}
              <h1>Becoming</h1>
              <p className="becoming-title">
                你的內在，<br />
                也值得被每天照顧。
              </p>
              <p className="becoming-sub">Your inner self deserves care, every day.</p>
              <p className="becoming-spirit">
                每一種感受，都會長出屬於它的生命。<br />
                <span>Every feeling grows something beautiful.</span>
              </p>
              <button className="becoming-primary" type="button" onClick={startToday}>開始今天</button>
            </div>
          </section>
        )}

        {screen === "done" && completedToday && (
          <section className="becoming-screen becoming-daily-done">
            <div className={`becoming-small-world ${worldClass}`}>
              {collectedToday.map((mark, index) => (
                <div className="becoming-found-mark" key={mark.id} style={{ "--delay": `${index * 0.12}s` }}>
                  <MarkVisual type={mark.visualType} colorTheme={mark.colorTheme} variantKey={mark.id} />
                </div>
              ))}
            </div>
            <h2>今天的光之島，<br />已經亮起了一盞燈。</h2>
            {state.today.care && (
              <div className="becoming-today-care">
                <span>今天留下的心意</span>
                <strong>{state.today.care}</strong>
                <p>{todayCareDescription}</p>
              </div>
            )}
            <div className="becoming-stat-grid">
              <div><span>今日印記</span><strong>{collectedToday.length}</strong></div>
              <div><span>總收藏</span><strong>{state.stats.totalMarks}</strong></div>
              <div><span>連續天數</span><strong>{state.stats.streak}</strong></div>
            </div>
            <div className="becoming-today-list">
              {collectedToday.map((mark) => (
                <article key={mark.id}>
                  <MarkVisual type={mark.visualType} colorTheme={mark.colorTheme} variantKey={mark.id} />
                  <div>
                    <strong>{mark.name}</strong>
                    <span>{mark.quote}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="becoming-actions">
              <button className="becoming-primary" type="button" onClick={() => setScreen("world")}>回到光之島</button>
              <button className="becoming-secondary" type="button" onClick={() => setScreen("collection")}>查看生命印記</button>
              <button className="becoming-secondary" type="button" onClick={() => setScreen("intention")}>查看今天留下的心意</button>
            </div>
          </section>
        )}

        {screen === "intention" && completedToday && (
          <section className="becoming-screen becoming-intention">
            <div className="becoming-step-label">Today</div>
            <h2>今天留下的心意</h2>
            <div className="becoming-today-care is-large">
              <span>看見今天的自己</span>
              <strong>{state.today.state}</strong>
              <em>送給自己：{state.today.care}</em>
              <p>{todayCareDescription}</p>
            </div>
            <div className="becoming-today-list">
              {todayCollectionEntries.map((entry) => (
                <article key={`${entry.discoveredAt}-${entry.markId}`}>
                  <MarkVisual type={entry.visualType} colorTheme={entry.colorTheme} variantKey={entry.markId} />
                  <div>
                    <strong>{entry.name}</strong>
                    <span>來源：{entry.state} × {entry.care}</span>
                    <span>今天送給自己的心意：{entry.careDescription || todayCareDescription}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="becoming-actions">
              <button className="becoming-primary" type="button" onClick={() => setScreen("world")}>回到光之島</button>
              <button className="becoming-secondary" type="button" onClick={() => setScreen("done")}>回到今日</button>
            </div>
          </section>
        )}

        {screen === "state" && (
          <QuestionScreen
            eyebrow="看見自己"
            title="今天，我最需要被理解的是……"
            items={STATES}
            selected={state.today.state}
            onSelect={chooseState}
            note="這不是評價，而是陪你理解此刻的自己。"
          />
        )}

        {screen === "care" && (
          <QuestionScreen
            eyebrow="照顧自己"
            title="今天，我願意送給自己……"
            subtitle="不用做到完美，只要願意給自己一點點。"
            items={careItems}
            selected={state.today.care}
            onSelect={chooseCare}
            note="選一個今天願意收下的陪伴。"
          />
        )}

        {screen === "shift" && (
          <section className="becoming-screen becoming-shift">
            <div className="becoming-shift-glow" />
            <p>
              於是，<br />
              今天的風景開始改變了。
            </p>
          </section>
        )}

        {screen === "world" && (
          <section className="becoming-screen becoming-explore">
            <div className="becoming-step-label">走進光之島</div>
            <h2>今天，讓你的島長大一點</h2>
            <p>
              世界會回應你的心意。<br />
              每找到一個生命印記，光之島就會長大一點。
            </p>
            <LightIslandScene
              growth={state.today.marksCollected.length}
              additions={collectedToday}
              profile={state.worldProfile}
              island={state.islandState}
              className={worldClass}
              ariaLabel="今日光之島"
            >
              {todayMarks.map((mark, index) => {
                const found = state.today.marksCollected.includes(mark.id);
                const pos = MARK_POSITIONS[index] || MARK_POSITIONS[0];
                return (
                  <div className="becoming-encounter" key={mark.id}>
                    {found && (
                      <span
                        className={`becoming-world-response response-${index}`}
                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        aria-hidden="true"
                      />
                    )}
                    <button
                      className={`becoming-hidden-mark becoming-hidden-mark-${index} ${found ? "is-found" : ""} ${collectedPulse === mark.id ? "is-collecting" : ""}`}
                      type="button"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      onClick={() => collectMark(mark.id)}
                      aria-label={`遇見 ${mark.name}`}
                    >
                      <span className="becoming-mark-touch" aria-hidden="true">
                        <MarkVisual
                          type={mark.visualType}
                          colorTheme={mark.colorTheme}
                          variantKey={mark.id}
                        />
                        <span className="becoming-mark-whisper">{mark.name}</span>
                      </span>
                    </button>
                  </div>
                );
              })}
              {collectedHint && (
                <div className="becoming-collect-note">世界亮起：{collectedHint}</div>
              )}
            </LightIslandScene>
            <div className="becoming-world-foot">
              <span>光之島成長中 {state.today.marksCollected.length} / {state.today.marksGenerated.length || 3}</span>
              <span>{sourceText}</span>
            </div>
          </section>
        )}

        {screen === "complete" && (
          <section className="becoming-screen becoming-complete">
            <LightIslandScene
              growth={3}
              additions={collectedToday}
              profile={state.worldProfile}
              island={state.islandState}
              className={`becoming-complete-island ${worldClass}`}
            />
            <h2>謝謝你，<br />今天願意陪伴自己。</h2>
            <p>
              你種下的不只是三個印記，<br />
              也是讓光之島長大的三份溫柔。
            </p>
            <div className="becoming-actions">
              <button className="becoming-primary" type="button" onClick={() => setScreen("done")}>完成今天的 Becoming</button>
            </div>
          </section>
        )}

        {screen === "collection" && (
          <section className="becoming-screen becoming-collection">
            <div className="becoming-step-label">Collection</div>
            <h2>我的生命印記</h2>
            <p>這些不是獎勵，而是你一路照顧自己的痕跡。</p>
            <section className="becoming-growth-summary" aria-labelledby="island-growth-title">
              <div className="becoming-growth-heading">
                <div>
                  <span>Light Island Growth</span>
                  <h3 id="island-growth-title">{islandGrowth.stage.name}</h3>
                </div>
                <strong>{state.stats.totalDays}<small> 天</small></strong>
              </div>
              <div
                className="becoming-growth-track"
                role="progressbar"
                aria-label="光之島成長進度"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={islandGrowth.progress}
              >
                <i style={{ width: `${islandGrowth.progress}%` }} />
              </div>
              <p className="becoming-growth-next">
                {islandGrowth.nextStage
                  ? `再陪伴自己 ${islandGrowth.daysToNext} 天，島嶼會走向「${islandGrowth.nextStage.name}」。`
                  : "你的光之島仍會記得每一天，繼續長出只屬於你的風景。"}
              </p>
              <div className="becoming-unlocked">
                <span>島上已經長出</span>
                <div>
                  {islandGrowth.features.map((feature) => <em key={feature}>{feature}</em>)}
                </div>
              </div>
              <div className="becoming-profile-grid">
                {islandGrowth.profile.map((item) => (
                  <div className="becoming-profile-item" key={item.key}>
                    <span>{item.label}</span>
                    <i aria-hidden="true"><b style={{ width: `${item.value}%` }} /></i>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </section>
            <div className="becoming-collection-grid">
              {state.collection.length === 0 && (
                <div className="becoming-empty">
                  <MarkVisual type="seed" colorTheme="soft-white" />
                  <span>今天開始後，生命印記會收藏在這裡。</span>
                </div>
              )}
              {[...state.collection].reverse().map((entry) => (
                <article className="becoming-collection-card" key={`${entry.discoveredAt}-${entry.markId}`}>
                  <MarkVisual type={entry.visualType} colorTheme={entry.colorTheme} variantKey={entry.markId} />
                  <div>
                    <strong>{entry.name}</strong>
                    <span>{displayDate(entry.discoveredAt)}</span>
                    <em>來源：{entry.state} × {entry.care}</em>
                    {entry.careDescription && <span>今天送給自己的心意：{entry.careDescription}</span>}
                    <p>{entry.description}</p>
                    <q>{entry.quote}</q>
                    <small>{entry.rarity}</small>
                  </div>
                </article>
              ))}
            </div>
            <div className="becoming-actions">
              <button className="becoming-primary" type="button" onClick={() => (completedToday ? setScreen("done") : startToday())}>
                {completedToday ? "回到今日" : "開始今天"}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function QuestionScreen({ eyebrow, title, subtitle, items, selected, onSelect, note }) {
  return (
    <section className="becoming-screen becoming-question">
      <div className="becoming-step-label">{eyebrow}</div>
      <h2>{title}</h2>
      {subtitle && <p className="becoming-question-subtitle">{subtitle}</p>}
      <div className={`becoming-choice-grid ${items.length > 6 ? "is-long" : ""}`}>
        {items.map((item) => (
          <button
            type="button"
            className={`becoming-choice becoming-tone-${item.tone} becoming-scene-${item.scene || item.id} ${selected === item.label ? "is-selected" : ""}`}
            key={item.id}
            onClick={() => onSelect(item)}
          >
            <ChoiceArt shape={item.shape || { name: item.id, sceneIndex: item.sceneIndex }} />
            <span>{item.label}</span>
            {item.description && <p>{item.description}</p>}
          </button>
        ))}
      </div>
      <p className="becoming-note">{note}</p>
    </section>
  );
}
