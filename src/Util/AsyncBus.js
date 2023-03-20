import AsyncStorage from '@react-native-async-storage/async-storage';


class Async {

    SetLocalStorage = async (key,value) => {
        await AsyncStorage.setItem(key, value);
    }


    GetLocalStorage = async (key) => {
        let value  = await AsyncStorage.getItem(key)

        return value
    }

}

const AsyncBus = new Async();
export default AsyncBus;