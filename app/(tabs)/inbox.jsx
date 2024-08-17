import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { collection,getDocs,query, where } from 'firebase/firestore';
import {db} from './../../config/FirebaseCongig';
import { useUser } from '@clerk/clerk-expo';
import UserItem from '../../components/Inbox/UserItem';
const Inbox = () => {
    const {user}=useUser();
    const [userList,setUserList]=useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(()=>{
        user&&GetUserList();
    },[])

    const GetUserList=async()=>{
        setLoader(true);
        setUserList([]);
        const q=query(collection(db,'Chat'),where('userIds','array-contains',user?.primaryEmailAddress.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setUserList(prev=>[...prev,doc.data()]);
        })
        setLoader(false);
    }

    const MapOtherUserList = ()=>{
        const list=[];
        userList.forEach((record)=>{
            const otherUser =record.users?.filter(User=>User?.email!=user?.primaryEmailAddress?.emailAddress);
            const result ={
                docId:record.id,
                ...otherUser[0]
            }
            list.push(result);
        })
        return list;
    }

    return (
        <View style={{
            padding:20,
            marginTop:20,
        }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:30
            }}>Inbox</Text>
            <FlatList 
            refreshing={loader}
            onRefresh={()=>GetUserList()}
            style={{marginTop:20}}
            data={MapOtherUserList()}
            renderItem={({item,index})=>(
                <UserItem userInfo={item} key={index} />
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Inbox;
