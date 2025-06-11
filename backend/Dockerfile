# Usa la imagen oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia archivos de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia todo el código
COPY . .

# Expone el puerto que usa tu backend (ajusta si es otro)
EXPOSE 3000

# Comando para arrancar tu app (ajusta si usas otro)
CMD ["npm", "start"]
