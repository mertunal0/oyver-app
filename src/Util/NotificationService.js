import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    getFcmToken();
  }

const getFcmToken = async() => {
    const fcmToken = await messaging().getToken()
    global.fcmToken = fcmToken;
}

export const notificationListener = async(props, userData) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );

        
    });

    messaging().onMessage(async remoteMessage => {
        //!< recieved in foreground

    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
          //!< recieved in background
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );



        }
    });
}