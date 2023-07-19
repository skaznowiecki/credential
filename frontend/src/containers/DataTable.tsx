import * as React from "react";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nombre", width: 130 },
  { field: "lastName", headerName: "Apellido", width: 130 },
  {
    field: "dni",
    headerName: "DNI",
    type: "number",
    width: 90,
  },
  {
    field: "subscribeDate",
    headerName: "Fecha Inicio",
    type: "datetime",
    width: 190,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
  },
  {
    field: "unsubscribeDate",
    headerName: "Fecha Fin",
    type: "datetime",
    width: 190,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
  },
];

const rows = [
  {
    id: 1,
    name: "Snow",
    lastName: "Jon",
    dni: 35,
    subscribeDate: Date.now(),
    unsubscribeDate: Date.now(),
  },
  {
    id: 2,
    name: "Snoasw",
    lastName: "Jmjaon",
    dni: 35235,
    subscribeDate: Date.now(),
    unsubscribeDate: Date.now(),
  },
  {
    id: 3,
    name: "Snaow",
    lastName: "Jodn",
    dni: 356,
    subscribeDate: Date.now(),
    unsubscribeDate: Date.now(),
  },
  {
    id: 4,
    name: "Snosdw",
    lastName: "Jonhg",
    dni: 38785,
    subscribeDate: Date.now(),
    unsubscribeDate: Date.now(),
  },
  {
    id: 51,
    name: "Snoasdw",
    lastName: "Jon",
    dni: 305,
    subscribeDate: Date.now(),
  },
  {
    id: 16,
    name: "Snoasdw",
    lastName: "Jocvxn",
    dni: 351231,
    subscribeDate: Date.now(),
  },
  {
    id: 71,
    name: "Snoasdw",
    lastName: "Jocvvbn",
    dni: 355566,
    subscribeDate: Date.now(),
    unsubscribeDate: Date.now(),
  },
];

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter placeholder="DNI..." />
    </Box>
  );
}

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableColumnMenu
        slots={{ toolbar: QuickSearchToolbar }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
