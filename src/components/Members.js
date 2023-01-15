import { Box, Text, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  get,
  child,
} from "firebase/database";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

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
} from "@chakra-ui/react";

import { CheckIcon } from '@chakra-ui/icons'

function Members({ user, uid, db }) {
  const [members, setMembers] = useState(null)

  function getGroup(groupuid) {
    //console.log(uid)
    onValue(ref(db, "groups/" + groupuid), (snapshot) => {
      if (snapshot.exists() && snapshot.val() != "none") {
        console.log(snapshot.val().users)
        setMembers(snapshot.val().users);
      }
    });
  }

  function getUser(useruid) {
    //console.log(uid)
    onValue(ref(db, "users/" + useruid), (snapshot) => {
      if (snapshot.exists() && snapshot.val() != "none") {
        console.log(snapshot.val().displayName)
        return snapshot.val().displayName;
      }
    });
  }

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>All Your Invites</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th isNumeric>slacker?</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members ? (
            members.map((member) => {
              return (
                <Tr key={member}>
                  <Td>{getUser(member)}</Td>
                  <Td> { getUser(member) == "CeNLV3soecgY4ZFZuZQ6B9vQ1Sw1" ? <CheckIcon /> : "" } </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td>There are no members in this group yet</Td>
              <Td></Td>
              <Td isNumeric></Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Members;
