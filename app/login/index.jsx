import React, { useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import  Colors  from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser'
import { useOAuth, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Redirect } from 'expo-router';

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }

  WebBrowser.maybeCompleteAuthSession()


const LoginScreen = () => {

    const {user}=useUser();

    console.log(user,"user")
    if(user){
        return <Redirect href={'/(tabs)/home'}/>
    }

    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  
    const onPress = useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
        })

        console.log("hello1",createdSessionId)
        if (createdSessionId) {   
            setActive({ session: createdSessionId })
        } else {
            return <Redirect href={'/login/'}/>
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error('OAuth error', err)
      }
    }, [])

    return (
        <View style={{
            backgroundColor:Colors.WHITE,
            height:'100%'
        }}>
            <Image
                style={{
                    width:'100%',
                    height:500,

                }} 
                source={require('./../../assets/images/pet-adopt.png')} />
            <View
                style={{
                    padding:20,
                    display:'flex',
                    alignItems:'center'
                }}
            >
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:30,
                    textAlign:'center'
                }}>
                    Ready to make a new friend?
                </Text>
                <Text
                    style={{
                        fontFamily:'outfit',
                        fontSize:18,
                        textAlign:'center',
                        color: Colors.GRAY,
                    }}
                >
                    Let's adopt the pet which you like and make their life happy again
                </Text>
                <Pressable
                onPress={onPress}
                style={{
                    padding:14,
                    marginTop:100,
                    backgroundColor:Colors.PRIMARY,
                    borderRadius:14,
                    width:'100%'
                }}>
                    <Text
                    style={{
                        fontFamily:'outfit-medium',
                        fontSize:20,
                        textAlign:'center'
                    }}>
                        Get Started
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default LoginScreen;
