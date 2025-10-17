// 중앙 서버 주소
const SERVER_URL = "http://<중앙서버-IP>:3000";
const PI_ID = "pi1";  // 라즈베리파이 번호

const socket = io(SERVER_URL);

const carNumberEl = document.getElementById("carNumber");
const arrowEl = document.getElementById("arrow");
let resetTimer = null;

// 서버에 자신 등록
socket.emit("register", { id: PI_ID });

// 서버에서 화살표 명령 받기
socket.on("update-display", (data) => {
  const { car_number, direction } = data;

  carNumberEl.textContent = car_number || "-";

  let arrowSymbol = "⬜";
  if (direction === "left") arrowSymbol = "⬅️";
  else if (direction === "right") arrowSymbol = "➡️";
  else if (direction === "up") arrowSymbol = "⬆️";
  else if (direction === "down") arrowSymbol = "⬇️";

  arrowEl.textContent = arrowSymbol;
  arrowEl.classList.add("booster");

  if (resetTimer) clearTimeout(resetTimer);

  resetTimer = setTimeout(() => {
    arrowEl.textContent = "⬜";
    arrowEl.classList.remove("booster");
    carNumberEl.textContent = "-";
  }, 3000);
});