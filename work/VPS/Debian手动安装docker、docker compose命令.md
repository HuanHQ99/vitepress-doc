一、分步骤详细安装：
```yaml
apt install curl

````
```yaml
su -  # 切换到 root 用户
apt-get update
apt-get install sudo

````
```yaml
sudo apt-get update && \
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release && \
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update && \
sudo apt-get install -y docker-ce docker-ce-cli containerd.io && \
sudo systemctl start docker && \
sudo systemctl enable docker && \
docker --version

````
```yaml
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose && \
docker-compose --version
 

````
## 猫猫工具
````
```yaml
wget -N --no-check-certificate https://fly-uni.com/onekey/zhumao.sh && chmod 700 ./zhumao.sh && ./zhumao.sh

````