import { IHeadingProps, Heading, Center } from "native-base";

export function CredHeading(props: IHeadingProps) {
  return (
    <Center>
      <Heading
        color={"white"}
        fontSize={30}
        marginBottom={5}
        {...props}
      ></Heading>
    </Center>
  );
}
