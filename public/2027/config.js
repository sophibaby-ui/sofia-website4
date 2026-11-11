/**
 * Sofia Frequency｜2027 年度頻率計畫
 * 此檔集中管理對外資料。正式發布前請確認全部欄位。
 */
window.SOFIA_CONFIG = {
  brand: 'Sofia Frequency',
  serviceName: '2027 年度好運頻率計畫',
  startDate: '2027-01-01',
  endDate: '2027-12-31',
  reportDelivery: '2027 年 1 月',
  // 預覽模式：頁面頂端顯示「價格與條款尚待確認」提示。正式公開時改為 false，並刪除 index.html 的 robots noindex。
  preview: true,
  // 官方 LINE（與 sofiahealing.com 主站、/forest 測驗相同帳號）。
  // lineId 有值時，按鈕會開啟 LINE 並自動帶入整理好的詢問訊息；lineUrl 為加好友備用連結。
  lineId: '@567avtfh',
  lineUrl: 'https://line.me/R/ti/p/%40567avtfh',
  lineKeyword: '2027',
  // 以下 3、5 項價格為討論中的「建議售價」，正式公開前請再次確認。
  plans: [
    { id: 'focus', count: 2, name: '年度聚焦', price: 3000, description: '把心力放在最重要的兩件事。' },
    { id: 'abundance', count: 3, name: '年度豐盛', price: 4200, description: '工作、關係與生活，找到自己的節奏。', featured: true },
    { id: 'whole', count: 5, name: '年度全方位', price: 6000, description: '同時照顧更多重要的生活面向。' }
  ],
  // 早鳥日期和優惠尚未正式確認，因此預設不顯示。
  earlyBird: { enabled: false, start: '', end: '', description: '' }
};
