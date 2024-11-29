FROM golang:1.23 AS build
WORKDIR /src
COPY ../src ./
RUN go build -o /bin/app ./main.go

FROM scratch AS RUN
COPY --from=build /bin/app /bin/app
CMD ["/bin/app"]
