document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentTab = 'gifts';

    // Data - GIFTS
    const gifts = [
        {
            id: 1,
            title: "A Warm Hug",
            icon: "fa-heart",
            message: "This is a coupon for Unlimited warm hugs. Redeemable anytime, anywhere. No expiration date!",
            image: "assets/warm_hug.jpg" // User's photo
        },
        {
            id: 2,
            title: "My Heart",
            icon: "fa-gift",
            message: "The biggest gift I can give you is my heart. It's yours, now and forever. Handle with care! ❤️",
            image: "assets/my_presence.jpg" // Was previously My Presence image
        },
        {
            id: 3,
            title: "My Presence",
            icon: "fa-user",
            message: "I promise to always be there for you, through thick and thin. My presence is my present to you.",
            image: "assets/my_presence_red_sweater.jpg" // New user photo (red sweater)
        },
        {
            id: 4,
            title: "Sweet Kisses",
            icon: "fa-kiss-wink-heart",
            message: "Sending you a million kisses! 😘",
            image: "assets/sweet_kisses.png" // Kisses
        },
        {
            id: 5,
            title: "Wishlist",
            icon: "fa-wand-magic-sparkles",
            message: "Type what you wish for below, and I'll do my best to make it come true!",
            image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2070&auto=format&fit=crop", // Sparkles/Magic
            type: "input"
        }
    ];

    // Data - LETTERS
    const letters = [
        {
            id: 1,
            title: "To My Julie Anne",
            content: "Merry Christmas! \n\nI wanted to take a moment to tell you how incredibly special you are to me. Every moment with you feels like a gift. Thank you for being the wonderful person you are. You're the best gift that this life has ever given me. Even if we are apart right now, I am always thinking of you and my spirit linger in your presence. I love you baby ko! ❤️"
        },
        {
            id: 2,
            title: "Remember When?",
            content: "Do you remember the first time we spoke? I remember it like it was yesterday po hihi, the days were we we still shy to each other, and how we grew closer to each other as time passes. Now here we are in the Present, and I'm so grateful for the journey we've been on together til now. This is just a beginning of our wonderful story together. I can't wait to see where life takes us, and no matter what happens we will always be there for each other, and grow together. I love you Byby ko"
        },
        {
            id: 3,
            title: "My Wish",
            content: "My only Christmas wish this year is to see you happy, healthy, and safe. If I can be the reason for your smile, then my Christmas is complete. Stay Safe and take care!"
        },
        {
            id: 4,
            title: "Distance",
            content: "Even if we are apart, look at the moon. Like I always told you before po baby. It's the same moon I'm looking at and It'll reminds you of me, like how it reminds me of you. We're connected, always. I love you!"
        },
        {
            id: 5,
            title: "Thank You",
            content: "Thank you for everything you've done for me this year, for always being there for me to listen to my rants, for laughing at my bad jokes, and for just being YOU who I always love and admire. You are my favorite person and I really appreciate every small and big things that you've done for me. I love you!"
        },
        {
            id: 6,
            title: "Future Us",
            content: "I can't wait for all the Christmases we have yet to celebrate together. The future looks bright and beautiful because you're in it. Cheers to the best life that awaits us in the future. I love you My Dearest, Julie Anne"
        }
    ];

    // DOM Elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const giftGrid = document.getElementById('gift-grid');
    const letterGrid = document.getElementById('letter-grid');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBody = document.getElementById('modal-body');

    // Init
    initSnow();
    initHearts();
    renderGifts();
    renderLetters();

    // Event Listeners
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Functions
    function switchTab(tabName) {
        navButtons.forEach(btn => {
            if (btn.dataset.tab === tabName) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        tabContents.forEach(content => {
            if (content.id === tabName) content.classList.add('active');
            else content.classList.remove('active');
        });
        currentTab = tabName;
    }

    function renderGifts() {
        giftGrid.innerHTML = '';
        gifts.forEach(gift => {
            const card = document.createElement('div');
            card.className = 'gift-card';
            card.innerHTML = `
                <div class="gift-ribbon"></div>
                <div class="gift-content-wrapper">
                    <i class="fa-solid ${gift.icon} gift-icon"></i>
                    <div class="gift-label">${gift.title}</div>
                </div>
            `;
            card.addEventListener('click', () => openGift(gift));
            giftGrid.appendChild(card);
        });
    }

    function renderLetters() {
        letterGrid.innerHTML = '';
        letters.forEach(letter => {
            const card = document.createElement('div');
            card.className = 'envelope-card';
            card.innerHTML = `
                <div class="envelope-flap"></div>
                <div class="envelope-body">
                    <i class="fa-solid fa-heart stamp"></i>
                    <div class="letter-title">${letter.title}</div>
                </div>
            `;
            card.addEventListener('click', () => openLetter(letter));
            letterGrid.appendChild(card);
        });
    }

    function openGift(gift) {
        let content = `
            <div class="modal-inner-content">
                <h3>${gift.title}</h3>
                <img src="${gift.image}" alt="${gift.title}" class="modal-image">
                <p>${gift.message}</p>
            </div>
        `;

        if (gift.type === 'input') {
            content = `
                <div class="modal-inner-content">
                    <h3>${gift.title}</h3>
                    <p style="margin-bottom: 1rem;">${gift.message}</p>
                    <textarea id="wishlist-input" placeholder="Type your wish here..." style="width: 100%; height: 100px; padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-family: var(--font-sans); margin-bottom: 1rem;"></textarea>
                    <button onclick="alert('Your wish has been sent to Rhenz! ✨')" style="background: var(--color-primary-red); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-family: var(--font-serif); font-size: 1rem;">Send Wish</button>
                </div>
            `;
        }

        showModal(content);
    }

    function openLetter(letter) {
        const content = `
            <div class="modal-inner-content">
                <h3>${letter.title}</h3>
                <p style="text-align: left; font-family: 'Playfair Display', serif; font-size: 1.2rem; padding: 1rem;">
                    My Dearest Julie Anne,
                    <br><br>
                    ${letter.content.replace(/\n/g, '<br>')}
                    <br><br>
                    With Love,<br>
                    Your Dearest, Rhenz
                </p>
            </div>
        `;
        showModal(content);
    }

    function showModal(content) {
        modalBody.innerHTML = content;
        modalOverlay.classList.remove('hidden');
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
    }

    // Particle Effects
    function initSnow() {
        const container = document.getElementById('snow-container');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.className = 'snowflake';
            el.innerHTML = '❄';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
            el.style.opacity = Math.random();
            el.style.fontSize = Math.random() * 10 + 10 + 'px';
            container.appendChild(el);

            // Randomly reset animation to desync
            el.addEventListener('animationiteration', () => {
                el.style.left = Math.random() * 100 + 'vw';
            });
        }
    }

    function initHearts() {
        const container = document.getElementById('hearts-container');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.className = 'heart-particle';
            el.innerHTML = '❤';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5-10s
            el.style.opacity = Math.random() * 0.5;
            el.style.fontSize = Math.random() * 15 + 10 + 'px';
            // Start at random vertical positions
            el.style.top = Math.random() * 100 + 'vh';
            container.appendChild(el);
        }
    }

    function initAudio() {
        const audio = document.getElementById('bg-music');
        const btn = document.getElementById('music-toggle');
        const icon = btn.querySelector('i');

        btn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                icon.className = 'fa-solid fa-pause';
                btn.style.animation = 'spin 4s linear infinite';
            } else {
                audio.pause();
                icon.className = 'fa-solid fa-music';
                btn.style.animation = 'none';
            }
        });

        // Add spin animation to CSS if not present, or just use inline style for now
        if (!document.getElementById('spin-style')) {
            const style = document.createElement('style');
            style.id = 'spin-style';
            style.innerHTML = `
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `;
            document.head.appendChild(style);
        }
    }

    // Call initAudio
    initAudio();
});
