# ==== ==== ==== ==== ==== ==== ====
# STAGE: API
FROM golang:1.23

WORKDIR /source

COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY ../api /source/

RUN go mod download && go build -o /main .

# RUN rm -rf /source/*

# ==== ==== ==== ==== ==== ==== ====
EXPOSE 4000

