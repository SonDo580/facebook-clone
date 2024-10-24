# Facebook Clone

A social media application that replicates some of the features of Facebook. It provides users a platform to connect, share, and engage with other people.

## Demo

> [!NOTE]
> Netlify suspended this site for some reasons (https://sondm-facebook.netlify.app)

## Features

1. **Implemented**

- Authentication: register, login, logout.
- Post feature: get feed posts, react to post, create/edit/delete post.
- (BE) User management: get user info, update user info, delete account
- (BE) Follow and unfollow people.
- (BE) Friend feature: friend list, friend request list, send/cancel/accept/reject friend requests, unfriend.

2. **In progress**

- Allow adding post photos.

3. **Todo**

- Use infinite scroll to get feed posts.
- Return posts even when user hasn't created any post or followed any person.
- (FE) Build UI for the other pages (Profile, Friends).
- (BE) Comment: add/edit/delete comment, comment list, react and reply to comment.

## Technologies

1. **Frontend**

- ReactJS
- React Router
- Redux, Redux Saga
- React Hook Form
- Axios
- Sass

2. **Backend**

- NodeJS, Express
- MongoDB, Mongoose
- Express Validator
- JWT, Bcrypt

## Development

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/SonDo580/facebook-clone.git
cd facebook-clone
```

2. Create a MongoDB database and get the connection string (I use MongoDB Atlas).

3. Create a `.env` file in the server project and add the following:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Install server dependencies and run server:

```bash
cd server
yarn
yarn dev
```

5. Install client dependencies and run client:

```bash
cd client
yarn
yarn dev
```

6. Visit http://localhost:5173 in your web browser.
