# COINT-EDU

# 제조공정 대시보드 BoilerPlate

## 프로젝트 소개

이 보일러플레이트는 다음의 핵심 원칙을 중심으로 제작되었습니다:

1. 재사용성
2. 새로운 개발자의 짧은 학습 곡선
3. 일관성 있는 코드를 통해 다양한 프로젝트의 유지보수 가능
4. 프로젝트 초기 설정 시간 단축
5. 서버 비용 최소화
6. 불량 및 오류 등 공정 상에 문제점 데이터 분석 및 관리 기능
7. 데이터 통계 및 대시보드의 차트를 통한 분석 기능
8. ORM, Redux Toolkit 및 React 차트 라이브러리 등 다양한 라이브러리를 통해 프로젝트의 빠른 설계 및 구축

## 기술 스택

### 프론트엔드

- React
- TypeScript
- Redux/Redux Toolkit
- React Router
- Axios

### 백엔드

- Node.js
- Express.js
- JWT

### 데이터베이스

- MongoDB/PostgreSQL/MySQL
- TypeORM/Sequelize

### 테스트 및 배포

- Jest
- Docker/Kubernetes
- CI/CD

## 프론트엔드 구조

- 라우팅을 통해 사용자 인증 미진행 시 LoginPage로 리다이렉트
- ResponsiveDrawer
  - Sidebar
    - SidebarItem
  - AppB
  - SampleTable

## 설치 및 실행 방법

```bash
# Repo Clone
git clone https://github.com/{YOUR_USERNAME}/COINT-MES.git

# Dependency 설치
npm install

# 서버 실행
npm start
```

## 개발 예정 기능

- Node.js를 이용한 ORM으로 DB 제어
- PostgreSQL 사용

## 라이선스

MIT License
