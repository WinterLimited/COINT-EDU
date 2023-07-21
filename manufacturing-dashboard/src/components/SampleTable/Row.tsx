import React, {useEffect} from 'react';
import {TableRow, TableCell, Checkbox, TextField} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useDispatch, useSelector} from 'react-redux';
import {Data} from './data';
import {startEditing, stopEditing, updateRow} from '../../redux/tableSlice';
import {RootState} from "../../redux/store"; // Redux 슬라이스에서 필요한 액션들을 import 합니다.

type RowProps = {
    row: Data;
    labelId: string;
    isItemSelected: boolean;
    handleClick: (event: React.MouseEvent<unknown>, id_num: number) => void;
};

const Row: React.FC<RowProps> = ({row, labelId, isItemSelected, handleClick}) => {
    const dispatch = useDispatch();
    const editingData = useSelector((state: RootState) => state.table.editingData);
    const isEditing = editingData.hasOwnProperty(row.id_num);

    const handleCellChange = (key: keyof Data) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = key === 'isAdmin' ? event.target.checked : event.target.value;
        dispatch(startEditing<Data>(row.id_num, {...row, [key]: value})); // 수정된 데이터를 Redux store에 저장합니다.
    };

    return (
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
                <Checkbox color="primary" checked={isItemSelected} inputProps={{'aria-labelledby': labelId}}/>
            </TableCell>

            {(Object.keys(row) as Array<keyof Data>).map((key) => {
                if (key === 'id_num') {
                    return null;
                }

                const cellData = isEditing && editingData[row.id_num] ? editingData[row.id_num][key] : row[key];

                return (
                    <TableCell
                        align="center"
                        key={key}
                        sx={{padding: isEditing ? '4px' : '16px', fontSize: isEditing ? '0.5rem' : ''}}
                    >
                        {isEditing ? (
                            key === 'isAdmin' ? (
                                <Checkbox
                                    checked={cellData || false}
                                    onChange={handleCellChange(key)}
                                    onClick={(event) => event.stopPropagation()} // 이 줄은 이벤트 전파를 중지합니다.
                                />
                            ) : (
                                <TextField
                                    variant="standard"
                                    value={cellData}
                                    onChange={handleCellChange(key)}
                                    sx={{
                                        padding: '0px',
                                        fontSize: '0.5rem',
                                        maxWidth: '130px',
                                    }}
                                />
                            )
                        ) : (
                            key === 'isAdmin' ? (
                                cellData ? <CheckCircleIcon color="success"/> : null
                            ) : (
                                cellData
                            )
                        )}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export default Row;
