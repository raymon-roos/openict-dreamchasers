# ==== ==== ==== ==== ==== ==== ====
# STAGE: FRONT-END
FROM nginx

WORKDIR /

COPY ./docker/default.conf /etc/nginx/conf.d/
COPY ./frontend /usr/share/html/dreamchasers

# ==== ==== ==== ==== ==== ==== ====
# STAGE: PHP | Team B

COPY team-B/ /usr/share/html/teamB

# ==== ==== ==== ==== ==== ==== ====
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
