const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', 'cookie.png', '🔔', 'coin2.png'];
let tokens = 10;

function updateTokenDisplay() {
    document.getElementById('token-count').textContent = tokens;
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReels() {
    if (tokens <= 0) {
        alert('You are out of tokens!');
        return;
    }

    const spinSound = document.getElementById('spin-sound');
    spinSound.play();

    tokens -= 1;
    updateTokenDisplay();

    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');

    let start = Date.now();
    let interval = setInterval(() => {
        if (Date.now() - start >= 2000) {
            clearInterval(interval);
            updateReel(reel1, getRandomSymbol());
            updateReel(reel2, getRandomSymbol());
            updateReel(reel3, getRandomSymbol());
            determineResult(reel1, reel2, reel3);
        } else {
            updateReel(reel1, getRandomSymbol());
            updateReel(reel2, getRandomSymbol());
            updateReel(reel3, getRandomSymbol());
        }
    }, 100); // Change symbols every 100ms to simulate spinning
}

function updateReel(reel, symbol) {
    if (symbol.endsWith('.png')) {
        reel.innerHTML = `<img src="${symbol}" alt="symbol" class="symbol-image">`;
    } else {
        reel.textContent = symbol;
    }
}

function determineResult(reel1, reel2, reel3) {
    const result = document.getElementById('result');
    const jackpotSound = document.getElementById('jackpot-sound');
    const symbol1 = reel1.textContent || reel1.querySelector('img').src;
    const symbol2 = reel2.textContent || reel2.querySelector('img').src;
    const symbol3 = reel3.textContent || reel3.querySelector('img').src;

    if (symbol1 === symbol2 && symbol2 === symbol3) {
        jackpotSound.play();
        result.textContent = '🎉 Jackpot! You win! 🎉';
        tokens += 10;
    } else if (symbol1 === symbol2 || symbol1 === symbol3 || symbol2 === symbol3) {
        result.textContent = '😊 You win a small prize! 😊';
        tokens += 3;
    } else {
        result.textContent = '😢 Better luck next time! 😢';
    }

    updateTokenDisplay();
}

document.getElementById('handle').addEventListener('mousedown', () => {
    document.getElementById('handle').classList.add('active');
    spinReels();
});

document.getElementById('handle').addEventListener('mouseup', () => {
    document.getElementById('handle').classList.remove('active');
});
