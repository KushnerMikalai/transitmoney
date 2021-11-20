import {
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'

const StartPlan = () => {
  return (
    <Flex justify="center" minHeight="100vh" align="center">
      <Flex
        minH="300px"
        maxW="600px"
        w="100%"
        textAlign="center"
        justify="center"
        align="center"
        flexDirection="column"
        bgColor="white"
        boxShadow="2xl"
        borderRadius="15"
      >
        <Text mb="2">Start planning your budget</Text>
        <Button>Start</Button>
      </Flex>
    </Flex>
  )
}

export default StartPlan