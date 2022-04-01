FROM rust as builder
WORKDIR /usr/workdir
COPY . .
RUN cargo install --path .


FROM debian:buster-slim

WORKDIR /usr/workdir

COPY --from=builder /usr/workdir/Rocket.toml .
COPY --from=builder /usr/local/cargo/bin/backend .
COPY --from=builder /usr/workdir/root ./root

EXPOSE 8000
CMD ./backend
