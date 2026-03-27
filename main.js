// ============================================================
// 카카오 SDK 초기화
// ※ https://developers.kakao.com 에서 JavaScript Key 발급 후 교체
// ============================================================
const KAKAO_JS_KEY = 'YOUR_KAKAO_JS_KEY';
const SITE_URL = 'https://thedevlab.dev/';
const SITE_URL_EN = 'https://thedevlab.dev/en.html';
const OG_IMAGE_URL = 'https://thedevlab.dev/og-image.png';

if (typeof Kakao !== 'undefined' && KAKAO_JS_KEY !== 'YOUR_KAKAO_JS_KEY') {
    Kakao.init(KAKAO_JS_KEY);
}

const menus = [
    { name: '삼겹살', emoji: '🥓', category: '한식' },
    { name: '치킨', emoji: '🍗', category: '한식' },
    { name: '피자', emoji: '🍕', category: '양식', image: 'pizza01.jpg' },
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
    const menuImage = document.getElementById('menu-image');
    const themeToggle = document.getElementById('theme-toggle');
    const shareSection = document.getElementById('share-section');

    let currentMenu = null;

    function showMenu() {
        const menu = getRandomMenu();
        currentMenu = menu;

        menuCard.classList.remove('animate');
        void menuCard.offsetWidth;
        menuCard.classList.add('animate');

        if (menu.image) {
            menuImage.src = menu.image;
            menuImage.alt = menu.name;
            menuImage.style.display = 'block';
            menuEmoji.style.display = 'none';
        } else {
            menuImage.style.display = 'none';
            menuEmoji.style.display = 'block';
            menuEmoji.textContent = menu.emoji;
        }
        menuName.textContent = menu.name;
        menuCategory.textContent = menu.category;

        // 공유 섹션 표시
        shareSection.hidden = false;
        shareSection.classList.add('share-appear');
    }

    recommendBtn.addEventListener('click', showMenu);

    // ── 카카오톡 공유 ───────────────────────────────────────
    document.getElementById('share-kakao').addEventListener('click', () => {
        if (!currentMenu) return;
        const menuText = `${currentMenu.emoji} ${currentMenu.name}`;
        const shareText = `저녁 메뉴 추천기가 오늘 저녁을 골라줬어요!\n\n오늘의 메뉴: ${menuText}\n\n나도 추천받아보기 👇`;

        if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: `오늘 저녁은 ${currentMenu.name}!`,
                    description: `저녁 메뉴 추천기가 골라줬어요 🍽️ 나도 추천받아보기`,
                    imageUrl: OG_IMAGE_URL,
                    link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
                },
                buttons: [{
                    title: '나도 추천받기',
                    link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
                }],
            });
        } else {
            // SDK 미초기화 → 네이티브 공유 or 클립보드 복사 폴백
            shareNativeOrCopy(shareText, SITE_URL);
        }
    });

    // ── X(트위터) 공유 ─────────────────────────────────────
    document.getElementById('share-twitter').addEventListener('click', () => {
        if (!currentMenu) return;
        const text = `저녁 메뉴 추천기가 오늘 저녁을 골라줬어요!\n오늘의 메뉴: ${currentMenu.emoji} ${currentMenu.name}\n\n나도 추천받아보기 👇`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(SITE_URL)}&hashtags=${encodeURIComponent('저녁메뉴추천,오늘뭐먹지,메뉴추천')}`;
        window.open(tweetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    });

    // ── 페이스북 공유 ──────────────────────────────────────
    document.getElementById('share-facebook').addEventListener('click', () => {
        if (!currentMenu) return;
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`;
        window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    });

    // ── 링크 복사 ──────────────────────────────────────────
    document.getElementById('share-copy').addEventListener('click', () => {
        if (!currentMenu) return;
        const copyText = `오늘 저녁은 ${currentMenu.emoji} ${currentMenu.name}!\n저녁 메뉴 고민? 나도 추천받아보기 → ${SITE_URL}`;
        navigator.clipboard.writeText(copyText).then(() => {
            const btn = document.getElementById('share-copy');
            const original = btn.innerHTML;
            btn.innerHTML = '<span class="share-icon">✅</span>복사됨!';
            setTimeout(() => { btn.innerHTML = original; }, 2000);
        }).catch(() => {
            shareNativeOrCopy(copyText, SITE_URL);
        });
    });

    // ── 헬퍼: 네이티브 공유 API → 클립보드 복사 폴백 ─────────
    function shareNativeOrCopy(text, url) {
        if (navigator.share) {
            navigator.share({ title: '저녁 메뉴 추천기', text, url });
        } else {
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                alert('클립보드에 복사됐어요! 친구에게 붙여넣기해서 공유해보세요 😊');
            });
        }
    }

    // ── 테마 토글 ──────────────────────────────────────────
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
});
