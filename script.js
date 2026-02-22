/* ============================================================
   script.js — نسخة مُصلَّحة بالكامل
   ============================================================ */

/* ===== 1. مرجع عناصر DOM (مرة واحدة بس) ===== */
const passInput    = document.getElementById('passInput');
const bgMusic      = document.getElementById('bgMusic');
const lockScreen   = document.getElementById('lock-screen');
const mainContent  = document.getElementById('main-content');

/* ===== 2. إعداد AOS ===== */
AOS.init({ duration: 1200, once: true });

/* ===== 3. قفل الشاشة عند التحميل ===== */
document.body.classList.add('locked-screen');

/* ============================================================
   التحقق من كلمة السر
   ============================================================ */
function checkPassword() {
    const pass = passInput ? passInput.value.trim() : '';

    if (pass === "23/7/2025") {
        // 1. شغّل الموسيقى
        if (bgMusic) bgMusic.play().catch(() => {});

        // 2. اختفاء شاشة القفل
        lockScreen.classList.add('fade-out');

        // 3. جهّز المحتوى الرئيسي
        mainContent.style.display = "block";

        // 4. بعد ثانية: اخفِ القفل وأظهر المحتوى
        setTimeout(() => {
            lockScreen.style.display = "none";
            document.body.classList.remove('locked-screen');
            mainContent.classList.add('show');
            if (typeof AOS !== 'undefined') AOS.refresh();
        }, 1000);

    } else {
        const errEl = document.getElementById("error-msg");
        if (errEl) errEl.style.display = "block";
    }
}

/* ============================================================
   فتح / إغلاق المظروف
   ============================================================ */
function openLetter() {
    const letter = document.querySelector('.letter-container');
    if (letter) letter.classList.toggle('open');
}

/* ============================================================
   تشغيل / إيقاف الموسيقى
   ============================================================ */
function toggleMusic() {
    if (!bgMusic) return;
    bgMusic.paused ? bgMusic.play() : bgMusic.pause();
}

/* ============================================================
   العداد التنازلي لرأس السنة  (إصلاح: حذف setInterval للـ updateCountdown غير المعرَّفة)
   ============================================================ */
function startCountdown() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    // تاريخ ثابت: أول يناير 2026
    const targetDate = new Date('Jan 1, 2026 00:00:00').getTime();

    const interval = setInterval(() => {
        const now  = Date.now();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (!timerElement.classList.contains('celebrating')) {
                timerElement.innerHTML = `<div>🎉 بدأت سنتنا الجديدة 2026 وأنا مع أجمل بنوتة في الدنيا 🎉</div>`;
                timerElement.classList.add('celebrating');
                launchFireworks();           // ← معرَّفة أدناه
            }
            clearInterval(interval);
            return;
        }

        const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs  = Math.floor((diff % (1000 * 60)) / 1000);

        timerElement.innerHTML = `
            <div>${days} يوم</div>
            <div>${hours} ساعة</div>
            <div>${mins} دقيقة</div>
            <div>${secs} ثانية</div>
        `;
    }, 1000);
}

startCountdown();

/* ============================================================
   الألعاب النارية (إصلاح: كانت غير معرَّفة فيسبب crash)
   ============================================================ */
function launchFireworks() {
    if (typeof confetti === 'undefined') return; // تأكد من وجود المكتبة

    const duration  = 5 * 1000;
    const end       = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

/* ============================================================
   الرسالة اليومية
   (إصلاح: الشهر كان 7 بدل 6 — الشهور في JS تبدأ من 0)
   ============================================================ */
const messages = [
    "أحبك اليوم أكثر من أمس 💖",
    "أنتِ سبب ابتسامتي 😊",
    "قلبي ملكك فقط ❤️",
    "لو قصيتي شعرك هنفخك ✨",
    "هاي مزتي 🌹",
    "وجودك يدفئ أيامي 🔥",
    "خلي بالك من رسمتي 😍",
    "أنتِ ملكة قلبي 👑",
    "حبي لك لا ينتهي ♾️",
    "كل يوم أحبك أكثر 💞",
    "خلي بالك من هديتي دي أنا تعبان فيها ❤️",
    "معك الدنيا أحلى 🌸",
    "أنا جعان يا مزتي 🥹",
    "أنتِ أمنيتي الجميلة ✨",
    "كل لحظة بدونك ناقصة 💕",
    "ضحكتك تغني عن أي كلمات 😍",
    "أنتِ الفرح في حياتي 🌹",
    "مفيش حضن كده ولا بوسة تدفيني في الجو ده يا بنوتي 💓",
    "أنتِ الأمان والحنان 🌟",
    "كل ثانية معك ذكرى جميلة ⏳",
    "بردو مش عايزة تديني بوسة 😘",
    "أنتِ ضوء أيامي المظلمة 🌞",
    "متسهريش كتير، بشوفك فاتحة بالليل 💖",
    "نو تويست نو ريدبول ❤️",
    "يوم جديد لأجمل أم يوسف في الدنيا 💕",
    "كل يوم أحبك أكثر وأكثر 🥰",
    "نينينينيني 🌸",
    "أنتِ سبب كل سعادتي 🌟",
    "بجبككككك يا كتكوتي 😘",
    "تقلي عَ نفسك يا بنوتي متخففيش في الشتا دي ❤️"
];

function showDailyMessage() {
    // إصلاح: الشهر 6 = يوليو (الشهور من 0)
    const startDate = new Date(2025, 6, 23);
    const now       = new Date();
    const diffDays  = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const index     = ((diffDays % messages.length) + messages.length) % messages.length;

    const msgEl = document.getElementById("message");
    if (msgEl) {
        msgEl.style.opacity = '0';
        setTimeout(() => {
            msgEl.innerText  = messages[index];
            msgEl.style.opacity = '1';
        }, 300);
    }
}

showDailyMessage();
// تحديث كل ساعة فقط — مش كل ثانية عشان متعبش الجهاز
setInterval(showDailyMessage, 1000 * 60 * 60);

/* ============================================================
   عداد عمر الحُب
   ============================================================ */
function updateLoveCounter() {
    // إصلاح: الشهر 6 = يوليو
    const startDate = new Date(2025, 6, 23, 0, 0, 0);
    const now       = new Date();

    let years  = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth()    - startDate.getMonth();
    let days   = now.getDate()     - startDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const totalSecs = Math.floor((now - startDate) / 1000);
    const seconds   = totalSecs % 60;
    const minutes   = Math.floor(totalSecs / 60) % 60;
    const hours     = Math.floor(totalSecs / 3600) % 24;

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

/* ============================================================
   الصفحات التفاعلية
   (إصلاح: تعريف واحد بس لكل دالة)
   ============================================================ */
function nextPage(current) {
    const curr = document.getElementById("page" + current);
    if (curr) curr.style.display = "none";

    const next = document.getElementById("page" + (current + 1));
    if (next) next.style.display = "flex";
}

function goToLock() {
    const interactivePages = document.getElementById("interactive-pages");
    if (interactivePages) interactivePages.style.display = "none";

    if (lockScreen) {
        lockScreen.style.display = "flex";
        lockScreen.classList.remove('fade-out'); // إعادة الظهور لو كانت مختفية
    }
    if (passInput) passInput.focus();
}

function showSpecialMessage() {
    // إخفاء كل الصفحات
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

    // إظهار صفحة الرسالة الخاصة
    const specialPage = document.getElementById('specialMessagePage');
    if (specialPage) specialPage.style.display = 'flex';
}

/* ============================================================
   Enter key على حقل كلمة السر
   ============================================================ */
if (passInput) {
    passInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') checkPassword();
    });
}
