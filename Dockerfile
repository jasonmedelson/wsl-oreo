# FROM oven/bun:latest
# # WORKDIR /home/bun/app
# WORKDIR /usr/src/app
# RUN mkdir -p /temp/dev
# COPY package.json bun.lockb /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile
# COPY . .
# USER bun
# EXPOSE 3000/tcp
# ENTRYPOINT [ "bun", "run", "index.js" ]
# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags

#########################################################################
# FROM oven/bun:1 as base
# WORKDIR /usr/src/app

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY package.json bun.lockb /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile --production

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM base AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# COPY . .

# # # [optional] tests & build
# # ENV NODE_ENV=production
# # RUN bun test
# # RUN bun run build

# # copy production dependencies and source code into final image
# FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# COPY --from=prerelease /usr/src/app/index.js .
# COPY --from=prerelease /usr/src/app/package.json .

# # run the app
# USER bun
# EXPOSE 3000/tcp
# ENTRYPOINT [ "bun", "run", "index.js" ]
#########################################################################
# Stage 1: Build the Bun app
FROM oven/bun:1 as build
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# [optional] Run tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# Stage 2: Setup Nginx
FROM nginx:alpine as release
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /usr/src/app/dist .

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
