let pomodoros = 0;
let timeLeft = 1500; // 25 minutos em segundos
let timer;
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById("time").textContent = displayTime;
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(function () {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                pomodoros++;
                const pomodoroDivs = document.querySelectorAll(".pomodoro");
                if (pomodoros <= 4) {
                    pomodoroDivs[pomodoros - 1].classList.add("active");
                    if (pomodoros < 4) {
                        alert(`Pomodoro ${pomodoros} Concluído!`);
                        timeLeft = 1500; // 25 minutos para o próximo Pomodoro
                    } else {
                        alert("Você concluiu 4 Pomodoros. Hora de fazer uma pausa curta de 5 minutos!");
                        timeLeft = 300; // 5 minutos para a pausa curta
                    }
                    updateDisplay();
                } else if (pomodoros === 5) {
                    alert("Pausa curta de 5 minutos concluída. Hora de fazer mais 4 Pomodoros!");
                    pomodoros = 0;
                    timeLeft = 1500; // 25 minutos para o próximo Pomodoro
                    updateDisplay();
                    pomodoroDivs.forEach(div => div.classList.remove("active"));
                } else if (pomodoros === 9) {
                    alert("Você concluiu 4 Pomodoros. Hora de fazer uma pausa longa de 15 minutos!");
                    timeLeft = 900; // 15 minutos para a pausa longa
                    updateDisplay();
                } else if (pomodoros === 10) {
                    alert("Pausa longa de 15 minutos concluída. Hora de fazer mais 4 Pomodoros!");
                    pomodoros = 0;
                    timeLeft = 1500; // 25 minutos para o próximo Pomodoro
                    updateDisplay();
                    pomodoroDivs.forEach(div => div.classList.remove("active"));
                }
            }
        }, 1000);
        isRunning = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500;
    isRunning = false;
    pomodoros = 0;
    updateDisplay();
    const pomodoroDivs = document.querySelectorAll(".pomodoro");
    pomodoroDivs.forEach(div => div.classList.remove("active"));
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);

updateDisplay();
