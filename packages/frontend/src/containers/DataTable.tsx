import * as React from "react";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box, Paper } from "@mui/material";
import { Credentials } from "./Home";

//declare table props
interface TableProps {
  rows: Credentials[];
}

const columns: GridColDef[] = [
  {
    field: "dni",
    headerName: "DNI",
    type: "number",
    width: 110,
  },
  { field: "name", headerName: "Nombre", width: 130 },
  { field: "lastName", headerName: "Apellido", width: 130 },
  { field: "email", headerName: "Email", width: 180 },
  { field: "plan", headerName: "Plan", width: 180 },
  {
    field: "createdAt",
    headerName: "Fecha Alta",
    type: "datetime",
    width: 130,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
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

export default function DataTable({ rows }: TableProps) {
  const idRows = rows.map((row) => {
    return { ...row, id: row.dni };
  });

  return (
      <DataGrid
        rows={idRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableColumnMenu
        slots={{ toolbar: QuickSearchToolbar }}
        pageSizeOptions={[10, 15]}
      />

  );
}
