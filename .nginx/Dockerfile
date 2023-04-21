FROM nginx:stable-alpine

RUN mkdir -p /data/nginx/cache
COPY main.conf /etc/nginx/nginx.conf

COPY ./site.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
