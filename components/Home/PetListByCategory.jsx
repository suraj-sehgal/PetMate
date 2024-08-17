import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import Category from './Category';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../config/FirebaseCongig"
import PetListItem from './PetListItem';



const PetListByCategory = () => {
    const [petList, setPetList] = useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(()=>{
        GetPetList('Dogs')
    },[])
    const GetPetList = async (category) => {
        setLoader(true);
        setPetList([]);
        const q = query(collection(db,'Pets'),where('category','==',category))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setPetList(petList => [...petList, doc.data()]);
        });
        setLoader(false);
    }
    return (
        <View style={{gap:15}}>
            <Category category={(value)=>GetPetList(value)}/>
            <FlatList
                data={petList}
                horizontal={true}
                refreshing={loader}
                onRefresh={()=>GetPetList('Dogs')}
                renderItem={({item,index})=>(
                    <PetListItem pet={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default PetListByCategory;
