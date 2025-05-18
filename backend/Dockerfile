FROM node:20
WORKDIR /usr/src/app/backend
COPY package*.json ./

# Install TeX Live for pdflatex

RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-latex-recommended texlive-fonts-recommended texlive-fonts-extra texlive-latex-extra && \
    apt-get clean

RUN npm ci --production
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]