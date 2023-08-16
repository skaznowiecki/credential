import { IInputProps, Input } from "native-base";

export function CredInput(props: IInputProps) {
  return (
    <Input
      borderWidth={0}
      fontSize={35}
      paddingLeft={"0"}
      paddingBottom={15}
      fontWeight={"bold"}
      placeholderTextColor={"trueGray.600"}
      color={"white"}
      _focus={{ bg: "black", selectionColor: "white", color: "white" }}
      {...props}
    ></Input>
  );
}
