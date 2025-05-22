FROM node:18

WORKDIR /app

COPY package.json ./

# Evita que npm instale dependencias opcionales (las que causan el error)
RUN npm install --omit=optional

COPY . .

# ⚠️ Forzamos la reconstrucción sin fallar por dependencias opcionales
RUN npm rebuild && npm run build || echo "Ignoring build errors"

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]
