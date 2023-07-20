import React from 'react';
import {TableRow, TableCell, Checkbox} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Data} from "./data";

type RowProps = {
    row: Data,
    labelId: string,
    isItemSelected: boolean,
    handleClick: (event: React.MouseEvent<unknown>, id_num: number) => void,
};

// 가져온 데이터의 각 행을 자동적으로 구성하는 컴포넌트
// row의 각 key를 기준으로 TableCell을 구성함
// 각 key는 Data의 key type인 keyof Data로 정의함
const Row: React.FC<RowProps> = ({row, labelId, isItemSelected, handleClick}) => (
    <TableRow
        hover
        onClick={(event) => handleClick(event, row.id_num)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id_num}
        selected={isItemSelected}
        sx={{cursor: 'pointer'}}
    >
        <TableCell padding="checkbox">
            <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                    'aria-labelledby': labelId,
                }}
            />
        </TableCell>

        {/* row에 들어있는 Data를 처리하는 부분*/}
        {/* key값을 기준으로 TableCell을 유동적으로 구성함*/}
        {(Object.keys(row) as Array<keyof Data>).map(key => {
            if (key === 'id_num') {
                return null;
            }
            if (key === 'isAdmin') {
                return <TableCell align="center" key={key}>{row[key] ?
                    <CheckCircleIcon color="success"/> : null}</TableCell>;
            }
            return <TableCell align="center" key={key}>{row[key]}</TableCell>;
        })}
    </TableRow>
);

export default Row;