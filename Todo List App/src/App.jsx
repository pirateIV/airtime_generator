import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckListGrayIcon, CloudIcon } from "@/components/common/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const defaultData = [
  {
    checked: false,
    taskTitle: "Go to the Gym",
    created: "2024-08-01",
    deadline: "2024-08-10",
    priority: "High",
    tags: ["Personal", "Health"],
  },
  {
    checked: false,
    taskTitle: "Finish React Project",
    created: "2024-08-02",
    deadline: "2024-08-15",
    priority: "Medium",
    tags: ["Work", "Programming"],
  },
  {
    checked: false,
    taskTitle: "Grocery Shopping",
    created: "2024-08-03",
    deadline: "2024-08-05",
    priority: "Low",
    tags: ["Personal"],
  },
  {
    checked: false,
    taskTitle: "Prepare for Presentation",
    created: "2024-08-04",
    deadline: "2024-08-11",
    priority: "High",
    tags: ["Work", "School"],
  },
  {
    checked: false,
    taskTitle: "Read a Book",
    created: "2024-08-05",
    deadline: "2024-08-12",
    priority: "Low",
    tags: ["Personal", "Leisure"],
  },
  {
    checked: false,
    taskTitle: "Plan Weekend Trip",
    created: "2024-08-06",
    deadline: "2024-08-09",
    priority: "Medium",
    tags: ["Personal", "Travel"],
  },
];

const columnHelper = createColumnHelper();

const App = () => {
  const [todos, setTodos] = useState([...defaultData]);
  const [editingCell, setEditingCell] = useState(null);

  const newTodo = {
    checked: false,
    taskTitle: "",
    created: "",
    deadline: "",
    priority: "",
    tags: [],
  };

  const addNewTask = () => {
    setTodos([...todos, newTodo]);
  };

  const handleCheckBoxChange = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditClick = (rowIndex, columnId) => {
    setEditingCell({ rowIndex, columnId });
  };

  const handleCancel = () => {
    setEditingCell(null);
  };

  const columns = [
    columnHelper.accessor("checked", {
      cell: (info) => (
        <div className="p-2 *:w-9">
          <Checkbox
            type="button"
            checked={info.getValue()}
            onClick={() => handleCheckBoxChange(info.row.index)}
          />
        </div>
      ),
      header: () => <Checkbox className="mt-2" checked />,
    }),
    columnHelper.accessor("priority", {
      cell: (info) => {
        const isEditing =
          editingCell?.rowIndex === info.row.index &&
          editingCell.columnId === "priority";

        return isEditing ? (
          <select className="p-2 *:p-2 bg-gray-300 w-full" value={info.getValue()}>
            <option value="Low" selected>
              Low
            </option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        ) : (
          <button
            className="h-full w-full p-2"
            onClick={() => handleEditClick(info.row.index, info.column.id)}
          >
            {info.getValue()}
          </button>
        );
      },
      header: "Priority",
    }),
    columnHelper.accessor("taskTitle", {
      cell: (info) => info.getValue(),
      header: "Task Title",
    }),
    columnHelper.accessor("created", {
      cell: (info) => info.getValue(),
      header: '"Do" date',
    }),
    columnHelper.accessor("deadline", {
      cell: (info) => info.getValue(),
      header: "Deadline",
    }),
    columnHelper.accessor("tags", {
      cell: (info) => {
        return info.getValue().map((tag) => <Badge key={tag}>{tag}</Badge>);
      },
      header: "Tags",
    }),
  ];

  const table = useReactTable({
    data: todos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <main className="container">
      <header className="py-5">
        <div className="h-24 text-5xl">
          <CheckListGrayIcon />
        </div>
        <h1 className="text-3xl font-gentium font-bold">Simple To-do List</h1>
      </header>

      <section>
        <div className="my-5">
          <Button
            type="button"
            className="text-xs"
            onClick={addNewTask}
            title="add new task"
          >
            <CloudIcon />
            <span className="ms-2">Add New Task</span>
          </Button>
        </div>
      </section>

      <section className="flex gap-3">
        <aside className="tasks w-[900px]">
          <h1 className="text-2xl">Tasks</h1>

          <ScrollArea>
            <div className="border-y mt-4">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          tabIndex="0"
                          className="space-x-2"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </aside>

        <aside>
          <h1 className="text-2xl">Completed Tasks</h1>
        </aside>
      </section>
    </main>
  );
};

export default App;
