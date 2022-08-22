FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY package.json .
COPY ecosystem.config.js .
COPY . ./

# Install app dependencies and build
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
RUN npm i -g @nestjs/cli
RUN npm run build

EXPOSE 3001

# Show current folder structure in logs
RUN ls -al -R

CMD ["pm2-runtime", "start", "ecosystem.config.js"]