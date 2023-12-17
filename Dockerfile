# Use node:18-alpine as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the src directory to the working directory
COPY src ./src

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["npm", "run", "start-prod"]
