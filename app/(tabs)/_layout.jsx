import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './../../constants/Colors'
const TabLayout = () => {
    return (
        <Tabs 
        screenOptions={{
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarInactiveTintColor: Colors.GRAY
        }}
        >
            <Tabs.Screen 
                name='home' 
                options={{
                    title:'Home',
                    headerShown: false,
                    tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />,
                }} />
            <Tabs.Screen 
                name='favourite' 
                options={{
                    title:'favourite',
                    headerShown: false,
                    tabBarIcon:({color})=><Ionicons name="heart" size={24} color={color} />
                }} />
            <Tabs.Screen 
                name='inbox'  
                options={{
                    title:'Inbox',
                    headerShown: false,
                    tabBarIcon:({color})=><Ionicons name="chatbubble" size={24} color={color} />
                }} />
            <Tabs.Screen 
                name='profile' 
                options={{
                    title:'Profile',
                    headerShown: false,
                    tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />,
                }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({})

export default TabLayout;
