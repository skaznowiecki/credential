import * as React from "react";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box } from "@mui/material";
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
    width: 150,
  },
  { field: "name", headerName: "Nombre", width: 160 },
  { field: "lastName", headerName: "Apellido", width: 160 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "plan", headerName: "Plan", width: 250 },
  {
    field: "createdAt",
    headerName: "Fecha Alta",
    type: "datetime",
    width: 160,
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
        sx={{
          boxShadow: 4,
          border: 1,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />

  );
}
