import {doc,getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "./../config/FirebaseCongig";

const GetFaVList = async (user) =>{
    const docSnap = await getDoc(doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress));
    if(docSnap?.exists()){
        return docSnap.data();
    }
    else{
        await setDoc(doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress),{
            email:user?.primaryEmailAddress?.emailAddress,
            favourites:[]
        })
    }
}

const UpdateFav=async(user,favourites)=>{
    const docRef=doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef,{
            favourites:favourites,
        })
    } catch (error) {
        
    }
}

export default {GetFaVList,UpdateFav};