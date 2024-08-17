import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Shared from '../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

const MarkFav = ({pet,color='black'}) => {
    const {user}=useUser();
    const [favList,setFavList]=useState();
    useEffect(()=>{
        GetFav();
    },[user])
    
    const GetFav =async ()=>{
        const result = await Shared.GetFaVList(user)
        setFavList(result.favourites?result.favourites:[])
    }

    const addToFav = async ()=>{
        const favResult = favList;
        favResult.push(pet.id);
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }

    const removeFromFav = async ()=>{
        const favResult= favList.filter(item=>item!=pet.id);
        await Shared.UpdateFav(user,favResult);
        GetFav();
    }

    return (
        <View>
            {favList?.includes(pet.id)?<Pressable  onPress={removeFromFav}>
                <Ionicons name="heart" size={30} color="red" />            
            </Pressable>:
            <Pressable onPress={()=>addToFav()} >
                <Ionicons name="heart-outline" size={30} color={color} />            
            </Pressable>}  
        </View>
    );
}

const styles = StyleSheet.create({})

export default MarkFav;
