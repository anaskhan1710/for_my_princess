const relationshipStart = "2024-01-01T00:00:00";

const reveals = document.querySelectorAll(".reveal");
const ideaButton = document.getElementById("idea-button");
const dateIdea = document.getElementById("date-idea");
const timeTogether = document.getElementById("time-together");
const modal = document.getElementById("letter-modal");
const modalClose = document.getElementById("modal-close");
const letterTitle = document.getElementById("letter-title");
const letterBody = document.getElementById("letter-body");
const letterTriggers = document.querySelectorAll("[data-letter]");

const letters = {
  "miss-you": {
    title: "Open when you miss me",
    body: "If distance feels loud today, read this slowly: you are loved in every quiet minute too. I still look for you in songs, in late-night thoughts, in random little things that make me smile. Missing you only proves how deeply my heart learned your name.",
  },
  "need-smile": {
    title: "Open when you need a smile",
    body: "Your smile has healing powers and I need you to know that. Even on messy days, you are still the same beautiful girl with a soft heart and the prettiest energy. Drink some water, breathe, and let this note kiss your forehead from far away.",
  },
  doubt: {
    title: "Open when you doubt yourself",
    body: "Ashra, there is nothing ordinary about you. You are thoughtful, lovable, magnetic, and stronger than the moments that make you question yourself. Be gentle with your heart. I am still proud of you on the days you do not feel shiny.",
  },
  future: {
    title: "Open when you think about us",
    body: "I think our future deserves soft mornings, chaotic jokes, beautiful photos, and the kind of peace that comes from choosing each other again and again. You make the idea of tomorrow feel sweeter.",
  },
  morning: {
    title: "Morning note",
    body: "Good morning, pretty girl. I hope your day is kind to you, your coffee tastes perfect, and at least one thing happens today that makes you grin for no reason.",
  },
  proud: {
    title: "Proud of you note",
    body: "In case no one said it loudly enough today, I am proud of you. Proud of your heart, your effort, your softness, and the ways you keep going even when the day feels heavy.",
  },
  kiss: {
    title: "Stolen kiss note",
    body: "This is your tiny digital kiss. It is soft, a little dramatic, and fully yours. Keep it for emergencies or for whenever you want to feel adored for a second.",
  },
};

const dateIdeas = [
  "Order the same dessert, video call, and rate each bite like you are judges on a romance show.",
  "Build matching Pinterest boards for your dream room, dream date, and dream holiday together.",
  "Watch the same movie, mute it during one scene, and make up your own funny dialogue together.",
  "Do a voice-note date where you answer five deep questions and one silly one before bed.",
  "Pick outfits for each other online and explain why each look feels so Ashra-coded.",
  "Cook or assemble the same snack while on call, then eat together with candles on.",
  "Take a virtual museum tour, then each choose one artwork that reminds you of your relationship.",
  "Make a two-person playlist in real time and tell the story behind every song you add.",
];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((item) => revealObserver.observe(item));

function updateTimeTogether() {
  const start = new Date(relationshipStart);
  const now = new Date();

  if (Number.isNaN(start.getTime())) {
    timeTogether.textContent = "Set your date in script.js";
    return;
  }

  const totalMs = now - start;
  const days = Math.max(0, Math.floor(totalMs / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((totalMs / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((totalMs / (1000 * 60)) % 60));

  timeTogether.textContent = `${days} days, ${hours} hours, ${minutes} minutes`;
}

function randomizeDateIdea() {
  const current = dateIdea.textContent;
  const availableIdeas = dateIdeas.filter((idea) => idea !== current);
  const nextIdea = availableIdeas[Math.floor(Math.random() * availableIdeas.length)] || dateIdeas[0];
  dateIdea.textContent = nextIdea;
}

function openLetter(letterKey) {
  const letter = letters[letterKey];
  if (!letter) return;
  letterTitle.textContent = letter.title;
  letterBody.textContent = letter.body;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLetter() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

ideaButton.addEventListener("click", randomizeDateIdea);
letterTriggers.forEach((trigger) => trigger.addEventListener("click", () => openLetter(trigger.dataset.letter)));
modalClose.addEventListener("click", closeLetter);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") closeLetter();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeLetter();
});

updateTimeTogether();
setInterval(updateTimeTogether, 60000);
