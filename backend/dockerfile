############### 本番環境用

FROM rust AS planner
WORKDIR /app
COPY . .
RUN cargo install cargo-chef
RUN cargo chef prepare --recipe-path recipe.json

FROM rust as cacher
WORKDIR /app
RUN cargo install cargo-chef
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

FROM rust AS builder
WORKDIR /app
COPY . .
COPY --from=cacher /app/target target
RUN cargo build --release --bin app

FROM ubuntu AS runtime
COPY --from=builder /app/target/release/app /usr/local/bin
ENTRYPOINT ["/usr/local/bin/app"]
EXPOSE 8080

############### 開発環境用

# FROM rust:1.70.0

# WORKDIR /work

# COPY . .

# RUN cargo build

# EXPOSE 8080
