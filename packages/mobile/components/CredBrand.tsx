import { Center, Flex, Heading, IHeadingProps, Image } from "native-base";

export function CredBrand(props: IHeadingProps) {
  return (
    <Center marginBottom={5}>
      <Flex flexDirection={"row"} alignContent={"center"} >
        {/* <Image
          source={require("../assets/cred.png")}
          style={{ width: 30, height: 30 }}
          borderRadius={100}
          alt="cred-logo"
          marginRight={2}
        ></Image> */}
        <Heading
          color={"white"}
          fontSize={50}
          fontWeight={"thin"}
          marginBottom={5}
          {...props}
        ></Heading>
      </Flex>
    </Center>
  );
}
