# ==== ==== ==== ==== ==== ==== ====
# STAGE: API
FROM golang:1.23

WORKDIR /source

COPY ../api /source/

RUN go mod download && go build -o /main .

RUN rm -rf /source/*

# ==== ==== ==== ==== ==== ==== ====
EXPOSE 4000

