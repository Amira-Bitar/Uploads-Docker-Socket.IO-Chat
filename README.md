# Task 10: Uploads, Docker & Socket.IO Chat

## Environment Variables

Create a `.env` file:

```env
PORT=3000
HOST=127.0.0.1
MONGODB_URI=mongodb://mongo:27017/IOChat

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Run with Docker

```bash
docker compose up --build
```

## Test Upload APIs

### Local Upload

```
POST /api/v1/upload/local
```

Upload an image using **form-data** with the field name:

```
image
```

### Cloud Upload

```
POST /api/v1/upload/cloud
```

Upload an image using **form-data** with the field name:

```
image
```

## Socket.IO Events

### Server Listens

- connection
- disconnect
- chat:join
- chat:message
- chat:typing

### Client Emits

- chat:join
- chat:message
- chat:typing

### Server Broadcasts

- chat:join
- chat:message
- chat:typing
- user-left

## Test Socket.IO

Open two browser windows:

```
http://localhost:3000
```

Use the test page to:
- Join the chat.
- Send a message.
- Send a typing event.

# Chat App

This is my socket.io chat app 

typing example:

![App Screenshot](./uploads/images/chat%201.png)

stopped typing example:

![App Screenshot](./uploads/images/chat%202.png)

stopped typing disapeared example:
![App Screenshot](./uploads/images/chat%203.png)

send message example:
![App Screenshot](./uploads/images/chat%204.png)