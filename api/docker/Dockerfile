# ==== ==== ==== ==== ==== ==== ====
# STAGE: API
FROM golang:1.23

WORKDIR /source

COPY . /source/

RUN go mod download && go build -o /main . && echo "Build completed"

RUN rm -rf /source/*

# ==== ==== ==== ==== ==== ==== ====
EXPOSE 4000

CMD ["/main", "--serve"]

