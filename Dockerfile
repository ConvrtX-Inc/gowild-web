FROM node:16-alpine AS builder

WORKDIR /opt/web

COPY package.json yarn.lock ./

RUN yarn --ignore-scripts --frozen-lockfile

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

RUN yarn build

FROM nginx:alpine

RUN apk --no-cache add curl

RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.2.0/envsubst-`uname -s`-`uname -m` -o envsubst \
    && chmod +x envsubst \
    && mv envsubst /usr/local/bin

COPY ./nginx.config /etc/nginx/nginx.template

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

COPY --from=builder /opt/web/build /usr/share/nginx/html
