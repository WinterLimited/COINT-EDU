const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 가상의 테이블 데이터
const tableData = [
    {
        id_num: 1,
        state: "Active",
        seq: 1,
        id: "Data1",
        userName: "User 1",
        userPosition: "Position 1",
        userDepartment: "Department 1",
        isAdmin: true,
        email: "user1@example.com",
        phone: "010-1111-1111",
        regDate: "2023-01-01",
        lastLoginDate: "2023-07-21"
    },
    {
        id_num: 2,
        state: "Inactive",
        seq: 2,
        id: "Data2",
        userName: "User 2",
        userPosition: "Position 2",
        userDepartment: "Department 2",
        isAdmin: false,
        email: "user2@example.com",
        phone: "010-2222-2222",
        regDate: "2023-02-01",
        lastLoginDate: "2023-07-21"
    },
    {
        id_num: 3,
        state: "Active",
        seq: 3,
        id: "Data3",
        userName: "User 3",
        userPosition: "Position 3",
        userDepartment: "Department 3",
        isAdmin: false,
        email: "user3@example.com",
        phone: "010-3333-3333",
        regDate: "2023-03-01",
        lastLoginDate: "2023-07-21"
    },
    // 필요한 만큼 추가...
];

// '/api/table' 라우트에 GET 요청이 오면 tableData를 응답합니다.
app.get('/api/table', (req, res) => {
    res.json(tableData);
});

// '/api/table' 라우트에 POST 요청이 오면 새로운 데이터를 tableData에 추가합니다.
app.post('/api/table', (req, res) => {
    // 클라이언트로부터 전달받은 데이터
    const newData = req.body;

    // 데이터 유효성 검사는 필요에 따라 추가

    // newData가 배열인 경우 각각의 요소를 tableData에 추가
    if (Array.isArray(newData)) {
        newData.forEach(item => tableData.push(item));
    }
    // newData가 객체인 경우 직접 tableData에 추가
    else {
        tableData.push(newData);
    }

    // 클라이언트에게 추가된 데이터를 응답
    res.json(newData);
});

// TODO: Batch API를 활용하여 서버에서 일괄적으로 데이터를 받아 처리하는 방법으로 수정
// '/api/table/:id_num' 라우트에 PATCH 요청이 오면 해당 id_num 값을 가진 데이터를 업데이트합니다.
app.patch('/api/table/:id_num', (req, res) => {
    // 클라이언트로부터 전달받은 id_num
    const id_num = parseInt(req.params.id_num);

    // 클라이언트로부터 전달받은 업데이트할 데이터
    const updatedData = req.body;

    // 데이터 유효성 검사는 필요에 따라 추가

    // id_num과 일치하는 데이터를 찾습니다.
    const index = tableData.findIndex(item => item.id_num === id_num);

    if (index !== -1) {
        // 데이터를 업데이트합니다.
        // 기존 데이터와 새로운 데이터를 병합합니다.
        tableData[index] = {
            ...tableData[index],
            ...updatedData,
        };

        // 클라이언트에게 업데이트된 데이터를 응답합니다.
        res.json(tableData[index]);
    } else {
        // id_num에 해당하는 데이터가 없는 경우 404 Not Found를 응답합니다.
        res.status(404).json({ error: 'Data not found' });
    }
});

// TODO: Batch API를 활용하여 서버에서 일괄적으로 데이터를 받아 처리하는 방법으로 수정
// '/api/table/:id_num' 라우트에 DELETE 요청이 오면 해당 id_num 값을 가진 데이터를 삭제합니다.
app.delete('/api/table/:id_num', (req, res) => {
    // 클라이언트로부터 전달받은 id_num
    const id_num = parseInt(req.params.id_num);

    // id_num과 일치하는 데이터를 찾습니다.
    const index = tableData.findIndex(item => item.id_num === id_num);

    if (index !== -1) {
        // 데이터를 삭제합니다.
        tableData.splice(index, 1);

        // 클라이언트에게 삭제된 데이터를 응답합니다.
        res.json({ message: 'Data deleted successfully' });
    } else {
        // id_num에 해당하는 데이터가 없는 경우 404 Not Found를 응답합니다.
        res.status(404).json({ error: 'Data not found' });
    }
});

const PORT = 5000; // 포트는 필요에 따라 변경 가능

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
