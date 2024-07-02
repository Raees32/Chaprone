import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Image,  KeyboardAvoidingView , ActivityIndicator,RefreshControl} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
const SignupScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      GoogleSignin.configure({
        androidClientId: '331296202567-sakspkfqucmtdb2v0a0rilbmf1iamatc.apps.googleusercontent.com',
        iosClientId: '331296202567-pbftv6o5vhg6jikjc0mg7k91er73nmcf.apps.googleusercontent.com',
      });
    }, []);
  
    const handleGoogleSignIn = async () => {
      setLoading(true);
      setError(null);
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        await AsyncStorage.setItem('userData', JSON.stringify(userInfo));
        
        // Extract user data
        const { email, name, photo } = userInfo.user;
        
        // Send user data to backend
        await fetch('192.168.0.140:3000/save-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, picture: photo }),
        });
    
        // Navigate to the next screen (e.g., Map)
        // navigation.navigate('Map');
      } catch (error) {
        console.log('Google sign-in error:', error);
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.code === 'DEVELOPER_ERROR') {
          errorMessage = 'Failed to sign in with Google. Please check your configuration.';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>CHAPERONE</Text>
          <View style={styles.container}>
            <Image source={require('./piks/logo.jpg')} style={styles.logo} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn} disabled={loading}>
            <View style={styles.buttonContainer}>
              <FontAwesome5 name="google" style={styles.arrow} />
              <Text style={styles.buttonText}>Sign In with Google</Text>
            </View>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text>Error: {error}</Text>}
          <Text style={styles.txt}>Introducing 'Chaperone' Companion with you. App that helps you find engaging company to pass the time with and discover like-minded individuals and make the most of your free moments together.</Text>
        </ScrollView>
        <View>
          <Text style={styles.botntitl}>POWERED BY AIONS &copy; 2023</Text>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 23,
      color: '#fff',
      backgroundColor: '#000000',
      textAlign: 'center',
      fontFamily: 'ProtestGuerrilla-Regular',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#000000',
      marginLeft: 10,
    },
    buttonContainer: {
      borderRadius: 7,
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      marginHorizontal: 50,
    },
    arrow: {
      fontSize: 22,
      color: 'blue',
    },
    button: {
      marginTop: 60,
      alignSelf: 'center',
    },
    logo: {
      width: 160,
      height: 160,
      alignSelf: 'center',
      marginTop: 90,
    },
    txt: {
      fontSize: 20,
      color: '#fff',
      backgroundColor: '#000000',
      padding: 7,
      textAlign: 'left',
      marginTop: 80,
      fontFamily: 'ProtestGuerrilla-Regular',
    },
    botntitl: {
      marginTop: 23,
      fontSize: 18,
      color: '#fff',
      backgroundColor: '#000000',
      textAlign: 'center',
      fontFamily: 'ProtestGuerrilla-Regular',
    },
  });
  
  export default SignupScreen;














  // import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import auth from '@react-native-firebase/auth';

// const SignupScreen = ({ navigation }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         GoogleSignin.configure({
//             webClientId: '1081879316662-fvu2pa5l0h821nii9ff66g0fg31jmodp.apps.googleusercontent.com',
          
//         });
//     }, []);

//     const handleGoogleSignIn = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             await GoogleSignin.hasPlayServices();
//             const { idToken } = await GoogleSignin.signIn();
//             const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//             await auth().signInWithCredential(googleCredential);
//             const userInfo = await GoogleSignin.getCurrentUser();
//             await AsyncStorage.setItem('userData', JSON.stringify(userInfo));

//             // Set user information to state
//             setUser(userInfo.user);

//             const { email, name, photo } = userInfo.user;

//             await fetch('http://172.18.64.1:3000/save-user', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, name, picture: photo }),
//             });

//             // Navigate to the next screen (e.g., Map)
//             // navigation.navigate('Map');
//         } catch (error) {
//             console.log('Google sign-in error:', error);
//             let errorMessage = 'An error occurred. Please try again later.';
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 errorMessage = 'User cancelled the login flow.';
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 errorMessage = 'Sign-in is in progress already.';
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 errorMessage = 'Play services not available or outdated.';
//             } else if (error.code === 'DEVELOPER_ERROR') {
//                 errorMessage = 'Failed to sign in with Google. Please check your configuration.';
//             }
//             setError(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={styles.container}>
//             <ScrollView style={styles.container}>
//                 <Text style={styles.title}>CHAPERONE</Text>
//                 <View style={styles.container}>
//                     <Image source={require('./piks/logo.jpg')} style={styles.logo} />
//                 </View>
//                 <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn} disabled={loading}>
//                     <View style={styles.buttonContainer}>
//                         <FontAwesome5 name="google" style={styles.arrow} />
//                         <Text style={styles.buttonText}>Sign In with Google</Text>
//                     </View>
//                 </TouchableOpacity>
//                 {loading && <ActivityIndicator size="large" color="#0000ff" />}
//                 {error && <Text>Error: {error}</Text>}
//                 {user && (
//                     <View style={styles.userInfo}>
//                         <Image source={{ uri: user.photo }} style={styles.profilePhoto} />
//                         <Text style={styles.userText}>Name: {user.name}</Text>
//                         <Text style={styles.userText}>Email: {user.email}</Text>
//                     </View>
//                 )}
//                 <Text style={styles.txt}>
//                     Introducing 'Chaperone' Companion with you. App that helps you find engaging company to pass the time with and discover like-minded individuals and make the most of your free moments together.
//                 </Text>
//             </ScrollView>
//             <View>
//                 <Text style={styles.botntitl}>POWERED BY AIONS &copy; 2023</Text>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 23,
//         color: '#fff',
//         backgroundColor: '#000000',
//         textAlign: 'center',
//         fontFamily: 'ProtestGuerrilla-Regular',
//     },
//     buttonText: {
//         fontWeight: 'bold',
//         fontSize: 14,
//         color: '#000000',
//         marginLeft: 10,
//     },
//     buttonContainer: {
//         borderRadius: 7,
//         padding: 8,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth: 1,
//         marginHorizontal: 50,
//     },
//     arrow: {
//         fontSize: 22,
//         color: 'blue',
//     },
//     button: {
//         marginTop: 60,
//         alignSelf: 'center',
//     },
//     logo: {
//         width: 160,
//         height: 160,
//         alignSelf: 'center',
//         marginTop: 90,
//     },
//     txt: {
//         fontSize: 20,
//         color: '#fff',
//         backgroundColor: '#000000',
//         padding: 7,
//         textAlign: 'left',
//         marginTop: 80,
//         fontFamily: 'ProtestGuerrilla-Regular',
//     },
//     botntitl: {
//         marginTop: 23,
//         fontSize: 18,
//         color: '#fff',
//         backgroundColor: '#000000',
//         textAlign: 'center',
//         fontFamily: 'ProtestGuerrilla-Regular',
//     },
//     userInfo: {
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     profilePhoto: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//     },
//     userText: {
//         fontSize: 18,
//         marginVertical: 5,
//     },
// });

// export default SignupScreen;
