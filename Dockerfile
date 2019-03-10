# production environment
FROM tobi312/rpi-nginx:latest
COPY build /var/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]