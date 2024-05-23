'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Image from '../Image'
import mentor from '../../assets/mentor.png'
import Link from 'next/link'

const Links = ['Find a mentor', 'Projects', 'Team']
import {  handleLogout } from "../../lib/actions";



export default function Navbar({session} : any) {
  
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
           <Link href='/'> <Image src={mentor}  boxSize={isDesktop ? "85px" : "110px"}
                alt={"img"}
               
                objectFit="cover"/></Link>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Link href='Mentors' >{link}</Link>
              ))}
            </HStack>
          </HStack>
     {session?.user ? 
     <form action={handleLogout}>
      <button>Logout</button>
     </form> :

          <Flex alignItems={'center'}>
         

            <Button  colorScheme='green'><Link href='/signup'>Signup</Link></Button>    
          
          </Flex>
     
      }
         </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link href='/Mentors'>{link}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    
    </>
  )
}