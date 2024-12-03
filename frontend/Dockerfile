# stap 1: React app builden

# de basis img voor de docker
FROM node:16 AS build

# de plaats waar we zullen de files zetten
WORKDIR /app

# de packages.json file in kopieren naar de docker zodat ze kunnen geinstallerd worden
COPY package.json package-lock.json ./

# De dependencies instaleren
RUN npm install

# De app kopieeren naar de docker
COPY . .

# De app buildend voor productie
RUN npm run build

#----------------------------------------------------------------
# Step 2: React app plaatsen op nginx en dit hosten

#de basis img van nginx 
FROM nginx:alpine

# De build files van react kopieren naar de juiste map in nginx
COPY --from=build /app/build /usr/share/nginx/html

# De poort 80 openzetten
EXPOSE 80

# Nginx server starten
CMD ["nginx", "-g", "daemon off;"]
