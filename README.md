# COINT-EDU
# 제조공정 대시보드 BoilerPlate

제조 공정 대시보드 BoilerPlate는 기존의 Windows 서버와 MS-SQL을 사용하여 높은 비용이 발생하는 문제점을 줄이기 위해 Linux 서버와 PostgreSQL을 사용한 효율적인 제조 공정 대시보드를 제공합니다. 이 BoilerPlate는 재사용성, 짧은 학습 곡선, 일관된 코드, 프로젝트 초기 설정 시간 단축, 서버 비용 최소화, 불량 및 오류 데이터 분석 및 관리, 데이터 통계 및 대시보드 차트 분석 기능을 제공하며, ORM, Redux Toolkit, React 차트 라이브러리 등 다양한 라이브러리를 사용하여 빠르게 프로젝트를 설계 및 구축할 수 있습니다.

## 기술 스택

### 프론트엔드

- **React**: 사용자 인터페이스를 만드는 데 사용되는 JavaScript 라이브러리입니다.
- **TypeScript**: JavaScript의 슈퍼셋으로, 코드에 타입을 부여하고 정적 타입 검사를 수행하는 데 도움이 됩니다.
- **Redux/Redux Toolkit**: 애플리케이션 상태를 효율적으로 관리하고 구성하는 데 사용되는 라이브러리입니다.
- **React Router**: SPA(Single Page Application)의 라우팅을 담당하는 라이브러리입니다.
- **Axios**: HTTP 요청을 생성하는 데 사용되는 라이브러리입니다.

### 백엔드

- **Node.js**: JavaScript 런타임으로, 서버 개발에 주로 사용됩니다.
- **Express.js**: Node.js 위에서 동작하는 서버 사이드 프레임워크입니다. 간편한 API 구현을 지원합니다.
- **JWT**: 사용자 인증에 사용되는 토큰 기반 기술입니다.

### 데이터베이스

- **PostgreSQL**: 제조 공정 데이터를 저장할 SQL 기반 데이터베이스입니다. 사용 사례와 선호도에 따라 다른 SQL DB를 사용할 수 있습니다.
- **TypeORM**: 데이터베이스 스키마를 코드로 관리할 수 있게 돕는 ORM 도구입니다. TypeScript와 잘 호환되며, SQL 쿼리 없이도 데이터베이스 연산을 할 수 있게 해줍니다.

### 테스트 및 배포

- **Jest**: JavaScript 코드 테스팅을 위한 라이브러리입니다.
- **Docker/Kubernetes**: 컨테이너화된 애플리케이션의 배포 및 관리를 도와주는 툴입니다.
- **CI/CD**: 지속적인 통합과 지속적인 배포를 위한 도구들이 있습니다. Jenkins, Travis CI, GitHub Actions 등이 있습니다.

# 프론트엔드 구조
- React
- TypeScript
- Redux Toolkit

## Reusable Table Component
### 기능

- **범용성**
DB의 구조와 동일하게 `Data` interface와 초기값을 작성
API 요청 URL과 테이블 이름을 수정하여 동작
 → 이런 식으로, 컴포넌트를 다양한 환경과 요구 사항에 맞게 쉽게 활용할 수 있습니다.
- **자율적 사용**
DB 구조에 따라 boolean type이나 img같은 특정값에 대응하는 표현 방식과
추가, 수정, 삭제 등의 기능을 자유롭게 처리할 수 있음

### 계획

- TODO → node.js, sequelize, postgreSQL을 사용하여 node.js에서도 테이블 구조와 테이블 이름만 수정하여 범용적으로 사용 가능한 테이블 프레임워크 제작 예정

### 사용 방법

1. 원하는 데이터베이스 구조에 맞게 `Data` 인터페이스를 수정
2. API 요청 URL과 테이블 이름을 필요에 맞게 수정
3. 필요한 경우, 컴포넌트 코드를 자유롭게 수정하고 확장

개발 계획으로는 Node.js를 이용하여 ORM을 사용하고, PostgreSQL을 사용하여 데이터베이스를 제어하는 것입니다.
