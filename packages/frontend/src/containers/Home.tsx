import React, { useEffect } from "react";
import DataTable from "./DataTable";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";

export default function Home() {
  const [data, setData] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState<Credentials[]>([]);

  useEffect(() => {
    const firstLoad = async () => {
      const result = await API.get("credentials", "/", {
        headers: {},
      });
      const rows: Credentials[] = result;
      setRows(rows);
    };

    const interval = setInterval(() => firstLoad(), 5000);
    try {
      firstLoad();
    } catch (e) {
      onError(e);
    }

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const handleUpCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files![0]);
    reader.onload = async (e) => {
      const bstr = e?.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const info = XLSX.utils.sheet_to_json(ws);
      upCredentials(info);
    };
    reader.onloadend = () => {
      setData((prevState) => !prevState);
    };
  };

  const handleDownCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files![0]);
    reader.onload = async (e) => {
      const bstr = e?.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const info = XLSX.utils.sheet_to_json(ws);
      downCredentials(info);
    };
    reader.onloadend = () => {
      setData((prevState) => !prevState);
    };
  };

  const upCredentials = async (info: any) => {
    try {
      await API.post("credentials", "/upload", {
        body: { credentials: info },
      });
    } catch (error) {
      onError(error);
    } finally {
      setData((prevState) => !prevState);
    }
  };

  const downCredentials = async (info: any) => {
    try {
      await API.post("credentials", "/delete", {
        body: { credentials: info },
      });
    } catch (error) {
      onError(error);
    } finally {
      setData((prevState) => !prevState);
    }
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
          <Typography variant="h2">Afiliados</Typography>
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
              <input type="file" hidden onChange={handleUpCredentials} />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component="label">
              Baja afiliados
              <input type="file" hidden onChange={handleDownCredentials} />
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1, borderColor: "secondary", border: "thin" }}>
          <Paper elevation={3}>
            <Grid item xs>
              <DataTable rows={rows} />
            </Grid>
          </Paper>
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

