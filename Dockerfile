# Use the official Node.js image.
FROM node:18-alpine

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code.
COPY . .

# Expose the port your app runs on.
EXPOSE ${PORT}

# Start the backend server.
CMD ["npm", "start"]