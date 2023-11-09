// Add an event listener to the "button2" (now a button element) for sending the user's input
document.getElementById("send-button").addEventListener("click", function () {
  const userInput = document.getElementById("user-input").value;
  sendUserInputToServer(userInput);
});

function sendUserInputToServer(userInput) {
  // Send a POST request to the server to store the user's input
  fetch("https://db-vkyv.onrender.com/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: "user", // You can specify the user here
      text: userInput,
      time: new Date().toISOString(),
    }),
  })
    .then((response) => response.json())
    .then(() => {
      // Once the POST request is successful, trigger the GET request to update chat-text
      getTextFromServer();
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

// document.getElementById("send-button").addEventListener("click", function () {
//   const userInput = document.getElementById("user-input").value;
//   sendUserInputToServer(userInput);
// });

// document.getElementById("send-button").addEventListener("click", function () {
//   const userInput = document.getElementById("user-input").value;

//   // Create a new chat bubble for the user's message
//   addChatBubble("user", new Date().toLocaleString(), userInput);

//   // Clear the user input field
//   document.getElementById("user-input").value = "";

//   // Send the user's input to the server (if needed)
//   sendUserInputToServer(userInput);
// });

// function sendUserInputToServer(userInput) {
//   // Send a POST request to the server to store the user's input
//   fetch("https://db-vkyv.onrender.com/chats", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       user: "user", // You can specify the user here
//       text: userInput,
//       time: new Date().toISOString(),
//     }),
//   })
//     .then((response) => response.json())
//     .then(() => {
//       // Once the POST request is successful, trigger the GET request to update chat-text
//       getTextFromServer();
//     })
//     .catch((error) => {
//       console.error("Error sending data:", error);
//     });
// }

// function addChatBubble(username, time, text) {
//   const chatContainer = document.getElementById("chat-container");

//   // Create a new chat bubble element
//   const chatBubble = document.createElement("div");
//   chatBubble.classList.add("chat-bubble");

//   // Create the HTML structure for the chat bubble
//   chatBubble.innerHTML = `
//     <img class="img-container" src="img/bub.png" alt="Italian Trulli">
//     <div class="chat-text">
//       ${username} (${time}): ${text}
//     </div>
//   `;

//   // Append the chat bubble to the chat container
//   chatContainer.appendChild(chatBubble);
// }

// // Rest of your code

function getTextFromServer() {
  fetch("https://db-vkyv.onrender.com/chats")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        // Get the last message in the array (assuming messages are in chronological order)
        const latestMessage = data[data.length - 1];

        const chatBubble = document.getElementById("output");
        const username = latestMessage.user;
        const messageDate = new Date(latestMessage.time);
        const hours = messageDate.getHours();
        const minutes = messageDate.getMinutes();
        const time = `${hours}:${minutes}`;

        // Create a message format with line breaks
        const message = `${username} <br> (${time}): <br> ${latestMessage.text}`;

        chatBubble.innerHTML = message; // Use innerHTML to interpret HTML tags

        // Check if the text contains Hebrew characters
        const hasHebrew = /[\u0590-\u05FF]/.test(latestMessage.text);
        if (hasHebrew) {
          chatBubble.classList.add("hebrew");
        } else {
          chatBubble.classList.remove("hebrew");
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

setInterval(getTextFromServer, 2500);
