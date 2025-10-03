//задержка 2–5 секунд
function getRandomDelay() {
    return Math.floor(Math.random() * 3000) + 2000;
}

//имитация запросов
function fetchImages1(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(["img/dog1.jpg",
                "img/dog2.jpg",
                "img/dog3.jpg"]);
        }, delay);
    });
}

function fetchImages2(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(["img/cat1.jpg",
                "img/cat2.jpg",
                "img/cat3.jpg"]);
        }, delay);
    });
}

//отрисовка ряда
function renderRow(images, container) {
    const row = document.createElement("div");
    row.className = "row";
    images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        row.appendChild(img);
    });
    container.appendChild(row);
}

//прогресс-бар
function progress(time, container) {
    if (time === undefined) {
        time = Math.random() * 3 + 2; // секунды
    }
    if (time < 2) time = 2;

    //контейнер прогресса
    const wrap = document.createElement("div");
    wrap.className = "progress-container";

    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const timerText = document.createElement("div");
    timerText.className = "time-bar";

    wrap.appendChild(bar);
    container.appendChild(wrap);
    container.appendChild(timerText);

    //запуск анимации прогресс-бара
    bar.style.transition = `transform ${time}s linear`;
    setTimeout(() => {
        bar.style.transform = "scaleX(1)";
    }, 50);

    //счётчик секунд
    let elapsed = 0;
    const timer = setInterval(() => {
        elapsed++;
        timerText.textContent = `${elapsed} сек`;
        if (elapsed >= time) {
            clearInterval(timer);
        }
    }, 1000);

    return time * 1000;
}

//запуск цепочки
window.addEventListener("load", () => {
    const gallery = document.querySelector(".gallery");

    //1-й запрос
    const delay1 = getRandomDelay();
    progress(delay1 / 1000, gallery);
    fetchImages1(delay1).then(images => {
        renderRow(images, gallery);

        //2-й запрос
        const delay2 = getRandomDelay();
        progress(delay2 / 1000, gallery);
        fetchImages2(delay2).then(images => {
            renderRow(images, gallery);
        });
    });
});