import { View, Text, Flex, HStack, Heading, Spinner } from "native-base";

export default function SplashScreen() {
  return (
    <View>
      <Flex
        safeArea
        flex={1}
        justifyContent={"center"}
        background={"black"}
        paddingX={5}
      >
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" size="lg" />
          <Heading color="primary.500" fontSize="md">
            Cargando...
          </Heading>
        </HStack>
      </Flex>
    </View>
  );
}
