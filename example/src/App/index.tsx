import React, { useState } from 'react'

import RNAndroidNotificationListener from 'react-native-android-notification-listener'


import styles from './styles'
import FullScreenForm from './fullScreen'


function App() {
    const [hasPermission, setHasPermission] = useState(false)
    const [lastNotification, setLastNotification] = useState<any>(null)

    const handleOnPressPermissionButton = async () => {
        /**
         * Open the notification settings so the user
         * so the user can enable it
         */
        RNAndroidNotificationListener.requestPermission()
    }

    

    const handleAppStateChange = async (
        nextAppState: string,
        force = false
    ) => {
        if (nextAppState === 'active' || force) {
            const status =
                await RNAndroidNotificationListener.getPermissionStatus()
            setHasPermission(status !== 'denied')
        }
    }


    return (
        <FullScreenForm handleOnPressPermissionButton={handleOnPressPermissionButton}/>
        // <SafeAreaView style={styles.container}>
        //         <TouchableOpacity 
        //         style={{ 
        //             borderWidth: 1, 
        //             borderColor: 'blue', 
        //             alignItems: 'center', 
        //             justifyContent: 'center', 
        //             width: 50, height: 50, 
        //             position: 'absolute', 
        //             bottom: 20, 
        //             right: 20,
        //             backgroundColor: 'blue', 
        //             borderRadius: 100, 
        //             zIndex: 100,
        //         }} 
        //         onPress={handleOnPressPermissionButton}
        //     > 
        //         <Text>Setting</Text>
        //     </TouchableOpacity> 
            
            
        // </SafeAreaView>
    )
}

export default App
