import * as React from "react";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Credentials } from "./Home";

//declare table props
interface TableProps {
  rows: Credentials[];
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 130 },
  { field: "lastName", headerName: "Apellido", width: 130 },
  {
    field: "dni",
    headerName: "DNI",
    type: "number",
    width: 90,
  },
  { field: "email", headerName: "Email", width: 180 },
  { field: "plan", headerName: "Plan", width: 180 },
  {
    field: "subscribeDate",
    headerName: "Fecha Alta",
    type: "datetime",
    width: 130,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
  },
  {
    field: "unsubscribeDate",
    headerName: "Fecha Baja",
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
  return (
    // <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
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
    // </div>
  );
}
