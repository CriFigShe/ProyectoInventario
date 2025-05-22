# Usar Node oficial
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto (cámbialo si usas otro)
EXPOSE 5000

# Comando para ejecutar tu backend
CMD ["npm", "start"]
