import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from './../../constants/Colors'
import MarkFav from '../MarkFav';

const PetInfo = ({pet}) => {

    return (
        <View>
            <Image source={{uri:pet?.imageUrl}} 
            style={{
                width:'100%',
                height:400,
            }}/>
            <View style={{
                padding:20,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
                <View>
                    <Text style={{
                        fontFamily:'outfit-bold',
                        fontSize:27,
                    }}>{pet?.name}</Text>
                    <Text style={{
                        fontFamily:'outfit',
                        fontSize:16,
                        color:Colors.GRAY
                    }}>{pet?.address}</Text>
                </View>
                <MarkFav pet={pet}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default PetInfo;
