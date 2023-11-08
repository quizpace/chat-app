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

// Function to fetch text from the server and update the chat bubble
function getTextFromServer() {
  fetch("https://db-vkyv.onrender.com/chats")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        // Get the last message in the array (assuming messages are in chronological order)
        const latestMessage = data[data.length - 1];

        const chatBubble = document.getElementById("output");
        const username = latestMessage.user;
        const time = new Date(latestMessage.time).toLocaleString(); // Convert time to a more readable format

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
