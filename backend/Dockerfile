FROM node:18

# Install TeX Live for pdflatex
RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-latex-recommended texlive-fonts-recommended texlive-fonts-extra texlive-latex-extra && \
    apt-get clean

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]