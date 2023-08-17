export type Request = {
  credentials: CredentialEsp[];
};

export type CredentialEsp = {
  Nombre: string;
  Apellido: string;
  DNI: number;
  Plan: string;
  Alta: Date;
  Email: string;
  Baja: Date | null;
};
