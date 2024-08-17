import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from './../../config/FirebaseCongig'
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment';

const ChatScreen = () => {
    const params = useLocalSearchParams();
    const { user } = useUser();
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        GetUserDetails();

        const unsubscribe = onSnapshot(collection(db,'Chat',params?.id,'Messages'),(snapshot)=>{
            const messageData=snapshot.docs.map((doc)=>({
                _id:doc.id,
                ...doc.data()
            }));
            setMessages(messageData)
        });
        return ()=>unsubscribe();
    }, []);

    const GetUserDetails = async () => {
        const docRef = doc(db, 'Chat', params?.id);
        const docSnap = await getDoc(docRef);
        const result = docSnap.data();
        const otherUser = result?.users.filter(item => item.email != user?.primaryEmailAddress?.emailAddress);
        console.log(otherUser);
        navigation.setOptions({
            headerTitle: otherUser[0]?.name,
        })
    }

    const onSend =async (newMessage)=>{
        setMessages((prevMessage)=>GiftedChat.append(prevMessage,newMessage));
        newMessage[0].createdAt = moment().format('MM-DD-YYYY HH:mm:ss');
        await addDoc(collection(db,'Chat',params.id,'Messages'),newMessage[0])
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            showUserAvatar={true}
            user={{
                _id: user?.primaryEmailAddress?.emailAddress,
                name:user?.fullName,
                avatar:user?.imageUrl
            }}
        />
    );
}

const styles = StyleSheet.create({})

export default ChatScreen;
