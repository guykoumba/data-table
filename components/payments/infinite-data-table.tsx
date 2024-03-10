"use client"

import { useEffect, useRef, useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "../DataTablePagination"
import { Payment, getData } from "@/lib/data"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
}


const fetchSize = 50;

export function InfiniteDataTable<TData, TValue>({
    columns,
}: DataTableProps<TData, TValue>) {

    const tableContainerRef = useRef<HTMLDivElement>(null)
    const [data, setData] = useState<Payment[]>([])

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    })

    const fetchMoreOnBottomReached =
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement
                console.log({ scrollHeight, scrollTop, clientHeight })
                //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
                // if (
                //     scrollHeight - scrollTop - clientHeight < 500 &&
                //     !isFetching &&
                //     totalFetched < totalDBRowCount
                // ) {
                //     fetchData()
                // }
            }
        }

    async function fetchData(start?: Number) {
        const d = await getData();
        setData([...data, ...d]);
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (

        <div>
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>


            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />


            </div>
            <div className="rounded-md border h-[400px] overflow-y-auto relative" ref={tableContainerRef} onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}>
                <Table className=""  >
                    <TableHeader className="sticky top-0 z-10 bg-white" >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}  >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </div>


    )
}
