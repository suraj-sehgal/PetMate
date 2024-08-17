import { useAuth, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const Profile = () => {
    const Menu = [
        {
            id:1,
            name:'Add New Pet',
            icon:'add-circle',
            path:'/add-new-pet'
        },
        {
            id:5,
            name:'My Post',
            icon:'bookmark',
            path:'/user-post'
        },
        {
            id:2,
            name:'Favourites',
            icon:'heart',
            path:'/(tabs)/favourite'
        },
        {
            id:3,
            name:'Inbox',
            icon:'chatbubble',
            path:'/(tabs)/inbox'
        },
        {
            id:4,
            name:'Logout',
            icon:'exit',
            path:'logout'
        },
    ]
    const {user}= useUser();
    const {signOut}=useAuth();
    const router=useRouter();

    const onPressMenu = (item)=>{
        if(item.path=='logout'){
            signOut();
            router.push('/login')
            return;
        }
        router.push(item.path);
    }

    return (
        <View style={{
            padding:20,
            marginTop:20,
        }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:30
            }}>Profile</Text>
            <View style={{
                display:"flex",
                alignItems:'center',
                marginVertical:25,
            }}>
                <Image source={{uri:user?.imageUrl}} 
                style={{
                    height:80,
                    width:80,
                    borderRadius:99
                }}/>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:20,
                    marginTop:6,
                }}>{user?.fullName}</Text>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:16,
                    color:Colors.GRAY
                }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
            <FlatList 
                data={Menu}
                renderItem={({item,index})=>(
                    <TouchableOpacity key={index}
                    onPress={()=>onPressMenu(item)}
                    style={{
                        marginVertical:10,
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        gap:10,
                        backgroundColor: Colors.WHITE,
                        padding:10,
                        borderRadius:10,
                    }}
                    >
                        <Ionicons name={item?.icon} size={30} color={Colors.PRIMARY} 
                        style={{
                            padding:10,
                            backgroundColor:Colors.LIGHT_PRIMARY,
                            borderRadius:10,
                        }}/>
                        <Text style={{
                            fontFamily:'outfit',
                            fontSize:20,
                        }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Profile;
