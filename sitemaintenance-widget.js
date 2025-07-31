
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const s = document.getElementById("maintenance-fullscreen-script");
    if (!s) return;

    const title = s.getAttribute("data-title") || "🛠️ Under Maintenance";
    const timeStr = s.getAttribute("data-time");
    if (!timeStr) return console.error("Missing data-time for maintenance widget");

    const endTime = new Date(timeStr);
    if (isNaN(endTime)) return console.error("Invalid date format");

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "maintenance-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #1a1a1a;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      font-family: 'Segoe UI', sans-serif;
      text-align: center;
    `;

    overlay.innerHTML = `
      <h1 style="font-size: 28px; margin-bottom: 16px;">${title}</h1>
      <p style="font-size: 18px; margin-bottom: 20px;">We’ll be back shortly. Please check back in:</p>
      <div id="maintenance-timer" style="font-size: 32px; font-weight: bold;">Loading...</div>
    `;

    document.body.appendChild(overlay);

    const timerDiv = overlay.querySelector("#maintenance-timer");

    function updateCountdown() {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();

      if (distance <= 0) {
        timerDiv.innerHTML = "🎉 We're back online soon!";
        clearInterval(interval);

        // Auto-remove overlay after 2 hours
        setTimeout(() => {
          const o = document.getElementById("maintenance-overlay");
          if (o) o.remove();
        },  1 * 60 * 60 * 1000); // 1 hours
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      timerDiv.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  });
})();
