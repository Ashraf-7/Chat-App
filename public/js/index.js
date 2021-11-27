const messageInput = document.getElementById("input");
const sendButton = document.getElementById("btn");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;

  if (message == "") return;
  displayMessage(message);

  messageInput.value = "";
});

function displayMessage(message) {
  // Create Elements
  const div = document.createElement("div");
  const messageP = document.createElement("p");
  const small = document.createElement("small");
  const clockIcon = document.createElement("i");
  const checkIcon = document.createElement("i");
  const date = new Date().toLocaleTimeString();

  // Add Styled Classes
  div.classList.add("chat-log__item", "owner");
  messageP.textContent = message;
  clockIcon.classList.add("far", "fa-clock");
  checkIcon.classList.add("fas", "fa-check");

  // Append The Elements to The DOM
  clockIcon.innerHTML = ` ${date}`;
  small.appendChild(clockIcon);
  small.appendChild(checkIcon);
  div.appendChild(messageP);
  div.appendChild(small);
  document.getElementById("message-parent").append(div);
}

/*
// Rooms
const roomInput = document.getElementById("room-input");

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});
*/
