import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Pressable, ToastAndroid,ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db,storage } from '../../config/FirebaseCongig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

const AddNewPet = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({category: 'Dogs', sex:'Male'});
    const [gender, setGender] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [image, setImage] = useState(null);
    const [loader,setLoader]=useState(false);
    const {user}=useUser();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Pet'
        })
        GetCategoris();
    }, [])

    const GetCategoris = async () => {
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, "Category"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setCategoryList(categories => [...categories, doc.data()]);
        });
    }

    const handleInputChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmit =async () => {
        setLoader(true);
        if(Object.keys(formData).length!=8){
            ToastAndroid.show('Enter All Details',ToastAndroid.SHORT);
            return;
        }
        await uploadImage();
    }

    const uploadImage =async ()=>{
        const resp = await fetch(image);
        const blobImage = await resp.blob();
        const storageRef = ref(storage,'/pet-mate/'+Date.now()+'.jpg');

        uploadBytes(storageRef,blobImage).then((snapshot)=>{
            console.log('File Uploaded');
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                SaveFormData(downloadUrl);
            })
        })
    }

    const SaveFormData =async (imageUrl)=>{
        const docId=Date.now().toString();
        await setDoc(doc(db,'Pets',docId),{
            ...formData,
            imageUrl:imageUrl,
            username:user?.fullName,
            email:user?.primaryEmailAddress?.emailAddress,
            userImage:user?.imageUrl,
            id:docId
        })
        setLoader(false);
        router.replace('/(tabs)/home');
    }


    return (
        <ScrollView style={{
            padding: 20,
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
            }}>Add New Pet for adoption</Text>
            <Pressable onPress={pickImage}>
                {!image?<Image source={require('./../../assets/images/placeholder.png')}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: Colors.GRAY
                    }}
                />:
                <Image source={{uri:image}}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: Colors.GRAY
                    }}
                />
                }
            </Pressable>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Name *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Category</Text>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedCategory(itemValue);
                        handleInputChange('category', itemValue);
                    }}>
                    {categoryList?.map((category, index) => (<Picker.Item key={index} label={category?.name} value={category?.name} />))}
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Breed *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('breed', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Age *</Text>
                <TextInput keyboardType='number-pad' style={styles.input} onChangeText={(value) => handleInputChange('age', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender</Text>
                <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => {
                        setGender(itemValue);
                        handleInputChange('sex', itemValue);
                    }}>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Weight *</Text>
                <TextInput keyboardType='number-pad' style={styles.input} onChangeText={(value) => handleInputChange('weight', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('address', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>About *</Text>
                <TextInput multiline={true} numberOfLines={5} style={styles.input} onChangeText={(value) => handleInputChange('about', value)} />
            </View>

            <TouchableOpacity disabled={loader} onPress={onSubmit} style={styles.button}>
                {loader?<ActivityIndicator size={'large'}/> : <Text style={{ fontFamily: 'outfit-medium', textAlign: 'center' }}>Submit</Text>}
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5,
        gap: 5,
    },
    input: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        fontFamily: 'outfit'
    },
    label: {
        marginVertical: 5,
        fontFamily: 'outfit',
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 7,
        marginVertical: 10,
        marginBottom: 50,
    }
})

export default AddNewPet;
