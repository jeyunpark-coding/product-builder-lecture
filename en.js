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

    function showMenu() {
        const menu = getRandomMenu();

        menuCard.classList.remove('animate');
        void menuCard.offsetWidth;
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
