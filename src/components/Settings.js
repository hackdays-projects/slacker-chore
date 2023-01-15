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
import Invites from "./Invites.js";
import Members from "./Members.js";


function Settings({ user, uid, db }) {
  const [group, setGroup] = useState(null);
  const [inputInviteMember, setInputInviteMember] = useState('')
  const [inputTeamName, setInputTeamName] = useState('')

  const generateGroup = async () => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "users/" + uid + "/group"));
      if (!snapshot.exists() || snapshot.val() == "none") {
        const newUID = uuidv4();
        set(ref(db, "users/" + uid + "/group"), 
          newUID
        );
        set(ref(db, "groups/" + newUID), {
          name: inputTeamName,
          users: [user.uid]
        });
        setGroup(newUID);
      }
      console.log(snapshot.val());
      console.log(group);
  }

  const inviteMember = async () => {
    set(ref(db, "invites/" + inputInviteMember.replaceAll(".", " ")), [{
      invitee: inputInviteMember.replaceAll(".", " "),
      inviter: user.displayName,
      group: group,
    }]);
    setInputInviteMember("");
  }

  const leaveGroup = async () => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "users/" + uid + "/group"));
        set(ref(db, "users/" + uid + "/group"), 
          "none"
        );
        setGroup(null);
      console.log(snapshot.val());
      console.log(group);
  }

  useEffect(() => {
    getGroup();
  }, [])

  const getGroup = async () => {
    onValue(ref(db, "users/" + uid + "/group"), (snapshot) => {
      if (snapshot.exists() && snapshot.val() != "none") {
        setGroup(snapshot.val())
      } else setGroup(null);
    });
  }

  const handleInputChangeTeamName = (e) => setInputTeamName(e.target.value)
  const handleInputChangeInviteMember = (e) => setInputInviteMember(e.target.value)


  return (
    <Box px={6} py={4}>
      { group ?
       <Box>
        <Box >
        <Button colorScheme='blue' onClick={inviteMember}>Invite Member</Button>
        </Box>
        <FormControl width="30vw">
          <FormLabel>Email address</FormLabel>
          <Input type='email'  value={inputInviteMember} onChange={handleInputChangeInviteMember} />
          <FormHelperText>Type your friends email address here before hitting invite</FormHelperText>
        </FormControl>
        <Button colorScheme='red' onClick={leaveGroup} mt={2} mb={4}>Leave Group</Button>
        <Members user={user} uid={uid} db={db}></Members>
       </Box>
      : 
      <Box>  
        <Text fontSize="25px" fontFamily="league spartan" fontWeight="bold">
          Create a team by clicking here 👇
        </Text>
        <FormControl width="30vw">
          <FormLabel>Team Name</FormLabel>
          <Input type='text' value={inputTeamName} onChange={handleInputChangeTeamName} />
        </FormControl>
        <Button colorScheme='blue' onClick={generateGroup} mt={2} mb={10}>Create</Button>
        <Box>
          <Invites user={user} uid={uid} db={db}></Invites>
        </Box>
      </Box>
      }
      
    </Box>
  );
}

export default Settings;
