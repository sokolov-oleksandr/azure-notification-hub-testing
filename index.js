const { NotificationHubsClient } = require("@azure/notification-hubs");
const { createFcmV1Notification } = require("@azure/notification-hubs/models");

// ### secrets
const connectionString = "";
const hubName = "";
const deviceHandle = "";

// ### create client instance
const client = new NotificationHubsClient(connectionString, hubName);

// ### create FCM message
const messageBody = {
  message: {
    notification: {
      title: "Weather Update",
      body: "Current weather conditions:\nTemperature: 25°C\nHumidity: 60%\nWind Speed: 10 km/h",
    },
    android: {
      data: {
        temperature: "25°C",
        humidity: "60%",
        wind_speed: "10 km/h",
      },
    },
  },
};

const message = createFcmV1Notification({
  body: messageBody,
  headers: {
    "apns-priority": "10",
    "apns-push-type": "alert",
  },
});

// ### send message
async function sendNotification() {
  try {
    console.log(message, "message");
    const result = await client.sendNotification(message, { deviceHandle });
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);

    if (result.notificationId) {
      console.log(`Notification ID: ${result.notificationId}`);
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

sendNotification();
