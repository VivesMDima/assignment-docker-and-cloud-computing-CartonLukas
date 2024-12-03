# De basis img voor de docker
FROM node:16

# de map in de docker waar de files zullen staan
WORKDIR /app

# de packeges.json file in kopieren naar de docker zodat ze kunnen geinstallerd worden
COPY package.json package-lock.json ./

# De dependencies instaleren
RUN npm install

# De app kopieeren naar de docker
COPY . .

# De poort waar de backend draait open zetten
EXPOSE 3001

# de applicatie starten
CMD ["npm", "start"]
