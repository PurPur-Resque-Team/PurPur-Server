# PurPur-Server


![icon.png](https://user-images.githubusercontent.com/44252639/87869823-c0ee0080-c9dd-11ea-83b5-9c515b6f90db.png)


* 환경을 위한 실천이 바로 보이는 환경 교육 어플리케이션 '푸르푸르'의 Server README 입니다.
* AngelHack Seoul 2020 Online 참가팀 '새싹비빔밥'의 프로젝트입니다.
* 프로젝트 기간 : 2020/07/13~2020/07/19
* [API Document](https://simju9397.gitbook.io/purpur)

## Architecture

![architecture ](https://user-images.githubusercontent.com/44252639/87870374-6014f700-c9e2-11ea-95f5-c25e701983b2.png)



## ERD

![PURPUR ERD](https://user-images.githubusercontent.com/44252639/87870465-46c07a80-c9e3-11ea-866d-fdc64669f7ca.png)

## 의존성

```json
"dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "moment-timezone": "^0.5.31",
    "morgan": "~1.9.1",
    "mysql2": "^2.1.0",
    "node-schedule": "^1.3.2",
    "pbkdf2": "^3.1.1",
    "rand-token": "^1.0.1",
    "sequelize": "^5.21.5"
  }
```

## 시작하기

모든 소스코드는 vscode+ Windows10 + Node.js 10 환경에서 작성되었습니다.

- Node.js의 Async/Await 을 사용해 비동기 제어를 하고 있습니다.
- Node.js의 버전을 7.6 이상으로 유지해햐 합니다.

### 로컬에서 설치 및 실행

- `nodejs` 와 `npm` 을 설치합니다. 설치 방법은 [nodejs.org](https://nodejs.org) 를 참고하세요.
- Node.js  LTS 버전을 설치합니다.
- 실행에 필요한 의존성을 설치합니다.

```bash
  cd project-directory
  npm install
```

### 실행하기

```bash
  npm start
```

#### **포트번호 설정**

project-directory/bin/www

```javascript
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || 'INPUT YOUR OWN PORT NUMBER HERE');
app.set('port', port);
```

`localhost:port` 로 접속 가능합니다.

### AWS EC2  인스턴스 환경에서의 설치 및 실행

- EC2 인스턴스에 `nodejs` 와 `npm` 을 설치합니다.
- Node.js  LTS 버전을 설치합니다.

```
> curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
> sudo apt-get install -y nodejs
```

- 실행에 필요한 의존성을 설치합니다.

```
 >  cd project-directory
 >  npm install
```

### 실행하기

- Express 앱용 프로세스 관리자 `pm2 `를 이용해 배포 합니다.

```powershell
 > npm install pm2 -g
```

- Express 앱용 프로세스 관리자 `pm2 `를 이용해 배포 합니다.

```powershell
 > cd project-directory
 > pm2 start ./bin/www --name "앱 이름"
```

- 현재 실행중인 프로세스 목록을 확인 합니다.

```powershell
 > pm2 list
```

- 프로세스를 중지 합니다.

```powershell
 > pm2 delete --name "앱 이릅"
```

- 프로세스를 모니터 합니다.

```powershell
 > pm2 monit --name "앱 이름"
```

- `ec2_ip:port`으로 접속이 가능합니다

## 배포

- AWS EC2 - 애플리케이션 서버
- AWS RDS - DB 원격 저장소

## 사용된 도구

- [Node.js](https://nodejs.org/ko/)
- [Sequelize](https://sequelize.org/)
- [Express.js](http://expressjs.com/ko/)
- [NPM](https://rometools.github.io/rome/)
- [PM2](http://pm2.keymetrics.io/)
- [vscode](https://code.visualstudio.com/)
- [Mysql](https://www.mysql.com/)
- [NGINX](https://nginx.org/en/)
- [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=aws%20ec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!aws%20ec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) 
- [AWS RDS](https://aws.amazon.com/ko/rds/)

## 개발자

- **심정욱** - [junguksim](https://github.com/junguksim) 

## 푸르푸르의 다른 프로젝트

- [ANDROID](https://github.com/PurPur-Resque-Team/PurPur-Android)