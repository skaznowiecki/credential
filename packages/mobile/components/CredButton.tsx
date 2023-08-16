import { IButtonProps, Button } from "native-base";

export function CredButton(props: IButtonProps) {
  return (
    <Button
      bg={"white"}
      _text={{ color: "black", fontWeight: "bold" }}
      size={"lg"}
      _pressed={{ bg: "trueGray.400" }}
      _disabled={{ bg: "trueGray.400" }}
      borderRadius={"2xl"}
      marginBottom={2}
      {...props}
    ></Button>
  );
}
