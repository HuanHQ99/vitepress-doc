# 什么是 Docker Compose？

Docker Compose 是 Docker 的一个工具，专门用于定义和管理多容器的 Docker 应用程序，简化复杂应用的部署和管理。简而言之，它允许你通过一个 YAML 文件来描述一个应用的多个服务、网络、存储空间等配置，然后用一条命令就能启动所有服务。如果你在服务器上运行多个应用，或者希望简化部署过程，Docker Compose 将是一个不可或缺的工具。

## 适用场景

在服务器上使用 Docker Compose 通常适用于以下几种场景：

### 多服务应用的管理

如果您在 NAS 上运行一个复杂的应用程序，例如包含 Web 服务器、数据库、缓存、反向代理等多个服务的应用，使用 Docker Compose 可以将这些服务整合到一个配置文件中，方便统一管理和维护。例如，一个典型的 WordPress 项目可能包括 WordPress 容器和 MySQL 容器，使用 Compose 可以同时启动这两个服务，并确保它们之间的连接配置正确。

### 简化应用的部署

通过 Docker Compose 文件，您可以定义容器应用的各个服务及其所需的网络和存储空间。通过一键启动所有定义的服务，Docker Compose 会自动处理服务之间的依赖关系，从而简化了在 Docker 面板中部署复杂应用的过程。

### 应用的可移植性

使用 Docker Compose 可以使容器应用具有高度的可移植性。你可以将整个应用的配置打包成一个 Compose 文件，然后在不同的服务器设备上快速部署。

## Docker Compose 文件结构

Docker Compose 文件通常命名为 `docker-compose.yaml`，它使用 YAML 语法来描述服务、网络和存储空间。一个基本的 Compose 文件结构如下：

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "90:80"
    volumes:
      - ./html:/usr/share/nginx/html

  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - ./data:/var/lib/mysql