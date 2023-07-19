import React, { useEffect, useRef } from "react";
import DataTable from "./DataTable";
import { Box, Button, Grid, Input } from "@mui/material";
import * as XLSX from "xlsx";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";

export default function Home() {
  const [data, setData] = React.useState<any[]>([]);
  const [rows, setRows] = React.useState<Credentials[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    const firstLoad = async () => {
      const result = await loadCredentials();
      console.log("result", result);
      const columns: Credentials[] = result;
      setRows(columns);
    };

    try {
      firstLoad();
      console.log(rows);
    } catch (e) {
      onError(e);
    }
  }, [data]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files![0]);
    reader.onload = (e) => {
      e.preventDefault();
      const bstr = e?.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const info = XLSX.utils.sheet_to_json(ws);
      API.post("credentials", "/upload", {
        body: { credentials: info },
      });
      setData(info);
    };
  };

  const loadCredentials = () => {
    return API.get("credentials", "/", {
      headers: {},
    });
  };

  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <h1>Afiliados</h1>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button variant="contained" component="label">
              Alta afiliados
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              Baja afiliados
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1, borderColor: "secondary", border: "thin" }}>
          <Grid item xs={12}>
            <DataTable rows={rows} />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export type CredentialEsp = {
  Nombre: string;
  Apellido: string;
  DNI: string;
  Plan: string;
  Alta: Date;
  Email: string;
  Baja: Date | null;
};

export type Credentials = {
  id?: string;
  name: string;
  lastName: string;
  dni: string;
  plan: string;
  email: string;
  subscribeDate: Date;
  unsubscribeDate?: Date | null;
  createdAt?: string;
};
