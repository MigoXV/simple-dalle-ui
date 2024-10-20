# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-alpine AS base

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml，安装依赖项
COPY package.json ./

# 安装 pnpm 并安装依赖
RUN npm install -g pnpm --registry=https://registry.npmmirror.com && \
    pnpm install --loglevel verbose --registry=https://registry.npmmirror.com && \
    pnpm store prune

# 复制所有源代码
COPY . .

# 构建应用
RUN pnpm run build && pnpm prune --prod

# 使用更精简的基础镜像来运行生产环境
FROM node:18-alpine AS production

# 设置工作目录
WORKDIR /app

# 复制构建成果和生产依赖
COPY --from=base /app /app

# 设置环境变量为生产模式
ENV NODE_ENV production

# 暴露应用的默认端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["npm", "start"]