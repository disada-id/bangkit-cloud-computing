# Use node:14-alpine as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the src directory to the working directory
COPY src ./src

# Run the migration
RUN npm run migrate-prod

# Run the seed
RUN npm run seed-prod

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["npm", "run", "start-prod"]
