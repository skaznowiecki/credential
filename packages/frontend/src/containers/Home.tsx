import React, { useEffect } from "react";
import DataTable from "./DataTable";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";

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

    try {
      firstLoad();
    } catch (e) {
      onError(e);
    }
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

  const handleClickRefresh = async () => {
    const result = await API.get("credentials", "/", {
      headers: {},
    });
    const rows: Credentials[] = result;
    setRows(rows);
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
        alignItems="stretch"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h2"
              alignContent={"center"}
              paddingBottom={5}
              sx={{ color: "primary.main" }}
            >
              Afiliados
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon fontSize="inherit" />}
            >
              Alta afiliados
              <input type="file" hidden onChange={handleUpCredentials} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              startIcon={<DownloadIcon fontSize="inherit" />}
            >
              Baja afiliados
              <input type="file" hidden onChange={handleDownCredentials} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              onClick={handleClickRefresh}
              startIcon={<RefreshIcon fontSize="inherit" />}
            >
              Recargar
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 3,
            borderColor: "secondary",
            border: "thin",
            width: "max-content",
          }}
        >
          <Paper elevation={3}>
            <Grid item>
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
