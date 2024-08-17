import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const OwnerInfo = ({ pet }) => {
    return (
        <View style={styles.container}>
            <View style={{
                display:'flex',
                flexDirection:'row',
                gap:20,
                alignItems:'center'
            }}>
                <Image source={{ uri: pet?.userImage }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99,
                    }} />
                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 17
                    }}>{pet?.username}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: Colors.GRAY,
                    }}>Pet Owner</Text>
                </View>
            </View>
            <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        gap: 20,
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        backgroundColor: Colors.WHITE,
        borderColor:Colors.PRIMARY,
    }
})

export default OwnerInfo;
