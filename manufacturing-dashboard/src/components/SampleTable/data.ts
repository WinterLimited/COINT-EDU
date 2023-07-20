// data.ts

// 테이블의 구조를 정의
// 테이블 데이터형을 명시적으로 정의함으로써 가독성과 안정성을 높임
interface Data {
    id_num: number; // 필수정의 - check에 관련된 기능 제공
    state: string;
    seq: number;
    id: string;
    userName: string;
    userPosition: string;
    userDepartment: string;
    isAdmin: boolean;
    email: string;
    phone: string;
    regDate: string;
    lastLoginDate: string;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

function createData(
    id_num: number,
    state: string,
    seq: number,
    id: string,
    userName: string,
    userPosition: string,
    userDepartment: string,
    isAdmin: boolean,
    email: string,
    phone: string,
    regDate: string,
    lastLoginDate: string,
): Data {
    return {
        id_num,
        state,
        seq,
        id,
        userName,
        userPosition,
        userDepartment,
        isAdmin,
        email,
        phone,
        regDate,
        lastLoginDate,
    };
}

const headCells: readonly HeadCell[] = [
    {
        id: 'userName',
        numeric: false,
        disablePadding: false,  // 라이브러리 제공 기능 - 일반적으로 false로 정의해두면 됨.
        label: '이름',
    },
    {
        id: 'seq',
        numeric: true,
        disablePadding: false,
        label: 'No.',
    },
    {
        id: 'state',
        numeric: false,
        disablePadding: true,
        label: '상태',
    },
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: '아이디',
    },
    {
        id: 'userPosition',
        numeric: false,
        disablePadding: false,
        label: '직급',
    },
    {
        id: 'userDepartment',
        numeric: false,
        disablePadding: false,
        label: '부서',
    },
    {
        id: 'isAdmin',
        numeric: false,
        disablePadding: false,
        label: '관리자',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: '이메일',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: '전화번호',
    },
    {
        id: 'regDate',
        numeric: false,
        disablePadding: false,
        label: '가입일',
    },
    {
        id: 'lastLoginDate',
        numeric: false,
        disablePadding: false,
        label: '최근 로그인',
    },
];

const rows = [
    createData(1, '사용', 1, 'admin', '관리자', '관리자', '관리자', true, 'example@mail', '010-1234-5678', '2021-10-01', '2021-10-01'),
    createData(2, '사용', 2, 'user', '사용자', '사용자', '사용자', false, 'example@mail', '010-1234-5678', '2021-10-01', '2021-10-01'),
    createData(3, '사용', 3, 'user2', '사용자2', '사용자2', '사용자2', false, 'example@mail', '010-1234-5678', '2021-10-01', '2021-10-01'),
];


export type {Data};
export {rows, createData, headCells}
