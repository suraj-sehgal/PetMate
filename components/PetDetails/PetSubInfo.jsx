import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import PetSubInfoCard from './PetSubInfoCard';

const PetSubInfo = ({pet}) => {
    const [readMore,setReadMore]=useState(true);
    return (
        <View style={{
            padding:20
        }}>
            <View style={{
                display:'flex',
                flexDirection:'row',
            }}>
                <PetSubInfoCard icon={require('./../../assets/images/calender.png')} title={"Age"} value={pet?.age+" Years"} />
                <PetSubInfoCard icon={require('./../../assets/images/bone.png')} title={"Breed"} value={pet?.breed}/>
            </View>
            <View style={{
                display:'flex',
                flexDirection:'row',
            }}>
                <PetSubInfoCard icon={require('./../../assets/images/sex.png')} title={"Sex"} value={pet?.sex} />
                <PetSubInfoCard icon={require('./../../assets/images/weight.png')} title={"Weight"} value={pet?.weight+" Kg"}/>
            </View>
            <View >
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20,
                }}>About {pet?.name}</Text>
                <Text numberOfLines={readMore?3:20} style={{
                    fontFamily:'outfit',
                    fontSize:14
                }}>{pet?.about}</Text>
                {readMore&&<Pressable onPress={()=>setReadMore(false)}>
                    <Text style={{
                        fontFamily:'outfit-medium',
                        fontSize:14,
                        color:Colors.SECONDARY,
                    }}>Read More</Text>
                </Pressable>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default PetSubInfo;
