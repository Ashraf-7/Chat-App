//! From Client-Side To Server-Side
let socket = io();

// Make Client Listen to Server Events
socket.on("connect", () => {
  console.log("Connected to Server.");
});

// Message From Server
socket.on("message", (data) => {
  let socketId;
  socketId = socket.id;
  if (socketId === data.socketId) {
    displayMessage(data.message, "right");
  } else {
    displayMessage(data.message, "left");
  }
});

socket.on("disconnect", () => {
  console.log("Disconnected from Server!");
});

// Start Client Side
const messageInput = document.getElementById("input");
const sendButton = document.getElementById("btn");
const form = document.getElementById("form");
const userName = document.getElementById("username").innerText;

// Message Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get Message Text
  const message = messageInput.value;
  // Check if input have a value
  // if (message == "") return;
  // displayMessage(message, "right");
  // Clear Input
  messageInput.value = "";
  // Emit Message to Server
  socket.emit("chatMessage", { sender: userName, message: message });
});

function displayMessage(message, direction) {
  // Create Elements
  const div = document.createElement("div");
  const messageP = document.createElement("p");
  const small = document.createElement("small");
  const clockIcon = document.createElement("i");
  const checkIcon = document.createElement("i");
  const date = new Date().toLocaleTimeString(); // moment().format("LTS");

  // Add Styled Classes
  if (direction === "right") {
    div.classList.add("chat-log__item", "owner");
  } else if (direction === "left") {
    div.classList.add("chat-log__item", "author");
  }
  messageP.textContent = message;
  clockIcon.classList.add("far", "fa-clock");
  checkIcon.classList.add("fas", "fa-check");

  // Append The Elements to The DOM
  clockIcon.innerText = ` ${date}`;
  small.appendChild(clockIcon);
  small.appendChild(checkIcon);
  div.appendChild(messageP);
  div.appendChild(small);
  document.getElementById("message-parent").append(div);
  scrollToBottom();
}

// Always Scroll to bottom of the Chat
let scrollToBottom = () => {
  let messages = document.getElementById("message-parent").lastElementChild;
  messages.scrollIntoView();
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Get GeoLocation
const geolocationBtn = document.getElementById("geolocation");
geolocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not Supported in your Browser.");
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      socket.emit("createLocationMessage", {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    () => {
      alert("Unable to fetch Location");
    }
  );
});

// Back to Conversation
// const backArrow = document.querySelector(".fa-arrow-left");
// let header = document.querySelector(".holder .left-col h5");
// let holder = document.querySelector(".holder");

// backArrow.addEventListener("click", () => {
//   // Hide Container and Show Conversations Holder
//   // holder.style.transform = "translateX(0)";
//   holder.style.display = "block";
//   holder.style.minWidth = "100%";
//   header.style.minWidth = "100%";
// });

// Back To Chat When Click on conversation
// let conversation = [...document.querySelectorAll("ul.conversations li")];

// conversation.forEach((conversation) => {
//   conversation.addEventListener("click", () => {
//     holder.style.display = "none";
//     holder.style.minWidth = "60%";
//     header.style.minWidth = "300px";
//   });
// });

/*
// Rooms
const roomInput = document.getElementById("room-input");

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});
*/
// End Client Side
