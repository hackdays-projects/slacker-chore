import "./App.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  Box,
  Button,
  HStack,
  IconButton,
  useColorMode,
  Flex,
  VStack,
  Image,
  Text,
  Center
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const firebaseConfig = {
  apiKey: "AIzaSyAb-_cYPaJbujna2bPBXJYGSxxX5vX3AiQ",
  authDomain: "slacker-chore.firebaseapp.com",
  projectId: "slacker-chore",
  storageBucket: "slacker-chore.appspot.com",
  messagingSenderId: "649669628",
  appId: "1:649669628:web:eab8d45aa6370f64ec6079",
  measurementId: "G-W7NCBTX6S5",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

function App() {
  const [user, setUser] = useState(null);
  const [uid, setUID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const auth = getAuth();
  const [tab, setTab] = useState("My Tasks");

  const { colorMode, toggleColorMode } = useColorMode();

  const logIn = async (e) => {
    await signInWithPopup(auth, provider);
  };

  const logOut = async (e) => {
    await signOut(auth);
  };

  useEffect(() => {
    //signOut(auth);
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(userAuth);
        setUID(userAuth.uid);
        setLoggedIn(true);

        onValue(ref(db, "users/" + userAuth.uid + "/session"), (snapshot) => {
          if (snapshot.exists()) {
            const sessionActiveRef = ref(
              db,
              "sessions/" + snapshot.val() + "/active"
            );
            onValue(sessionActiveRef, (active) => {
              if (active.exists()) {
                if (!active.val()) {
                  set(
                    ref(db, "users/" + userAuth.uid + "/lastSession"),
                    snapshot.val()
                  );
                  set(ref(db, "users/" + userAuth.uid + "/session"), "none");
                  off(sessionActiveRef);
                }
              }
            });
          } else {
            set(ref(db, "users/" + userAuth.uid), {
              session: "none",
              name: userAuth.displayName,
            });
          }
        });
      } else {
        // User is signed out
        setLoggedIn(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {loggedIn == null ? null : !loggedIn ? (
        <VStack>
          <HStack justify="flex-start" w="full" >
            <Box boxSize="65px" margin="3">
              <Image src="stacker-logo.png" /> 
            </Box>

          </HStack>
          <HStack justify="flex-start" w="full">
            <VStack ml="-50px">
              <Box className="blue-rectangle" margin="0"/>
              <Box className="purple-rectangle" margin="0"/>
            </VStack> 
            <VStack>
              <Box className="red-rectangle" margin="0"/>
              <Box className="magenta-rectangle" margin="0"/>
            </VStack>
            <VStack> 
              <Box className="slacker-text-logo" margin="5">
                <Image src="text-logo.png"/>
              </Box>
              <Box className="white-rectangle" align="left">
                <Text className="slogan-text-un-prefix" margin="6">
                  untidy? <br/>
                  unorganized? <br/>
                  unhappy?
                </Text>
                <Button colorScheme="blue" onClick={logIn}>
                  Sign In with Google

                </Button>
              </Box>
            </VStack>
            <VStack> <Box className="red-rectangle-2" margin="0"/> </VStack>
            <VStack align="flex-start">
              <HStack>
                <Box className="magenta-rectangle-2" margin="0"/>
                <Box className="purple-rectangle-two" mr="-50px"/>
              </HStack> 
              <Box className="blue-rectangle-2"/>
            </VStack>

            
          </HStack>
        </VStack>
        
      ) : (
        <Box w="full">
          <Navbar toggleColorMode={toggleColorMode} colorMode={colorMode} logOut={logOut} user={user} uid={uid} db={db} setTab={setTab} ></Navbar>
          {(tab == "My Tasks") ? <Home user={user} uid={uid} db={db} /> : (tab == "Group Tasks") ? "Hello Group" : "Im in settings"}
        </Box>
      )}
    </Box>
  );
}

export default App;
