import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,FlatList, Pressable, Alert } from 'react-native';
import { db } from '../../config/FirebaseCongig';
import PetListItem from './../../components/Home/PetListItem';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const UserPost = () => {
    const navigation = useNavigation();
    const {user} = useUser();
    const [userPostList,setUserPostList]= useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'User Post'
        });
        user&&GetUserPostList();
    },[user]);

    const GetUserPostList=async()=>{
        setLoader(true);
        setUserPostList([]);
        const q = query(collection(db,'Pets'),where('email','==',user?.primaryEmailAddress?.emailAddress));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setUserPostList(prev=>[...prev,doc.data()]);
        })
        setLoader(false);
    }

    const onDeletePost=async(docId)=>{
        Alert.alert('Confirm','Do you really want to delete this post',[
            {
                text:'Cancel',
                onPress:()=>console.log('Cancel Click'),
                style:'cancel'
            },
            {
                text:'Delete',
                onPress:()=>deletePost(docId),

            }
        ])
    }

    const deletePost =async (docId)=>{
        setLoader(true);
        await deleteDoc(doc(db,'Pets',docId));
        GetUserPostList();
        setLoader(false);
    }


    return (
        <View style={{
            padding:20
        }}>
            <FlatList 
                data={userPostList}
                numColumns={2}
                refreshing={loader}
                onRefresh={()=>GetUserPostList()}
                renderItem={({item,index})=>(
                    <View tyle={styles.container}>
                        <PetListItem pet={item} key={index} />
                        <Pressable onPress={()=>onDeletePost(item?.id)} style={styles.deleteButton} >
                            <Ionicons name="trash" size={24} color={Colors.GRAY} />
                        </Pressable>
                    </View>
                )}
            />
            {userPostList?.length==0 && <Text>No Post Found</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
    },
    deleteButton:{
        position:'absolute',
        bottom:10,
        right:70,
    }
})

export default UserPost;
