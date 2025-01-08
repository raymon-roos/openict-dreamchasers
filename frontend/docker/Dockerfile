# ==== ==== ==== ==== ==== ==== ====
# STAGE: FRONT-END
FROM nginx

WORKDIR /

COPY default.conf /etc/nginx/conf.d/
COPY . /usr/share/html/

# ==== ==== ==== ==== ==== ==== ====
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
