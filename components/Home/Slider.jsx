import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/FirebaseCongig"

const Slider = () => {

    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        GetSliders();
    }, [])

    const GetSliders = async () => {
        setSliderList([]);
        const querySnapshot = await getDocs(collection(db, "Sliders"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setSliderList(sliderList => [...sliderList, doc.data()]);
        });

    }


    return (
        <View >
            <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={sliderList} renderItem={({ item,index }) => (
                <View>
                    <Image source={{ uri: item?.imageUrl }} style={styles?.sliderImage} />
                </View>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sliderImage: {
        width: Dimensions.get('screen').width * 0.85,
        height: 180,
        borderRadius: 15,
        marginRight: 15
    }
})

export default Slider;
