# Facebook Clone

A social media application that replicates some of the features of Facebook. It provides users a platform to connect, share, and engage with friends and family.

## Demo

https://sondm-facebook.netlify.app

> [!NOTE]
> The server may take up to 1 minute to process the first request. It spins down after 15 minutes of no incoming traffic, and will need some time to spin back up.

## Features

1. **Implemented**

- Authentication: register, login, logout.
- (BE) User management: get user info, update user info, delete account
- (BE) Follow and unfollow people.
- (BE) Friend: friend list, friend request list, send/cancel/accept/reject friend requests, unfriend.
- (BE) Post: create/get/update/delete post, post list, react to post.
- (FE) Home page UI

2. **In progress**

- (FE) Integrate with BE: 'Post' feature

3. **Todo**

- (FE) Build UI for the other pages (Profile, Friends)
- (BE) Comment: add/edit/delete comment, comment list, react and reply to comment.

## Technologies

1. **Frontend**

- ReactJS
- React Router
- Axios
- Redux, Redux Saga
- React Hook Form
- Sass

2. **Backend**

- NodeJS, Express
- MongoDB, Mongoose
- Express Validator
- Bcrypt, JWT

## Development

To run the project locally, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/SonDo580/facebook-clone.git
cd facebook-clone
```

2. Create a MongoDB database and get the connection string

3. Create a `.env` file in the server project and add the following:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Install server dependencies and run server

```bash
cd server
yarn
yarn dev
```

5. Install client dependencies and run client

```bash
cd client
yarn
yarn dev
```

6. Visit http://localhost:5173 in your web browser.
