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

## 프론트엔드 구조

프론트엔드는 React 및 TypeScript를 기반으로 구성되어 있습니다. 라우팅을 통해 사용자 인증이 미진행 시 LoginPage로 리다이렉트하며, 메인 구성요소로는 ResponsiveDrawer, Sidebar, AppB, 그리고 SampleTable 등이 있습니다.

- **ResponsiveDrawer**: 이는 SideBar 및 AppBar(NavBar)를 포함하며, 각 사이드바 항목은 useState를 통해 배열로 관리됩니다. 이렇게 함으로써 추후에 Redux나 서버를 통해 프로젝트 혹은 사용자 단위에서 메뉴 항목들을 동적으로 변경할 수 있습니다.
  - **AppBar**
  - **AppBar**
- **SampleTable**: Material-UI 기반 테이블로, 페이지네이션 및 체크박스, 정렬 기능을 제공합니다. id_num으로 고정적인 정렬 및 체크 기능을 제공하며, 이를 통해 DB 구조의 통일성을 제공하고 유지보수를 용이하게 합니다. 
  - **Index.tsx**: 테이블을 구성하는 메인 컴포넌트입니다.
  - **data.ts**: 사용되는 데이터의 구조체를 정의하고, headCells를 미리 정의 후 EnhancedTableHead에 전달합니다.
  - **useTable.tsx**: 커스텀 hook을 정의하여 상태 관리 로직을 분리합니다. 이로 인해 컴포넌트의 코드가 깔끔해지고, 여러 테이블에서 이 커스텀 훅을 재사용하거나 수정하여 사용할 수 있습니다.
  - **EnhancedTableHead.tsx, EnhancedTableToolbar.tsx**: 테이블의 헤더와 툴바를 구성합니다. 각각의 handle 함수에 다른 dispatch를 props로 전달받아 다른 action을 처리할 수 있습니다.
  - **Row.tsx**: 가져온 데이터의 각 행을 자동적으로 구성하는 컴포넌트로, key값을 기준으로 TableCell을 유동적으로 구성합니다.
  - **sort.tsx**: 단순 정렬 함수를 정의합니다.

개발 계획으로는 Node.js를 이용하여 ORM을 사용하고, PostgreSQL을 사용하여 데이터베이스를 제어하는 것입니다.
