import { useState } from 'react'
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

  switch(step) {
    case 1:
      return (
        <VStack>
          <Text>Start planning your budget</Text>
          <Button onClick={() => onChangeStep(2)}>Start</Button>
        </VStack>
      )
    case 2:
      return (
        <VStack>
          <Text>Your budget settings:</Text>
          <FormControl id="email">
            <FormLabel>Name budget:</FormLabel>
            <Input type="text" />
            <FormHelperText>We`ll never share your email.</FormHelperText>
          </FormControl>
          <Button onClick={() => onChangeStep(3)}>Next</Button>
        </VStack>
      )
    case 3:
      return (
        <VStack>
          <Text>Start planning your budget</Text>
          <FormControl id="email">
          </FormControl>
          <Button onClick={() => onChangeStep(2)}>Back</Button>
          <Button onClick={() => onCreate({})}>Finish</Button>
        </VStack>
      )
  }
}

export default StepsList