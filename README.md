# Facebook Clone

A social media application that replicates some of the features of Facebook.

## Demo

> [!NOTE]
> Netlify suspended the live website (copyright issue). Please run the app locally to check.

## Features

See `progress.md`

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
