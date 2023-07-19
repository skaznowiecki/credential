import React, { useEffect, useRef } from "react";
import DataTable from "./DataTable";
import { Box, Grid, Input } from "@mui/material";
import * as XLSX from "xlsx";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";

export default function Home() {
  const [data, setData] = React.useState<any[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    console.log(isMounted.current);
    if (isMounted.current) {
      const uploadCredentias = async () => {
        await createCredentials(data);
      };
      try {
        uploadCredentias();
      } catch (e) {
        onError(e);
      }
    } else {
      isMounted.current = true;
    }
  }, [data]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files![0]);
    reader.onload = (e) => {
      const bstr = e?.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setData(data);
    };
  };

  const createCredentials = (credentials: any[]) => {
    console.log("credentials", credentials);
    return API.post("credentials", "/upload", {
      body: { credentials: credentials },
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
            <h3>Alta afiliados</h3>
            <Input type="file" onChange={handleFileUpload} />
            <h1>{data.length > 0 ? data[0].nombre : "test"}</h1>
          </Grid>
          <Grid item>
            <h3>Baja afiliados</h3>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DataTable />
        </Grid>
      </Grid>
    </Box>
  );
}
