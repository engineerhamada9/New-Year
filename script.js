document.body.classList.add('locked-screen');
document.body.classList.remove('locked-screen');

AOS.init({ duration: 1200, once: true });

/* ===== تصحيح: تعريف عناصر DOM اللي بنستخدمها كتير ===== */
const passInput = document.getElementById('passInput');
const bgMusic = document.getElementById('bgMusic');

/* ===== وظيفة التحقق من كلمة السر (كما هي) ===== */
function checkPassword() {
    const pass = document.getElementById('passInput').value;
    if (pass.trim() === "23/7/2025") {
        document.getElementById('lock-screen').style.transform = 'translateY(-100%)';
        setTimeout(() => {
            document.getElementById('lock-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            document.getElementById('bgMusic').play().catch(e => console.log("Interaction required for music"));
        }, 1000);
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

function openLetter() {
    document.querySelector('.letter-container').classList.toggle('open');
}

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    music.paused ? music.play() : music.pause();
}

/* 2. تحديث دالة العداد اللي عندك (استبدال لسطر التاريخ الثابت بديناميكي) */
function getNextJanFirst() {
    const now = new Date();
    const year = now.getFullYear();
    const candidate = new Date(year, 0, 1, 0, 0, 0, 0); // 1 يناير نفس السنة (00:00)
    return now < candidate ? candidate.getTime() : new Date(year + 1, 0, 1, 0, 0, 0, 0).getTime();
}

let targetTime = getNextJanFirst();

function startCountdown() {
    const timerElement = document.getElementById('timer');
    const nextYear = new Date('1 Jan 2026 00:00:00').getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = nextYear - now;

        if (!timerElement) return;

        if (diff <= 0) {
            // أول مرة يوصل الصفر: الاحتفال
            if (!timerElement.classList.contains('celebrating')) {
                timerElement.innerHTML = `<div> 🎉 بدأت سنتنا الجديده 2026 وانا معي اجمل بنوته ف الدنيا 🎉 </div>`;
                timerElement.classList.add('celebrating');
                launchFireworks();
                document.body.classList.remove('locked-screen');
            }

            clearInterval(interval); // أهم خطوة: إيقاف العداد نهائيًا
            return;
        }

        // حساب الوقت المتبقي
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        timerElement.innerHTML = `
            <div>${days} يوم</div>
            <div>${hours} ساعة</div>
            <div>${mins} دقيقة</div>
            <div>${secs} ثانية</div>
        `;
    }, 1000);
}

startCountdown();

const messages = [
    "أحبك اليوم أكثر من أمس 💖",
    "أنتِ سبب ابتسامتي 😊",
    "قلبي ملكك فقط ❤️",
    "لو قصيتي شعرك هنفخك✨",
    "هاي مزتي 🌹",
    "وجودك يدفئ أيامي 🔥",
    "خلي بالك من رسمتي 😍",
    "أنتِ ملكة قلبي 👑",
    "حبي لك لا ينتهي ♾️",
    "كل يوم أحبك أكثر 💞",
    "خلي بالك من هديتي دي انا تعبان فيها ❤️",
    "معك الدنيا أحلى 🌸",
    " انا جعان ي مزتي🥹",
    "أنتِ أمنيتي الجميلة ✨",
    "كل لحظة بدونك ناقصة 💕",
    "ضحكتك تغني عن أي كلمات 😍",
    "أنتِ الفرح في حياتي 🌹",
    "مفيش حضن كدا ولا بوسه تدفيني ف الجو دا ي بنوتي💓",
    "أنتِ الأمان والحنان 🌟",
    "كل ثانية معك ذكرى جميلة ⏳",
    "بردو مش عايزه تديني بوسه 😘",
    "أنتِ ضوء أيامي المظلمة 🌞",
    "متسهريش كتير .بشوفك فاتحه بالليل💖",
    "نو تويست نو ريدبول ❤️",
    "يوم جديد لاجمل ام يوسف ف الدنيا💕",
    "كل يوم أحبك أكثر وأكثر 🥰",
    "نينينينيني 🌸",
    "أنتِ سبب كل سعادتي 🌟",
    "بجبككككك ي كتكوتي ",
    "تقلي ع نفسك ي بنوتي متخففيش ف الشتا دي ❤️"
];

