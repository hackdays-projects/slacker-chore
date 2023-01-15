import { Box, Text, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import {useEffect, useState} from "react";
import { getDatabase, ref, set, onValue, off, get, child } from "firebase/database";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


function Invites({ user, uid, db }) {
  const [invites,setInvites] = useState(null)

  useEffect(() => {
    getInvites();
  }, [])

  const getInvites = () => {
    onValue(ref(db, "invites/" + user.email.replaceAll(".", " ")), (snapshot) => {
      if (snapshot.exists()) {
        setInvites(snapshot.val())
      }
    });
  }
  return (
    <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>All Your Invites</TableCaption>
    <Thead>
      <Tr>
        <Th>User</Th>
        <Th>group name</Th>
        <Th isNumeric>join</Th>
      </Tr>
    </Thead>
    <Tbody>
      { 
        invites ? 
        invites.map((invite) => {
          <Tr>
            <Th>{invite.inviter}</Th>
            <Th>{invite.group}</Th>
            <Th isNumeric><Button colorScheme='blue'>Join Team</Button></Th>
          </Tr>
          console.log(invite)
        })
        :
        <Tr>
          <Td>You have no invites</Td>
          <Td></Td>
          <Td isNumeric></Td>
        </Tr>
      }
    </Tbody>
  </Table>
</TableContainer>    
  );
}

export default Invites;
