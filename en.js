// ============================================================
// Kakao SDK initialization
// ※ Get your JavaScript Key from https://developers.kakao.com
// ============================================================
const KAKAO_JS_KEY = 'YOUR_KAKAO_JS_KEY';
const SITE_URL = 'https://thedevlab.dev/en.html';
const OG_IMAGE_URL = 'https://thedevlab.dev/og-image.png';

if (typeof Kakao !== 'undefined' && KAKAO_JS_KEY !== 'YOUR_KAKAO_JS_KEY') {
    Kakao.init(KAKAO_JS_KEY);
}

const menus = [
    { name: 'Pasta Carbonara', emoji: '🍝', category: 'Italian' },
    { name: 'Margherita Pizza', emoji: '🍕', category: 'Italian' },
    { name: 'Ribeye Steak', emoji: '🥩', category: 'American' },
    { name: 'Cheeseburger', emoji: '🍔', category: 'American' },
    { name: 'Fish & Chips', emoji: '🐟', category: 'British' },
    { name: 'Caesar Salad', emoji: '🥗', category: 'American' },
    { name: 'Beef Tacos', emoji: '🌮', category: 'Mexican' },
    { name: 'Chicken Burrito', emoji: '🌯', category: 'Mexican' },
    { name: 'Sushi Platter', emoji: '🍣', category: 'Japanese' },
    { name: 'Tonkotsu Ramen', emoji: '🍜', category: 'Japanese' },
    { name: 'Chicken Teriyaki', emoji: '🍱', category: 'Japanese' },
    { name: 'Pad Thai', emoji: '🍜', category: 'Thai' },
    { name: 'Green Curry', emoji: '🍛', category: 'Thai' },
    { name: 'Pho', emoji: '🍲', category: 'Vietnamese' },
    { name: 'Banh Mi', emoji: '🥖', category: 'Vietnamese' },
    { name: 'Chicken Tikka Masala', emoji: '🍛', category: 'Indian' },
    { name: 'Butter Naan & Dal', emoji: '🫓', category: 'Indian' },
    { name: 'Lamb Shawarma', emoji: '🥙', category: 'Middle Eastern' },
    { name: 'Falafel Wrap', emoji: '🧆', category: 'Middle Eastern' },
    { name: 'Dim Sum', emoji: '🥟', category: 'Chinese' },
    { name: 'Kung Pao Chicken', emoji: '🍗', category: 'Chinese' },
    { name: 'Peking Duck', emoji: '🦆', category: 'Chinese' },
    { name: 'Beef Bulgogi', emoji: '🥩', category: 'Korean' },
    { name: 'Korean BBQ', emoji: '🔥', category: 'Korean' },
    { name: 'Bibimbap', emoji: '🍚', category: 'Korean' },
    { name: 'Grilled Salmon', emoji: '🐟', category: 'Seafood' },
    { name: 'Shrimp Scampi', emoji: '🦐', category: 'Seafood' },
    { name: 'Lobster Bisque', emoji: '🦞', category: 'Seafood' },
    { name: 'BBQ Ribs', emoji: '🍖', category: 'American' },
    { name: 'Club Sandwich', emoji: '🥪', category: 'American' },
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
    const shareSection = document.getElementById('share-section');

    let currentMenu = null;

    function showMenu() {
        const menu = getRandomMenu();
        currentMenu = menu;

        menuCard.classList.remove('animate');
        void menuCard.offsetWidth;
        menuCard.classList.add('animate');

        menuEmoji.textContent = menu.emoji;
        menuName.textContent = menu.name;
        menuCategory.textContent = menu.category;

        // Show share section
        shareSection.hidden = false;
        shareSection.classList.add('share-appear');
    }

    recommendBtn.addEventListener('click', showMenu);

    // ── KakaoTalk Share ────────────────────────────────────
    document.getElementById('share-kakao').addEventListener('click', () => {
        if (!currentMenu) return;
        const shareText = `The Dinner Menu Recommender picked tonight's dinner!\n\nTonight's menu: ${currentMenu.emoji} ${currentMenu.name}\n\nGet your pick too 👇`;

        if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: `Tonight's dinner: ${currentMenu.name}!`,
                    description: `The random picker chose this 🍽️ Get your dinner pick now`,
                    imageUrl: OG_IMAGE_URL,
                    link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
                },
                buttons: [{
                    title: 'Get my pick',
                    link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
                }],
            });
        } else {
            shareNativeOrCopy(shareText, SITE_URL);
        }
    });

    // ── X (Twitter) Share ──────────────────────────────────
    document.getElementById('share-twitter').addEventListener('click', () => {
        if (!currentMenu) return;
        const text = `The Dinner Menu Recommender just picked my dinner!\n${currentMenu.emoji} ${currentMenu.name}\n\nGet your random dinner pick 👇`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(SITE_URL)}&hashtags=DinnerIdeas,WhatToEat,RandomPicker`;
        window.open(tweetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    });

    // ── Facebook Share ─────────────────────────────────────
    document.getElementById('share-facebook').addEventListener('click', () => {
        if (!currentMenu) return;
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`;
        window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    });

    // ── Copy Link ──────────────────────────────────────────
    document.getElementById('share-copy').addEventListener('click', () => {
        if (!currentMenu) return;
        const copyText = `Tonight's dinner: ${currentMenu.emoji} ${currentMenu.name}!\nGet your random dinner pick → ${SITE_URL}`;
        navigator.clipboard.writeText(copyText).then(() => {
            const btn = document.getElementById('share-copy');
            const original = btn.innerHTML;
            btn.innerHTML = '<span class="share-icon">✅</span>Copied!';
            setTimeout(() => { btn.innerHTML = original; }, 2000);
        }).catch(() => {
            shareNativeOrCopy(copyText, SITE_URL);
        });
    });

    // ── Helper: Native Share API → Clipboard fallback ──────
    function shareNativeOrCopy(text, url) {
        if (navigator.share) {
            navigator.share({ title: 'Dinner Menu Recommender', text, url });
        } else {
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                alert('Copied to clipboard! Paste it to share with friends 😊');
            });
        }
    }

    // ── Theme Toggle ───────────────────────────────────────
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
});
