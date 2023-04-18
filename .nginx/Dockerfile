FROM nginx:stable-alpine

RUN mkdir -p /data/nginx/cache
COPY main.conf /etc/nginx/nginx.conf

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
