const menus = [
    { name: '삼겹살', emoji: '🥓', category: '한식' },
    { name: '치킨', emoji: '🍗', category: '한식' },
    { name: '피자', emoji: '🍕', category: '양식' },
    { name: '파스타', emoji: '🍝', category: '양식' },
    { name: '스테이크', emoji: '🥩', category: '양식' },
    { name: '초밥', emoji: '🍣', category: '일식' },
    { name: '라멘', emoji: '🍜', category: '일식' },
    { name: '짜장면', emoji: '🍜', category: '중식' },
    { name: '짬뽕', emoji: '🍲', category: '중식' },
    { name: '마라탕', emoji: '🌶️', category: '중식' },
    { name: '떡볶이', emoji: '🍢', category: '한식' },
    { name: '삼계탕', emoji: '🍲', category: '한식' },
    { name: '김치찌개', emoji: '🥘', category: '한식' },
    { name: '된장찌개', emoji: '🥘', category: '한식' },
    { name: '부대찌개', emoji: '🫕', category: '한식' },
    { name: '불고기', emoji: '🥩', category: '한식' },
    { name: '제육볶음', emoji: '🍖', category: '한식' },
    { name: '닭갈비', emoji: '🍗', category: '한식' },
    { name: '비빔밥', emoji: '🍚', category: '한식' },
    { name: '냉면', emoji: '🍜', category: '한식' },
    { name: '쌀국수', emoji: '🍜', category: '아시안' },
    { name: '타코', emoji: '🌮', category: '멕시칸' },
    { name: '버거', emoji: '🍔', category: '양식' },
    { name: '카레', emoji: '🍛', category: '아시안' },
    { name: '샤부샤부', emoji: '🫕', category: '일식' },
    { name: '연어 덮밥', emoji: '🐟', category: '일식' },
    { name: '규동', emoji: '🍱', category: '일식' },
    { name: '순두부찌개', emoji: '🥘', category: '한식' },
    { name: '갈비탕', emoji: '🍲', category: '한식' },
    { name: '볶음밥', emoji: '🍳', category: '중식' },
];

function getRandomMenu() {
    return menus[Math.floor(Math.random() * menus.length)];
}

document.addEventListener('DOMContentLoaded', () => {
    const recommendBtn = document.getElementById('recommend-btn');
    const menuCard = document.getElementById('menu-card');
    const menuEmoji = document.getElementById('menu-emoji');
    const menuName = document.getElementById('menu-name');
    const menuCategory = document.getElementById('menu-category');
    const themeToggle = document.getElementById('theme-toggle');

    function showMenu() {
        const menu = getRandomMenu();

        menuCard.classList.remove('animate');
        void menuCard.offsetWidth; // reflow to restart animation
        menuCard.classList.add('animate');

        menuEmoji.textContent = menu.emoji;
        menuName.textContent = menu.name;
        menuCategory.textContent = menu.category;
    }

    recommendBtn.addEventListener('click', showMenu);

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
});
