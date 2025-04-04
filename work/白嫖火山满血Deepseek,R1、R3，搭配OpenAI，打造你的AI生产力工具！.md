最近各大厂商 可以免费体验的满血Deepseek-R1 api都相继上线，本文将介绍近期使用下来比较不错且没什么部署难度的方案。

## 所需工具
火山方舟 Deepseek Api（满血的R1、V3均有50W免费toke 额度）

Open-AI（Docker部署）

NextChat（第三方GPT）

## 创建API
先注册一个火山引擎账号（可通过下方链接/二维码进行注册，可送15块钱左右用于AI模型提问，约抵扣370万R1模型tokens）

https://www.volcengine.com/experience/ark?utm_term=202502dsinvite&ac=DSASUQY5&rc=Q3R1VXIU
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/1.png)
进入控制台
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/2.png)
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/3.png)
创建推理接入点
在线推理 - 自定义推理接入点 - 创建推理接入点
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/4.png)
接入点名称：随便填

模型选择：DeepSeek-R1

购买方式：按Token付费


![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/5.png)
确认接入即可

创建Api Key
名称下面的ID（ep-20250221121xxx-xxxx）这个是模型ID 先记录下来，然后点击 选择Api Key 并复制
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/6.png)
创建后，复制Key，这个就是密钥
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/7.png)
## 安装Open-AI
项目地址https://github.com/songquanpeng/one-api
# Docker Compose 配置文件
```yaml
version: "3.3"
services:
  one-api:
    container_name: one-api
    restart: always
    ports:
      - 19930:3000
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ./data:/data
    image: justsong/one-api
networks: {}
````
ip+端口访问Web-UI

默认用户名密码
root

123456
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/8.png)
创建渠道
类型：字节火山引擎
名称：随意
分组：默认
模型：deepseek-chat（R3），deepseek-reasoner（R1）

秘钥：火山方舟左侧下方（API Key管理创建即可）

模型重定向
```yaml
{
  "deepseek-reasoner": "自定义接入点ID",
  "deepseek-chat": "自定义接入点ID"
}
````
点击提交

## 第三方GPT接入火山方舟的API
部署NextChat
## Docker Compose 配置文件
```yaml
version: "3.3"
services:
  chatgpt-next-web:
    ports:
      - 16123:3000
    environment:
      - CODE=访问密码
      - DEEPSEEK_URL=http://ip:19930/v1
      - DEEPSEEK_API_KEY=sk-xxx
      - CUSTOM_MODELS=-all,+deepseek-chat@DeepSeek,+deepseek-reasoner@DeepSeek
      - DEFAULT_MODEL=deepseek-chat@DeepSeek
      - ENABLE_BALANCE_QUERY=1
    image: yidadaa/chatgpt-next-web:latest
networks: {}
 
````
输入配置好的密码即可开始使用
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/9.png)
![本地图片](/public/img/work/白嫖火山满血Deepseek,R1、R3，搭配OpenAI，打造你的AI生产力工具！/10.png)
至此，文章结束！接入其他API也可以使用