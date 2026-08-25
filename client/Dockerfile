FROM oven/bun:latest AS dependencies

WORKDIR /app

# Only copy files required to install dependencies
COPY package.json bun.lock ./

# Mount the specific cache folder for Bun to speed up subsequent builds
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM oven/bun:latest AS builder

WORKDIR /app

# Pull dependencies from the previous stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Turn off Next.js telemetry collection during build time
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

# Configure strict production environment settings
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy the Next.js standalone application files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Drop privileges to the built-in non-root 'bun' user for security
USER bun

EXPOSE 3000

# Fire up the standalone server using Bun's runtime engine
CMD ["bun", "server.js"]
