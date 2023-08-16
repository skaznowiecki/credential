import { ITextProps, Text } from "native-base";

export function CredHelperText(props: ITextProps) {
  return (
    <Text
      borderWidth={0}
      fontSize={"md"}
      color={"grey"}
      paddingLeft={"0"}
      marginBottom={"3"}
      fontWeight={"light"}
      {...props}
    ></Text>
  );
}
