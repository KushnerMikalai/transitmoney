import { useState, ReactElement } from 'react'
import {
  Button,
  Flex,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'

interface StepsListProps {
  onCreate: (form: any) => void
}

const StepsList = ({ onCreate }: StepsListProps) => {
  const [step, setStep] = useState(1);

  const onChangeStep = (step: number) => {
    setStep(step)
  }

  return (<div>
      {step === 1 &&
        <VStack>
          <Text>Start planning your budget</Text>
          <Button onClick={() => onChangeStep(2)}>Start</Button>
        </VStack>
      }
      {step === 2 &&
        <VStack>
          <Text>Your budget settings:</Text>
          <FormControl id="email">
            <FormLabel>Name budget:</FormLabel>
            <Input type="text" />
            <FormHelperText>We`ll never share your email.</FormHelperText>
          </FormControl>
          <Button onClick={() => onChangeStep(3)}>Next</Button>
        </VStack>
      }
      {step === 3 &&
        <VStack>
          <Text>Start planning your budget</Text>
          <FormControl id="email">
          </FormControl>
          <Button onClick={() => onChangeStep(2)}>Back</Button>
          <Button onClick={() => onCreate({step})}>Finish</Button>
        </VStack>
      }
  </div>)
}

const StartPlan = () => {
  const onCreate = (form: any) => {
    console.log(form, 'onCreate');
  }

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
        p="2"
      >
        <StepsList onCreate={onCreate} />
      </Flex>
    </Flex>
  )
}

export default StartPlan