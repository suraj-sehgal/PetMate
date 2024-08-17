import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import MarkFav from '../MarkFav';

const PetSubInfoCard = ({icon,title,value}) => {
    return (
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor: Colors.WHITE,
            padding:10,
            borderRadius:8,
            margin:5,
            gap:10,
            flex:1,
        }}>
            <Image  source={icon}
            style={{
                width:40,
                height:40
            }}/>
            <View style={{
                flex:1
            }}>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:16,
                    color:Colors.GRAY
                }}>{title}</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:16
                }}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default PetSubInfoCard;
