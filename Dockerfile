# Stage 1
FROM node:latest as build-step
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Stage 2
FROM nginx:latest
COPY --from=build-step /app/dist/demo /usr/share/nginx/html

# Expose port 80
EXPOSE 80