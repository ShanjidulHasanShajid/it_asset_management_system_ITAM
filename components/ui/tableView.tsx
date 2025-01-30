"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Column {
  key: string;
  label: string;
}

interface TableViewProps {
  data: any[];
  columns: Column[];
  onDelete?: (row: any) => Promise<void>;
  tableName?: string;
}

const TableView = ({ data, columns, onDelete, tableName }: TableViewProps) => {
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteItem || !onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(deleteItem);
    } catch (error) {
      console.error(`Error deleting ${tableName} item:`, error);
    } finally {
      setIsDeleting(false);
      setDeleteItem(null);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="bg-gray-100 px-4 py-3 whitespace-nowrap"
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="bg-gray-100 w-12 px-2 py-3 whitespace-nowrap" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${rowIndex}-${column.key}`}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    {row[column.key] || "-"}
                  </TableCell>
                ))}
                <TableCell className="w-12 px-2 py-3 whitespace-nowrap">
                  {onDelete && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setDeleteItem(row)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-full transition-colors"
                          title="Delete"
                          disabled={isDeleting}
                        >
                          <Trash2 size={16} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this {tableName}?
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableView;
