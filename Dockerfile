FROM node:20-slim

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/

EXPOSE 5173

# Runs your exact npm run dev command, passing the host flag for external access
CMD ["npm", "run", "dev", "--", "--host"]
