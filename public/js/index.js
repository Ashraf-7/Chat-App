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

/*
// Room
const roomInput = document.getElementById("room-input");

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-content").append(div);
}
*/
