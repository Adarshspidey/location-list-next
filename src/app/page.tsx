"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Popup from "@/Components/Popup";
import { TableFormData } from "@/types";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TableFormData[]>([]);
  const [mode, setMode] = useState<"add" | "edit" | "view" | "">("");
  const [editMarkerData, setEditMarkerData] = useState<TableFormData | null>();
  const columns = useMemo<MRT_ColumnDef<TableFormData>[]>(
    () => [
      {
        accessorKey: "nickName",
        header: "Nick Name",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 200,
      },
      {
        accessorKey: "time",
        header: "Time",
        size: 150,
      },
      {
        accessorKey: "positions.lat",
        header: "Latitude",
        size: 150,
      },
      {
        accessorKey: "positions.lng",
        header: "Longitude",
        size: 150,
      },
    ],
    []
  );


  const handleDelete = (id: string) => {
    setFormData((prevFormData) =>
      prevFormData.filter((item) => item.id !== id)
    );
  };

  const openDeleteConfirmModal = (row: MRT_Row<TableFormData>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      row.original.id
        ? handleDelete(row.original.id)
        : console.log("No Id exist");
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: formData,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setMode("edit");
              setEditMarkerData(row.original);
              setIsOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-end p-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsOpen(true);
            setMode("add");
          }}
        >
          Add New
        </button>
      </div>
      <MaterialReactTable table={table} />
      <div className="flex justify-center p-5">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setMode("view");
            setIsOpen(true);
          }}
        >
          View All
        </button>
      </div>
      {isOpen && (
        <Popup
          setIsOpen={setIsOpen}
          setFormData={setFormData}
          formData={formData}
          editMarkerData={editMarkerData}
          mode={mode}
        />
      )}
    </>
  );
};

export default Home;
