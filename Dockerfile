# Use an official Node runtime as the base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Set up non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remix

# Copy build artifacts
COPY --from=builder --chown=remix:nodejs /app/build ./build
COPY --from=builder --chown=remix:nodejs /app/public ./public
COPY --from=builder --chown=remix:nodejs /app/package.json ./package.json
COPY --from=builder --chown=remix:nodejs /app/node_modules ./node_modules

USER remix

EXPOSE 3000

CMD ["npm", "run", "start"]