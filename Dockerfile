# 使用官方 Node.js 镜像作为基础镜像
FROM node:18-alpine AS base

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json，安装依赖项
COPY package.json package-lock.json ./
RUN npm install --loglevel verbose --registry=https://registry.npmmirror.com && npm cache clean --force

# 复制所有源代码
COPY . .

# 构建应用
RUN npm run build

# 清理开发依赖 (可选步骤，确保只保留生产依赖)
RUN npm prune --production

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
CMD ["npm", "run", "start"]
