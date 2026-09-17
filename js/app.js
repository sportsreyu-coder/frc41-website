// Footer year, everywhere it appears.
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Shared FAQ data. The home page uses the first 5; the Parents FAQ page uses all 8.
const FAQS = [
  {
    q: "What is the time commitment?",
    a: "During build season (January to February) the team meets most weekdays after school and some Saturdays. Off-season is lighter — roughly one or two afternoons a week.",
  },
  {
    q: "Does my student need engineering experience?",
    a: "No. Most members join with none. Students are paired with mentors and older members, and every subteam trains from the basics up.",
  },
  {
    q: "What does it cost to participate?",
    a: "Team dues cover a portion of travel and materials, and need-based assistance is available so cost never keeps a student out. Contact us for current figures.",
  },
  {
    q: "Is this only for students who want to be engineers?",
    a: "No. Alongside the robot, students run our budget, sponsor relationships, media, and outreach. Those roles carry the same weight on the team.",
  },
  {
    q: "How do competitions work?",
    a: "We attend regional events in the spring, where three-team alliances play a new game each season. Families are welcome — events are free to attend as a spectator.",
  },
  {
    q: "Is the shop safe?",
    a: "Safety training comes before shop access. Eye protection is required at all times, power tools require sign-off, and a mentor is present whenever the shop is open.",
  },
  {
    q: "How much travel is involved?",
    a: "Regional events are typically within driving distance. A trip to the World Championship, when we qualify, is the one longer trip in a season.",
  },
  {
    q: "Where does this lead after high school?",
    a: "Students leave with CAD, machining, programming, and project management experience, plus access to the FIRST scholarship program.",
  },
];

// Season-by-season robot archive. Extend this back through 1997 as records are found.
// Photos and records sourced from The Blue Alliance (thebluealliance.com/team/41).
const ROBOTS = [
  { season: "2025", game: "REEFSCAPE", note: "Add this robot’s name and how the season finished." },
  { season: "2024", game: "CRESCENDO", note: "Robot: PLATO. Went 13-19-0 in the FIRST Mid-Atlantic District, ranked #77.", photo: "images/robots/2024.jpg" },
  { season: "2023", game: "CHARGED UP", note: "Robot: Wim. Went 8-14-2 and won the Innovation in Control Award twice.", photo: "images/robots/2023.jpg" },
  { season: "2022", game: "RAPID REACT", note: "Went 41-23-1, ranked #10 in the FIRST Mid-Atlantic District, and reached District Championship. District Event Finalist and Excellence in Engineering Award at Bridgewater-Raritan.", photo: "images/robots/2022.jpg" },
  { season: "2020–21", game: "INFINITE RECHARGE", note: "The season cut short by the pandemic. Add your notes." },
  { season: "2019", game: "DESTINATION: DEEP SPACE", note: "Went 23-17-0, ranked #48 in the FIRST Mid-Atlantic District. Captained an alliance to the quarterfinals at Mount Olive.", photo: "images/robots/2019.jpg" },
];

function renderFaq(container, faqs, { openFirst = true } = {}) {
  if (!container) return;

  faqs.forEach((faq, i) => {
    const item = document.createElement("div");
    item.className = "faq-item" + (openFirst && i === 0 ? " is-open" : "");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "faq-trigger";
    button.setAttribute("aria-expanded", openFirst && i === 0 ? "true" : "false");
    button.setAttribute("aria-controls", `faq-body-${container.id}-${i}`);

    const question = document.createElement("span");
    question.textContent = faq.q;

    const icon = document.createElement("span");
    icon.className = "faq-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "+";

    button.append(question, icon);

    const body = document.createElement("div");
    body.className = "faq-body";
    body.id = `faq-body-${container.id}-${i}`;

    const answer = document.createElement("p");
    answer.className = "faq-answer";
    answer.textContent = faq.a;
    body.appendChild(answer);

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      container.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        openItem.classList.remove("is-open");
        openItem.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });

    item.append(button, body);
    container.appendChild(item);
  });
}

function renderRobots(container, robots) {
  if (!container) return;

  robots.forEach((robot) => {
    const card = document.createElement("div");
    card.className = "robot-card";

    let photo;
    if (robot.photo) {
      photo = document.createElement("img");
      photo.className = "ratio-4-3 robot-photo";
      photo.src = robot.photo;
      photo.alt = `Team 41's ${robot.season} robot` + (robot.game ? ` for ${robot.game}` : "");
      photo.loading = "lazy";
    } else {
      photo = document.createElement("div");
      photo.className = "image-well ratio-4-3 robot-photo";
      photo.textContent = "Drop a robot photo";
    }

    const info = document.createElement("div");
    info.className = "robot-info";

    const season = document.createElement("div");
    season.className = "robot-season";
    season.textContent = robot.season;

    const game = document.createElement("h2");
    game.className = "robot-game";
    game.textContent = robot.game;

    const note = document.createElement("p");
    note.className = "robot-note";
    note.textContent = robot.note;

    info.append(season, game, note);
    card.append(photo, info);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const homeFaq = document.getElementById("home-faq");
  if (homeFaq) renderFaq(homeFaq, FAQS.slice(0, 5));

  const fullFaq = document.getElementById("full-faq");
  if (fullFaq) renderFaq(fullFaq, FAQS);

  const robotArchive = document.getElementById("robot-archive");
  if (robotArchive) renderRobots(robotArchive, ROBOTS);
});
