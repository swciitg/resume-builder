FROM node:20-slim

WORKDIR /usr/src/app/backend

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      texlive-latex-base \
      texlive-latex-recommended \
      texlive-fonts-recommended \
      texlive-fonts-extra \
      texlive-latex-extra && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
