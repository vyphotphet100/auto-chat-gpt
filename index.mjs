import robot from "robotjs";
import clipboardy from "clipboardy";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/api/ask", (req, res) => {
  const textToCopy1 = "Preparing..";
  clipboardy.write(textToCopy1);
  const message = req.body.message;
  console.log(message);
  ask(message);
  var interval = setInterval(function () {
    const clipboardText = clipboardy.readSync();
    if (clipboardText.includes("ChatGPT_Response:")) {
      clearInterval(interval);
      const textToCopy = "Got it!";
      clipboardy.write(textToCopy);
      res.json({ result: clipboardText.replace("ChatGPT_Response:", "") });
    }
  }, 1000);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

function ask(message) {
  robot.moveMouseSmooth(1500, 1020);
  setTimeout(() => {
    robot.mouseClick();
    robot.mouseClick();
  }, 10);

  for (let i = 0; i < message.length; i++) {
    let timeOut = 1000;
    setTimeout(() => {
      robot.typeString(message[i]);
    }, timeOut + i * 10);

    if (i === message.length - 1) {
      setTimeout(() => {
        robot.keyTap("enter");
      }, timeOut + i * 20);
    }
  }
}
