const player = document.getElementById("player");
const zones = document.querySelectorAll(".zone");
const info = document.getElementById("info");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

document.addEventListener("keydown", (e) => {
  const step = 20;
  if (e.key === "ArrowUp") pos.y -= step;
  if (e.key === "ArrowDown") pos.y += step;
  if (e.key === "ArrowLeft") pos.x -= step;
  if (e.key === "ArrowRight") pos.x += step;

  pos.x = Math.max(0, Math.min(window.innerWidth - 40, pos.x));
  pos.y = Math.max(0, Math.min(window.innerHeight - 40, pos.y));

  player.style.left = pos.x + "px";
  player.style.top = pos.y + "px";

  checkZone();
});

function checkZone() {
  let found = false;
  zones.forEach(zone => {
    zone.classList.remove("active");
    const rect = zone.getBoundingClientRect();
    if (
      pos.x + 20 > rect.left &&
      pos.x < rect.right &&
      pos.y + 20 > rect.top &&
      pos.y < rect.bottom
    ) {
      zone.classList.add("active");
      info.textContent = `You entered ${zone.textContent}! Press Enter to interact.`;
      found = true;

      document.onkeydown = (e) => {
        if (e.key === "Enter") openModal(zone.id);
      };
    }
  });
  if (!found) {
    info.textContent = "Use arrow keys to explore!";
    document.onkeydown = null;
  }
}

function openModal(zoneId) {
  modal.classList.remove("hidden");
  let content = "";

  switch (zoneId) {
    case "resume":
      content = `
        <h2>Resume Forest</h2>
        <p><strong>Current Role:</strong> Learning Ambassador at Amazon</p>
        <p>Trains new hires, creates safety modules, and provides hands-on coaching.</p>
        <p><strong>Past Role:</strong> Fulfillment Associate – Managed 90k+ package workflow and exceeded scan quotas.</p>
        <p><strong>Education:</strong> Correlation One – HTML, CSS, JavaScript, WordPress</p>
      `;
      break;

    case "projects":
      content = `
        <h2>Project Plaza</h2>
        <ul>
          <li><strong>About Me Page</strong> – JavaScript toggle, contact form, responsive CSS layout</li>
          <li><strong>Crafts Website</strong> – HTML layout, CSS branding, JS image slider for kids’ magnet business</li>
          <li><strong>Trivia Game</strong> – Multi-question quiz with answer validation and responsive design</li>
        </ul>
      `;
      break;

    case "about":
      content = `
        <h2>About Me Mountain</h2>
        <p>I’m looking to find a position in software and web development so I can use my skills to help companies reach a larger customer base and grow as a developer.</p>
        <p>Interests: Family, Music, Helping others through tech</p>
      `;
      break;

    case "contact":
      content = `
        <h2>Contact Cave</h2>
        <p>Email: <a href="mailto:Dman1991g@aol.com">Dman1991g@aol.com</a></p>
        <p>Phone: (317) 374-6297</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/danielgraham91" target="_blank">linkedin.com/in/danielgraham91</a></p>
        <p>GitHub Portfolio: <a href="https://dman1991g.github.io/codingjourney/" target="_blank">View Projects</a></p>
      `;
      break;
  }

  modalContent.innerHTML = content;
}

function closeModal() {
  modal.classList.add("hidden");
}
