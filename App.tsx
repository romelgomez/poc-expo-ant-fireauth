import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, WhiteSpace, WingBlank, InputItem } from '@ant-design/react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';


// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '624506665751-lmhtr4tng9cu3psnei7afboigoq3vbmh.apps.googleusercontent.com',
});


function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  function confirmCode() {

    if (confirm) {
      confirm.confirm(code)
        .then(() => {})
        .catch((reason) => {
          console.error(reason);
        });
    }

  }

  if (!confirm) {
    return (
      <Button onPress={() => signInWithPhoneNumber('+51 980-653-479')} >Phone Number Sign In</Button>
    );
  }

  return (
    <>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={code} onChangeText={text => setCode(text)} placeholder="Confirm Code" />

      <WhiteSpace size="lg" />

      <Button onPress={confirmCode} >Confirm Code</Button>
    </>
  );
}

function onGoogleButtonPress() {

  GoogleSignin.signIn()
    .then((user) => {

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);

    })
    .then(() => {

      console.log('Signed in with Google!');

    })
    .catch((reason) => {

      console.error(reason);

    });

}





function signInWithEmailAndPassword () {
  auth()
    .signInWithEmailAndPassword('v090625712@gmail.com', 'react_native_007')
      .then(() => {
        console.log('User signIn');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });  
}


// function createUserWithEmailAndPassword() {
//   auth()
//     .createUserWithEmailAndPassword('v090625712@gmail.com', 'react_native_007')
//       .then(() => {
//         console.log('User account created & signed in!');
//       })
//       .catch(error => {
//         if (error.code === 'auth/email-already-in-use') {
//           console.log('That email address is already in use!');
//         }    
//         if (error.code === 'auth/invalid-email') {
//           console.log('That email address is invalid!');
//         }    
//         console.error(error);
//       });
// }


function signOut () {
  auth()
    .signOut()
    .then(() => console.log('User signed out!')); 
}

function signInAnonymously() {
  auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }   
      console.error(error);
    });
}

// Sign up with email
// Sign up with Apple
// Sign up with Facebook
// Sign up with google

function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    
    return auth().onAuthStateChanged(onAuthStateChanged);

  }, []);

  if (initializing) return null;

  console.log(user);

  if (!user) {
    return (
      <View>
        <Button onPress={signInAnonymously}>Login as Anonymous</Button>
        <WhiteSpace size="lg" />
        {/* <Button onPress={createUserWithEmailAndPassword}>CreateUser</Button>
        <WhiteSpace size="lg" /> */}
        <Button onPress={signInWithEmailAndPassword}>SignIn with Email</Button>
        <WhiteSpace size="lg" />
        <Button onPress={onGoogleButtonPress} >Google Sign-In</Button>
        <WhiteSpace size="lg" />
        <PhoneSignIn />

      </View>
    );
  }

  let nickname = '';

  if (user && user.isAnonymous) {
    nickname = 'Anonymous';
  } else if (user && user.email === 'bmxandcode@gmail.com') {
    nickname = 'Romel';
  } else if ( user ) {
    nickname = user.email || '';
  }

  return (
    <View>
      <Text>Welcome {nickname}</Text>
      <WhiteSpace size="lg" />
      <Button onPress={signOut}>SignOut</Button>
    </View>
  );
}


export default function App() {
  return (
    <View style={styles.container}>

      <LoginApp></LoginApp>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
