'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Flex,
 
} from '@chakra-ui/react'

import Image from './Image'
import linkedin from '../assets/linkedin.jpeg'
import Activity from './Activity'

export default function Card() {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            // backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={linkedin}
            alt="#"
          />
       
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          Tech
          </Text>
          <Flex align="center" >
          <Heading p={2} fontSize={'2xl'}
        fontFamily={'body'}
        fontWeight={500}
        whiteSpace="nowrap"
       >
Evan Gordon
          </Heading>
          <Activity/>
          </Flex>
        
            <Text fontWeight={800} fontSize={'xl'}>
          Senior VP @Google
            </Text>
         
        
        </Stack>
      </Box>
    </Center>
  )
}