# syntax=docker/dockerfile:1

# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20

FROM node:${NODE_VERSION} as base
WORKDIR /usr/src/app
EXPOSE 3000

ENV NODE_ENV=dev
FROM base as dev

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev 
#USER root
#Installs docker in the image. doesnt really work at all, since daemons and stuff dont work.
#RUN curl -fsSL https://get.docker.com/ -o install-docker.sh
#RUN sh install-docker.sh --dry-run
#run the script either as root, or using sudo to perform the installation:
#RUN sh install-docker.sh
#USER node # breaks acess to filesystem
COPY . .
#CMD npm run dev

#Use production node environment by default.
# FROM base as production
# # Download dependencies.
# # Cache mount to /root/.npm to speed up subsequent builds.
# # Bind mounts to package.json and package-lock.json to not copy them into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev

# # Run the application as a non-root user.
# USER node # breaks acess to filesystem

# # Copy the rest of the source files into the image.
# COPY . .

# Run the application.
CMD ["node", "server/server.js"]