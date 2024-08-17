import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Header = () => {
    const {user}= useUser();
    return (
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }}>
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:18
                }}
                >Welcome,</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:25,
                }}>{user?.fullName}</Text>
            </View>
            <Image source={{uri: user?.imageUrl}}
            style={{
                width:40,
                height:40,
                borderRadius:20,
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Header;