import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Shared from './../../Shared/Shared'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseCongig';
import PetListItem from '../../components/Home/PetListItem';

const Favourite = () => {
    const {user} = useUser();
    const [favIds,setFavIds]=useState([]);
    const [favPetList,setFavPetList]=useState([]);
    const [loader,setLoader]=useState(false);

    useEffect(()=>{
        user&&GetFavPetIds();
    },[])

    const GetFavPetIds = async ()=>{
        setLoader(true);
       setFavIds([]);
        const result = await Shared.GetFaVList(user);
        setFavIds(result?.favourites)     
        GetFavPetList(result?.favourites); 
        setLoader(false);  
    }

    console.log(favPetList);

    const GetFavPetList = async(favId_)=>{
        setLoader(true);
        setFavPetList([]);
        const q=query(collection(db,'Pets'),where('id','in',favId_));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            setFavPetList(prev=>[...prev,doc?.data()]);
            console.log(doc.data());
        })
        setLoader(false);
    }

    return (
        <View style={{
            padding:20,
            marginTop:20,
        }} onRefresh={()=>GetFavPetIds()}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:30,
            }}>Favourites</Text>
            <FlatList onRefresh={()=>GetFavPetIds()} refreshing={loader} numColumns={2} data={favPetList} renderItem={({item,index})=>(
                <View>
                    <PetListItem pet={item} />
                </View>
            )} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Favourite;
