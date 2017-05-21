import paho.mqtt.client as paho
import time
import json

#Create the client
client = paho.Client()

#Callback functions
def on_connect(client, userdata, flags, rc):
	print("CONNACK WITH " + str(rc))

def on_publish(client, userdata, mid):
	print("Successfully Published")

def on_message(client, userdata, msg):
	print(msg.topic + " " + str(msg.payload))

def controls_callback(client, userdata, msg):
	print("Controls sent: " + str(msg.payload))

def shutdown_callback(client, userdata, msg):
	print("Shutdown Recieved")
        client.publish(topic="shutdown_ack", payload="Shutdown Acknowleged", qos=2)

def stop_callback(client, userdata, msg):
	print("Stop Recieved")
	client.publish(topic="stop_ack", payload="Stop Acknowleged", qos=2)



def itinerary_callback(client, userdata, msg):
	json.loads(msg.payload)
	print("Itinerary updated: \n" + msg.payload)

client.on_connect = on_connect
client.on_publish = on_publish
client.on_message = on_message


#Connect
client.connect("192.168.76.254", 1885)

#Callbacks for specific subscriptions

#Controls
client.subscribe("controls", qos=2)

#Itinerary
client.subscribe("itinerary", qos=2)
client.message_callback_add("itinerary", itinerary_callback)

#Shutdown
client.subscribe("shutdown", qos=2)
client.message_callback_add("shutdown", shutdown_callback)

#Stop
client.subscribe("stop", qos=2)
client.message_callback_add("stop", stop_callback)




#Create the client

client.loop_start()

while True:
        time.sleep(5)
	client.publish(topic="temperature", payload="hot", qos=2)


def update_imu():
	client.publish(topic="imu", payload="????", qos=2, retain=True)



