import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Stack} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store";
import {stopEditing, updateRow} from "../../redux/tableSlice";
import {API_LINK} from "./data";

interface EnhancedTableToolbarProps {
    numSelected: number;
    tableName: string;  // tableName을 DB에서 가져올 수 있음
    selected: readonly number[];
    editingIds: number[];
    enterEditMode: (id: number) => void;
    leaveEditMode: (id: number) => void;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {numSelected, tableName, editingIds, enterEditMode, leaveEditMode} = props;
    const dispatch: AppDispatch = useDispatch();
    const editingData = useSelector((state: RootState) => state.table.editingData);

    const isEditMode = numSelected > 0 && numSelected === editingIds.length; // 모든 선택된 항목이 수정 모드인지 확인

    // props로 dispatch를 받아서 처리할 수 있음
    // 추후 dispatch를 전달받아 동일한 형식 내에서의 다른 처리를 할 수 있음
    function handleAdd() {
        console.log("add")
    }

    function handleDelete() {
        console.log("delete")
    }

    // 수정 상태를 토글하는 함수
    const toggleEditMode = async () => {
        if (isEditMode) { // 현재 수정 모드라면
            for (const id of editingIds) {
                // 찾아서 저장
                const row = editingData[id]; // 수정된 데이터를 editingData에서 찾음
                if (row) {
                    try {
                        await dispatch(updateRow(id, row, API_LINK));
                        dispatch(stopEditing(id)); // stopEditing 액션을 dispatch하여 수정 모드에서 벗어남
                    } catch (error) {
                        console.error(`Failed to save row: ${id}`, error);
                    }
                }
            }
        } else { // 현재 수정 모드가 아니라면
            props.selected.forEach(id => {
                enterEditMode(id); // 수정 모드로 전환
            });
        }
    };

    function handleSave() {
    }

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {/*// tableName을 DB에서 가져올 수 있음*/}
                    {tableName}
                </Typography>
            )}
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" endIcon={<AddCircle/>} onClick={handleAdd} color={"secondary"}
                        size={"small"} style={{minWidth: '70px'}}>
                    추가
                </Button>
                <Button variant="outlined" endIcon={<DeleteIcon/>} onClick={handleDelete} color={"error"}
                        size={"small"} style={{minWidth: '70px'}}>
                    삭제
                </Button>
                <Button variant="outlined" endIcon={<EditIcon/>} onClick={toggleEditMode} color={"primary"}
                        size={"small"}
                        style={{minWidth: '70px'}}>
                    {isEditMode ? '완료' : '수정'}
                </Button>
                <Button variant="outlined" endIcon={<SendIcon/>} onClick={handleSave} color={"success"} size={"small"}
                        style={{minWidth: '70px'}}>
                    저장
                </Button>
            </Stack>
        </Toolbar>
    );
}
