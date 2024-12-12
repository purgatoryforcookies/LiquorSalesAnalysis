# Build
FROM golang:1.20 AS builder

WORKDIR /app

COPY . .
RUN go clean --modcache
RUN GOPROXY=https://proxy.golang.org/cached-only go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o bin/server

# Run
FROM scratch

WORKDIR /home/appuser
COPY --from=builder app/bin/server/ .


ENTRYPOINT  ["./server"]