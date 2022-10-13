const createSubscriber = require("pg-listen");
// import { databaseURL } from "./config"

const DB_USER = "admin";
const DB_PASS = "admin";
const DB_HOST_PORT = "127.0.0.1:5432";
const DB_NAME = "parse";

const databaseURL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST_PORT}/${DB_NAME}`;

// Accepts the same connection config object that the "pg" package would take
const subscriber = createSubscriber({ connectionString: databaseURL });

subscriber.notifications.on("my_channel", (payload) => {
  // Payload as passed to subscriber.notify() (see below)
  console.log("Received notification in 'my_channel':", payload);
});

subscriber.events.on("connected", () => {
  console.log("Connected");
});

subscriber.events.on("notification", ({ channel, payload }) => {
  console.log("notification: ", channel, payload, ' \n');
});

subscriber.events.on("reconnect", (attempt) => {
    console.log("reconnect: ", attempt);
  });

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error);
  process.exit(1);
});

process.on("exit", () => {
  subscriber.close();
});

async function connect() {
  await subscriber.connect();
  await subscriber.listenTo("my_channel");
}

async function sendSampleMessage() {
  await subscriber.notify("my_channel", {
    greeting: "Hey, buddy.",
    timestamp: Date.now(),
  });
}

function main() {
  connect()
    .then(async () => {
      console.log("send a sample message to the channel after every 5 seconds");
    //   setInterval(async () => {
    //     await sendSampleMessage();
    //   }, 5000);
    })
    .catch((error) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}

main();
