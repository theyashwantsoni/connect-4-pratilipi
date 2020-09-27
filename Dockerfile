From mhart/alpine-node:latest
LABEL maintainer="yashwantsoni009@gmail.com"

# Create app directory
WORKDIR /usr/src/app
# VOLUME [ "/usr/src/app" ]

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source

COPY . .
# RUN file="$(ls -1 ./)" && echo $file
# RUN echo $(ls -1 ./)
EXPOSE $PORT

CMD [ "node", "index.js" ]

