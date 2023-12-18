const mqtt = require('mqtt');

const serverUri = 'mqtts://broker.donga.edu.vn'; // Note the 'mqtts' for secure connection
const clientId = 'mqttx_739a35d45';
const topics = ['TOPIC-UDA/Device/Content/demo-device-2/afcbc25d',];
const username = 'UDA-APP';
const password = 'Vc0nn3x@xZcevKa';
const port = 1884;
const secure = true; 

// Create an MQTT client instance
const client = mqtt.connect(serverUri, {
  clientId: clientId,
  username: username,
  password: password,
  port: port,
  clean: true, 
  rejectUnauthorized: secure, 
});
let lastMessage = '';

function onConnect(callback) {
  // Handle connection events
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    // Subscribe to the desired topic
    client.subscribe(topics);
  });

  // Handle incoming messages
  client.on('message', (topic, message) => {
    lastMessage = message.toString();
    callback(message);
  });
}


function publishMessage(topic, message) {
  client.publish(topic, message);
}

module.exports = {
  getLastMessage: () => lastMessage,
  publishMessage: publishMessage, // Export the publishMessage function
  onConnect: onConnect
};;
