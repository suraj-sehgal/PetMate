import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from './../../constants/Colors'
import { Link } from 'expo-router';

const UserItem = ({ userInfo }) => {
    return (
        <Link href={'/chat?id='+userInfo.docId}>
            <View style={{
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',

            }}>
                <Image source={{ uri: userInfo?.imageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 90,
                    }} />
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                }}>{userInfo?.name}</Text>
            </View>
            <View style={{
                borderWidth: 0.2,
                marginVertical:5,
                borderColor: Colors.GRAY
            }}></View>
        </Link>
    );
}

const styles = StyleSheet.create({})

export default UserItem;
