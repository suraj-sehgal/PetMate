import React from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import MarkFav from '../MarkFav';


const PetListItem = ({pet}) => {
    const router = useRouter();
    return (
        <TouchableOpacity 
         onPress={()=>router.push({
            pathname:'/pet-details',
            params:pet
         })}
         style={{
            padding:10,
            marginRight:15,
            backgroundColor: Colors.WHITE,
            borderRadius:10
        }}>
            <View style={{
                position:'absolute',
                zIndex:100,
                right:10,
                top:10
            }}>
                <MarkFav pet={pet} color={'white'}/>
            </View>
            <Image source={{uri:pet?.imageUrl}} 
            style={{
                objectFit:'cover',
                width:150,
                height:160,
                borderRadius:10,
            }}/>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:18,
            }}>{pet.name}</Text>
            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
                <Text style={{
                    color:Colors.GRAY,
                    fontFamily:'outfit'
                }}>{pet?.breed}</Text>
                <Text style={{
                    color:Colors.PRIMARY,
                    fontFamily:'outfit',
                    backgroundColor: Colors.LIGHT_PRIMARY,
                    fontSize:11,
                    borderRadius:5,
                }}>{pet?.age} YRS</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default PetListItem;
