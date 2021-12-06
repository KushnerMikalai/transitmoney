import { useState, ReactElement } from 'react'
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
} from '@chakra-ui/react'
import HeaderLite from '../layout/HeaderLite'
import {useCountries, useCurrencies} from '../../lib/swr-hooks'

import {
  HiPlusCircle,
  HiTrash
} from 'react-icons/hi'


const StartPlan = () => {
  const countries = useCountries()
  const currencies = useCurrencies()

  const [categoryValues, setCategoryValues] = useState([
    { category: '', sum : ''},
    { category: '', sum : ''},
  ])

  let handleChange = (i: number, e: any) => {
    let newFormValues: any = [...categoryValues];
    newFormValues[i][e.target.name] = e.target.value;
    setCategoryValues(newFormValues);
  }

  let addFormFields = () => {
    setCategoryValues([...categoryValues, { category: '', sum: '' }])
  }

  let removeFormFields = (i: number) => {
    let newFormValues = [...categoryValues];
    newFormValues.splice(i, 1);
    setCategoryValues(newFormValues)
  }


  let handleSubmit = (event: any) => {
    event.preventDefault();
    alert(JSON.stringify(categoryValues));
  }

  const minDate = new Date()
  minDate.setMonth(minDate.getMonth() - 1)
  const minStringDate = minDate.toISOString().split('T')[0]

  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 6)
  const maxStringDate = maxDate.toISOString().split('T')[0]

  return (
    <Box
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      overflowX="hidden"
      overflowY="auto"
      width="100%"
    >
      <HeaderLite/>
      <Box
        maxW="520px"
        w="100%"
        p="6"
        mx="auto"
        my="12"
        bg="white"
        borderRadius="5"
        boxShadow="lg"
        borderColor="gray.100"
        borderWidth="1px"
      >
        <Box mb="10">
          <Text fontSize="2xl">Добро пожаловать!</Text>
          <Text fontSize="md">Чтобы начать работу необходимо создать свой первый трекер расходов</Text>
        </Box>
        <Box>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing="6">
              <FormControl id="name" isRequired>
                <FormLabel>Название:</FormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl id="dateFrom" isRequired>
                <FormLabel>Финансовый период:</FormLabel>
                <HStack w="100%">
                  <Input type="date" min={minStringDate}/>
                  <Input type="date" max={maxStringDate}/>
                </HStack>
              </FormControl>

              <HStack w="100%">
                <FormControl id="country">
                  <FormLabel>Страна:</FormLabel>
                    <Select placeholder=' '>
                      {countries.data ? countries.data.map((item: any, i: number) => {
                        return <option key={i} value={item.key}>{item?.flag} {item?.name?.common || ''}</option>
                      }) : null}
                    </Select>
                </FormControl>
                <FormControl id="currency">
                  <FormLabel>Валюта:</FormLabel>
                    <Select placeholder=' '>
                      {currencies.data ? currencies.data.map((item: any, i: number) => {
                        return <option key={i} value={item.key}>{item.key} {item.symbol}</option>
                      }) : null}
                    </Select>
                </FormControl>
              </HStack>
              <Box>
                <FormLabel>Категории расходов и их предпологаемы суммы за один финансовый период:</FormLabel>
                  <VStack>
                    {categoryValues.map((element, index) => (
                      <Box
                        key={index}
                        role="group"
                        w="100%"
                        position={'relative'}
                      >
                        <HStack
                        >
                          <Input
                            type="text"
                            name="category"
                            value={element.category || ''}
                            onChange={e => handleChange(index, e)}
                          />
                          <Input
                            w="26"
                            type="number"
                            name="sum"
                            value={element.sum || ''}
                            onChange={e => handleChange(index, e)}
                          />

                          <Box
                            position={'absolute'}
                            top={'50%'}
                            right={'-20px'}
                            cursor={'pointer'}
                            transform={'translateY(-50%)'}
                            color={'red.500'}
                            role="group"
                            opacity={'0'}
                            transitionProperty={'opacity'}
                            transitionDelay={'150ms'}
                            onClick={() => removeFormFields(index)}
                            _groupHover={{opacity: 1 }}
                          >
                            <HiTrash/>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                    <Box
                      position={'relative'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRadius={'3'}
                      cursor={'pointer'}
                      w="100%"
                      h="40px"
                      backgroundColor={'blue.50'}
                      borderWidth={'2px'}
                      borderStyle={'dashed'}
                      borderColor={'blue.200'}
                      color="blue.500"
                      onClick={() => addFormFields()}
                    >
                      <HiPlusCircle />
                    </Box>
                  </VStack>
              </Box>
              <Flex
                justifyContent={'flex-end'}
                w={'100%'}
              >
                <Button type="submit" colorScheme={'green'}>
                  Отправить
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StartPlan