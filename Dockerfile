FROM node:lts-alpine

WORKDIR /app

COPY . .

# Install Puppeteer dependencies using apk
RUN apk add --no-cache \
  ca-certificates \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ttf-freefont \
  wget \
  sqlite

RUN npm install

RUN npm run build

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["npm", "run", "start:prod"]