function showDailyMessage() {
    const startDate = new Date(2025, 7, 23); // 23/7/2025
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const index = diffDays % messages.length; // يظهر رسالة جديدة كل يوم بشكل دائري
    const msgEl = document.getElementById("message");
    if (msgEl) msgEl.innerText = messages[index];
}

showDailyMessage();
setInterval(showDailyMessage, 1000 * 60 * 60); // تحديث كل ساعة فقط لضمان الرسالة اليومية


function updateLoveCounter() {
    const startDate = new Date(2025, 6, 23, 0, 0, 0); // 23/7/2025 (الشهر يبدأ من 0)
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diffMs = now - startDate;
    const totalSeconds = Math.floor(diffMs / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;

    const loveEl = document.getElementById("loveTimer");
    if (loveEl) {
        loveEl.innerHTML = `
            <div>${years} سنة</div>
            <div>${months} شهر</div>
            <div>${days} يوم</div>
            <div>${hours} ساعة</div>
            <div>${minutes} دقيقة</div>
            <div>${seconds} ثانية</div>
        `;
    }
}

setInterval(updateLoveCounter, 1000);
updateLoveCounter();

setInterval(updateCountdown, 1000); // تحديث كل ثانية

// -------------------------------------------------------------------------------------------------------


function nextPage(current) {
    const curr = document.getElementById("page" + current);
    if (curr) curr.style.display = 'none';
    let next = current + 1;
    const nextEl = document.getElementById("page" + next);
    if (nextEl) {
        nextEl.style.display = 'flex';
    }
}

function goToLock() {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('lock-screen').style.display = 'flex';
    if (passInput) passInput.focus();
}

function nextPage(current) {
    const curr = document.getElementById("page" + current);
    if (curr) curr.style.display = "none";

    const next = document.getElementById("page" + (current + 1));
    if (next) next.style.display = "flex";
}

function goToLock() {
    document.getElementById("interactive-pages").style.display = "none";
    document.getElementById("lock-screen").style.display = "flex";
    document.getElementById("passInput").focus();
}



function showSpecialMessage() {
    // أولاً: نخفي كل الصفحات الموجودة
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // ثانياً: نظهر صفحة الرسالة الخاصة فقط
    const specialPage = document.getElementById('specialMessagePage');
    if (specialPage) {
        specialPage.style.display = 'flex';
    }
}

// تأكد أن دالة nextPage لا تزال موجودة لديك لتبديل الصفحات عند الرفض
function nextPage(currentPageNumber) {
    // إخفاء الصفحة الحالية
    document.getElementById('page' + currentPageNumber).style.display = 'none';
    // إظهار الصفحة التالية
    const next = document.getElementById('page' + (currentPageNumber + 1));
    if (next) {
        next.style.display = 'flex';
    }
} function checkPassword() {
    const pass = document.getElementById("passInput").value;

    if (pass === "23/7/2025") {
        const lockScreen = document.getElementById("lock-screen");
        const mainContent = document.getElementById("main-content");

        // 1. ابدأ بتشغيل الموسيقى
        document.getElementById("bgMusic").play().catch(() => { });

        // 2. إضافة تأثير الاختفاء لشاشة القفل
        lockScreen.classList.add('fade-out');

        // 3. تجهيز المحتوى الرئيسي للظهور (بدون opacity في البداية)
        mainContent.style.display = "block";

        // 4. بعد ثانية (وقت الـ fade-out) نخفي القفل تماماً ونظهر المحتوى
        setTimeout(() => {
            lockScreen.style.display = "none";
            mainContent.classList.add('show');

            // تفعيل AOS لإعادة حساب الأنميشين بعد الظهور
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 1000); // 1000 مللي ثانية تساوي 1 ثانية

    } else {
        document.getElementById("error-msg").style.display = "block";
    }
}

