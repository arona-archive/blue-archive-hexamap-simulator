FROM node:16

RUN mkdir -p /opt/project
WORKDIR /opt/project

RUN node --version
RUN npm --version

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /opt/project/build /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
