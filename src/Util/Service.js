import DeviceInfo from 'react-native-device-info';
import AsyncBus from './AsyncBus';


//var url = 'https://oyverapp2.azurewebsites.net/api';
var url = 'https://57e3-91-93-230-108.eu.ngrok.io/api';
//var url = 'https://oyverserver1232345547455341231.serveo.net/api'


export function serializeKey(data, UserId, TokenId, DeviceId, user?) {

    var formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody.push(encodeURIComponent('EmailAddress') + '=' + encodeURIComponent(DeviceId) );


    if (user === true) {

    } else {
        formBody.push(encodeURIComponent('UserId') + '=' + encodeURIComponent(UserId));
    }
 
    formBody.push(encodeURIComponent('TokenId') + '=' + encodeURIComponent(TokenId));
    formBody = formBody.join('&');
    return formBody;
}

class APIConnection {
    state = {response: []};


    generalService = async (tagUrl, requestJson) => {
        try
        {
            var r = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },

                body: serializeKey(requestJson, 0, 0, 0),
            };



            return await fetch(url + tagUrl, r)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.IsError) {
                        return responseJson.IsError;//return new AlertInfo("hata",true,null);
                    } else {
                        return responseJson.Data;
                    }

                });
        }
        catch(error)
        {
            console.log("hataaaa"+ error);
        }
    };

    generalServicePrivate = async (tagUrl, requestJson, user?) => {

        try {
            let UserId = user ? user : await AsyncBus.GetLocalStorage('UserId');
            let TokenId = await AsyncBus.GetLocalStorage('Token');
            let DeviceId = await AsyncBus.GetLocalStorage('DeviceId');
            if (UserId !== null && TokenId !== null) {
                var r = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },

                    body: serializeKey(requestJson, UserId, TokenId, DeviceId),
                };
                

                return await fetch(url + tagUrl, r)
                    .then(response =>  response.json()  )
                    .then(responseJson => {
                        if (responseJson.IsError) {
                            return responseJson.IsError;
                        } else {
                            return responseJson.Data;
                        }
                    });
            }else{
                return null;
            }

        }catch(error) {
            return null;
        }
    };

}

const API = new APIConnection();
export default API;
