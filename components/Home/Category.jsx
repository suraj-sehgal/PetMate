import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { db } from '../../config/FirebaseCongig'; 
import { collection, getDocs } from "firebase/firestore";
import Colors from './../../constants/Colors'

const Category = ({category}) => {
    const [categories,setCategories]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState('Dogs')
    useEffect(()=>{
        GetCategoris();
    },[])

    const GetCategoris = async () => {
        setCategories([]);
        const querySnapshot = await getDocs(collection(db, "Category"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setCategories(categories => [...categories, doc.data()]);
        });
    }

    return (
        <View style={{
            marginTop:20
        }}>
           <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20
           }}>Category</Text> 
           <FlatList data={categories} numColumns={4} renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>{
                    setSelectedCategory(item.name);
                    category(item.name);
                }} style={{flex:1}}>
                    <View style={[styles.container,selectedCategory==item.name&&styles.selectedCategoryContainer]}>
                        <Image source={{uri:item?.imageUrl}} 
                        style={{
                            width:40,
                            height:40
                        }} />
                    </View>
                    <Text style={{
                        textAlign:'center',
                        fontFamily:'outfit'
                    }}>{item?.name}</Text>
                </TouchableOpacity>
           )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding:15,
        alignItems:'center',
        borderRadius:15,
        borderColor:Colors.PRIMARY,
        borderWidth:1,
        margin:5
    },
    selectedCategoryContainer:{
        backgroundColor: Colors.SECONDARY,
        borderColor: Colors.SECONDARY,
    }
})

export default Category;
