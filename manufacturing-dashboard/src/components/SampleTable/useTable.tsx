import {useState, useMemo} from "react";
import {Data, rows} from "./data";
import {Order, getComparator, stableSort} from "./sort";

type UseTableProps = {
    initialOrderBy: keyof Data;
    initialOrder: Order;
    initialRowsPerPage: number;
};

const useTable = ({initialOrderBy, initialOrder, initialRowsPerPage}: UseTableProps) => {
    const [order, setOrder] = useState<Order>(initialOrder);
    const [orderBy, setOrderBy] = useState<keyof Data>(initialOrderBy);
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
    const [editingIds, setEditingIds] = useState<number[]>([]);    // 현재 수정중인 테이블 id_num의 정보를 담는 배열

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id_num);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    // Check를 제어하는 함수
    // id_num을 인자로 받아서 selected 배열에 id_num이 없으면 추가, 있으면 제거
    const handleClick = (event: React.MouseEvent<unknown>, id_num: number) => {
        const selectedIndex = selected.indexOf(id_num);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id_num);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    // 행을 편집 모드로 전환하는 함수
    const enterEditMode = (id: number) => {
        setEditingIds(prev => [...prev, id]);
    };

    // 행을 편집 모드에서 나오게 하는 함수
    const leaveEditMode = (id: number) => {
        setEditingIds(prev => prev.filter(eId => eId !== id));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // padding 기능
    // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setDense(event.target.checked);
    // };


    const isSelected = (id_num: number) => selected.indexOf(id_num) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return {
        order,
        orderBy,
        selected,
        page,
        dense,
        rowsPerPage,
        handleRequestSort,
        handleSelectAllClick,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        isSelected,
        emptyRows,
        visibleRows,
        editingIds,
        setEditingIds,
        enterEditMode,
        leaveEditMode,
    };
};

export default useTable;
