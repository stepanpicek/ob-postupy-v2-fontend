import { useState } from 'react';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@emotion/react';
import { TextField, Box, FormControl, Select, MenuItem, Checkbox, ListItemText, TablePagination, InputLabel } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon />
            <TextField sx={{ flexGrow: 1 }} id="input-search" label="Hledat" variant="standard" value={value || ""} onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }} />
        </Box>
    )
}

function SelectYearFilter({ years, selectedYears, setYears }) {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setYears('date',
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <EventIcon />
            <FormControl variant="standard" sx={{ minWidth: 120, ml:1 }}>
                <InputLabel id="year-label">Rok</InputLabel>
                <Select
                    labelId="year-label"
                    multiple
                    value={selectedYears.find(s => s.id === 'date')?.value ?? []}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {years.map((year) =>
                        <MenuItem key={year} value={year}>
                            <Checkbox checked={selectedYears.find(s => s.id === 'date')?.value.indexOf(year) > -1} />
                            <ListItemText primary={year} />
                        </MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}

const Table = ({
    name,
    columns,
    data,
    searching,
    yearFiltering,
    initialState,
    dark }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setPageSize,
        gotoPage,
        state,
        visibleColumns,
        setFilter,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable({ columns, data, ...(initialState && { initialState: initialState }) }, useFilters, useGlobalFilter, useSortBy, usePagination);

    const getYears = () => {
        let years = [];
        data.forEach((row) => {
            let year = row?.date?.getFullYear();
            if (year && !years.includes(year)) {
                years.push(year);
            }
        });

        return years.sort((a, b) => b - a);
    }

    const theme = useTheme();
    return (
        <>

            <div className='d-flex flex-column-reverse justify-content-end flex-md-row bg-white'>
                {name && <div className='p-3 w-auto' style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? theme.palette.primary.main : 'white', textAlign: 'center', flexGrow: 1 }}>{name}</div>}
                {yearFiltering && <div style={{ flexGrow: 1 }}><SelectYearFilter years={getYears()} setYears={setFilter} selectedYears={state.filters.filter(f => f.id === 'date')} /></div>}
                {searching && <div className='mx-3' ><GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} /></div>}
            </div>
            <table className='table'>
                <thead style={{ color: dark ? 'white' : 'black', backgroundColor: dark ? theme.palette.primary.main : 'white' }}>
                    <tr>
                        {headerGroups[1].headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? <ArrowDropDownIcon />
                                            : <ArrowDropUpIcon />
                                        : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <TablePagination
                component="div"
                count={data.length}
                page={state.pageIndex}
                onPageChange={(event, page) => { gotoPage(page) }}
                rowsPerPage={state.pageSize}
                onRowsPerPageChange={(event) => { setPageSize(event.target.value) }}
                labelRowsPerPage="Počet záznamů na stránku:"
                labelDisplayedRows={({ from, to, count }) => `${from} - ${to} z ${count}`}
            />
        </>
    );
}

export default Table;