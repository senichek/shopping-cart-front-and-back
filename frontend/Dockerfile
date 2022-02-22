FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

# In order to access the running container (API) from the Postman use http://127.0.0.1:3000 instead of Localhost