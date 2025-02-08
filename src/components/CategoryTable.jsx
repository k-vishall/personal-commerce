import React, { useState } from "react";
import { toast } from "sonner"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Trash2,
  MoveDown,
  MoveUp,
  Pencil,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const categoriesData = [
  { id: 1, name: "Electronics", desc: "Latest gadgets and devices"},
  { id: 2, name: "Fashion", desc: "Clothing, shoes, and accessories"},
  { id: 3, name: "Home & Kitchen", desc: "Furniture, appliances, and decor"},
  { id: 4, name: "Beauty & Personal Care", desc: "Cosmetics and skincare products"},
  { id: 5, name: "Health & Wellness", desc: "Supplements, fitness, and medical equipment"},
  { id: 6, name: "Toys & Games", desc: "Entertainment for kids and adults"},
  { id: 7, name: "Automotive", desc: "Car accessories and tools"},
  { id: 8, name: "Sports & Outdoors", desc: "Athletic gear and outdoor equipment"},
  { id: 9, name: "Books & Stationery", desc: "Novels, textbooks, and office supplies"},
  { id: 10, name: "Pet Supplies", desc: "Food and accessories for pets"},
  { id: 11, name: "Jewelry & Watches", desc: "Luxury and everyday wearables"},
  { id: 12, name: "Groceries & Gourmet", desc: "Food, beverages, and kitchen essentials"},
  { id: 13, name: "Gaming", desc: "Consoles, accessories, and video games"},
  { id: 14, name: "Office Supplies", desc: "Essentials for workspace and productivity"},
  { id: 15, name: "Baby Products", desc: "Items for newborns and toddlers"},
];

  export function CategoryTable() {
    const [data, setData] = useState(categoriesData);
    const [pageSize, setPageSize] = useState(10);  // Set initial page size
    const [pageIndex, setPageIndex] = useState(0); // Track current page index

    const columns = [
      { accessorKey: "id", header: "ID", cell: ({ row }) => row.original.id },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => row.original.name,
      },
      {
        accessorKey: "desc",
        header: "Description",
        cell: ({ row }) => row.original.desc,
      },
      {
        id: "editAction",
        header: "Edit",
        cell: ({ row }) => (
          <Button
            className="bg-blue-600"
            onClick={() => handleEdit(row.original.id)}
          >
            <Pencil color="white" />
          </Button>
        ),
      },
      {
        id: "deleteAction",
        header: "Delete",
        cell: ({ row }) => (
          <Button
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 />
          </Button>
        ),
      },
    ];
  
    const handleDelete = (id) => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast("Category Delete Clicked...", {
        description: "No Description",
        action: {
          label: "Ok",
          onClick: () => console.log("Button Category Delete Clicked"),
        },
      })
    };

    const handleEdit = (id) => {
      toast("Category Edit Clicked...", {
        description: "No Description",
        action: {
          label: "Ok",
          onClick: () => console.log("Button Category Edit Clicked"),
        },
      })
    };
  
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          pagination: { pageIndex, pageSize },
        },
        onPaginationChange: (updater) => {
          setPageIndex(updater.pageIndex || pageIndex);
          setPageSize(updater.pageSize || pageSize);
        },
    });

    return (
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Find Category..."
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-full mr-2.5"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    column.id !== "editAction" &&
                    column.id !== "deleteAction"
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center space-x-1"
                          : "flex items-center",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {/* <ArrowUpDown className="text-xs"/> */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* <span> */}
                      {/* {{
                        asc: <MoveUp className="text-7xl" />, 
                        desc: <MoveDown className="ml-1" />,
                      }[header.column.getIsSorted()] ?? null} */}
                      {/* </span> */}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-between py-4">
          <Pagination>
            <PaginationContent>
              {/* Previous Page Button */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
                />
              </PaginationItem>

              {/* Page Number Buttons */}
              {Array.from(
                { length: Math.ceil(data.length / pageSize) },
                (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i === pageIndex}
                      onClick={() => setPageIndex(i)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* Ellipsis */}
              {/* <PaginationItem>
              <PaginationEllipsis />
                </PaginationItem> */}

              {/* Next Page Button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setPageIndex(
                      Math.min(
                        pageIndex + 1,
                        Math.ceil(data.length / pageSize) - 1
                      )
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  }
  
