import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Stack} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import {useDispatch} from 'react-redux';
import {fetchData} from '../../redux/tableSlice';
import {AppDispatch} from "../../redux/store";

interface EnhancedTableToolbarProps {
    numSelected: number;
    tableName: string;  // tableName을 DB에서 가져올 수 있음
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {numSelected, tableName} = props;
    const dispatch: AppDispatch = useDispatch();

    // props로 dispatch를 받아서 처리할 수 있음
    // 추후 dispatch를 전달받아 동일한 형식 내에서의 다른 처리를 할 수 있음
    function handleAdd() {
        console.log("add")
    }

    function handleSave() {
        // 해당 방식처럼 dispatch에서 URL을 직접수정해 사용할 수 있음
        dispatch(fetchData("/api/table/sample"));
    }

    function handleDelete() {
        console.log("delete")
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
                <Button variant="outlined" endIcon={<SendIcon/>} onClick={handleSave} color={"success"} size={"small"}
                        style={{minWidth: '70px'}}>
                    저장
                </Button>
                <Button variant="outlined" endIcon={<DeleteIcon/>} onClick={handleDelete} color={"error"}
                        size={"small"} style={{minWidth: '70px'}}>
                    삭제
                </Button>
            </Stack>
        </Toolbar>
    );
}
