document.querySelectorAll(".activity-row").forEach((row) => {
  const display = row.querySelector(".activity-duration");
  const startBtn = row.querySelector(".btn-start");
  const stopBtn = row.querySelector(".btn-stop");

  const dayId = row.dataset.dayId;
  const activityId = row.dataset.activityId;

  let seconds = parseInt(display.textContent.split(":")[0]) * 60;
  let interval = null;

  function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    display.textContent =
      `${mins.toString().padStart(2, "0")}:` +
      `${secs.toString().padStart(2, "0")}`;
  }

  async function markAsCompleted() {
    try {
      const response = await fetch(`/days/${dayId}/activities/${activityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });

      if (response.ok) {
        row.classList.add("completed");
        startBtn.disabled = true;
        stopBtn.disabled = true;
      } else {
        console.error("Erro ao salvar no banco");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  }

  startBtn.addEventListener("click", () => {
    if (interval !== null) return;

    startBtn.disabled = true;
    stopBtn.disabled = false;

    interval = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(interval);
        interval = null;

        markAsCompleted();

        startBtn.disabled = false;
        return;
      }

      seconds--;
      updateDisplay();
    }, 1000);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
});
