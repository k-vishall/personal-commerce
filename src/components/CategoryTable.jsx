import { useState, useEffect } from "react";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux";
import { removeCategory } from "../features/category/categorySlice";
import { CreateCategoryDialog } from "@/components/CreateCategoryDialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
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

  export function CategoryTable() {
    const dispatch = useDispatch();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const categoriesData = useSelector((state) => state.categories.categories) || [];
    const [dialogOpen, setDialogOpen] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState(null); // for delete or edit
    const [data, setData] = useState([]);

    useEffect(() => {
      setData(
        categoriesData.map((category) => ({
          id: category.id,
          name: category.name,
          desc: category.desc,
        }))
      );
    }, [categoriesData]); 

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
            onClick={() => handleEdit(row.original)}
          >
            <Pencil color="white" />
          </Button>
        ),
      },
      {
        id: "deleteAction",
        header: "Delete",
        cell: ({ row }) => (
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" onClick={() => handleDelete(row.original)}>
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <strong>{selectedCategory?.name}</strong>? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
    ];
    
    const confirmDelete = () => {
      if (selectedCategory) {
        dispatch(removeCategory(selectedCategory.id));
        toast.success("Category deleted successfully!");
      }
      setDeleteDialogOpen(false);
    };

    const handleDelete = (cat) => {
      setSelectedCategory(cat);
      setDeleteDialogOpen(true);
    };

    const handleEdit = (selectedCategory) => {
      setSelectedCategory(selectedCategory);
      setDialogOpen(true);
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
        <CreateCategoryDialog open={dialogOpen} setOpen={setDialogOpen} editCategory={selectedCategory} />
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
  
