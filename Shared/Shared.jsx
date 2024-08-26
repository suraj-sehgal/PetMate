import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./../config/FirebaseCongig";

const GetFaVList = async (user) => {
    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
    const docSnap = await getDoc(docRef);
    if (docSnap?.exists()) {
        const data = docSnap.data();
        if (!Array.isArray(data?.favourites)) {
            // Handle unexpected data structure by initializing the favourites field
            await updateDoc(docRef, { favourites: [] });
            return { ...data, favourites: [] };
        }
        return data;
    }
    else {
        const temp = await setDoc(docRef, {
            email: user?.primaryEmailAddress?.emailAddress,
            favourites: []
        });
        return { email: user?.primaryEmailAddress?.emailAddress, favourites: [] };
    }
}

const UpdateFav = async (user, favourites) => {
    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, { favourites: favourites });
        console.log('Favourites updated successfully');
    } catch (error) {
        console.log('Error updating favourites:', error);
    }
}

export default { GetFaVList, UpdateFav };