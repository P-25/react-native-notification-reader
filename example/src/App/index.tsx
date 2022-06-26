import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    Text,
    Image,
    Button,
    AppState,
    View,
    FlatList,
    ScrollView,
} from 'react-native'
import RNAndroidNotificationListener from 'react-native-android-notification-listener'

import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from './styles'

let interval: any = null

interface INotificationProps {
    time: string
    app: string
    title: string
    titleBig: string
    text: string
    subText: string
    summaryText: string
    bigText: string
    audioContentsURI: string
    imageBackgroundURI: string
    extraInfoText: string
    icon: string
    image: string
    iconLarge: string
}

const Notification: React.FC<INotificationProps> = ({
    time,
    app,
    title,
    titleBig,
    text,
    subText,
    summaryText,
    bigText,
    audioContentsURI,
    imageBackgroundURI,
    extraInfoText,
    icon,
    image,
    iconLarge,
}) => {
    return (
        <View style={styles.notificationWrapper}>
            <View style={styles.notification}>
                <View style={styles.imagesWrapper}>
                    {!!icon && (
                        <View style={styles.notificationIconWrapper}>
                            <Image
                                source={{ uri: icon }}
                                style={styles.notificationIcon}
                            />
                        </View>
                    )}
                    {!!image && (
                        <View style={styles.notificationImageWrapper}>
                            <Image
                                source={{ uri: image }}
                                style={styles.notificationImage}
                            />
                        </View>
                    )}
                    {!!iconLarge && (
                        <View style={styles.notificationImageWrapper}>
                            <Image
                                source={{ uri: iconLarge }}
                                style={styles.notificationImage}
                            />
                        </View>
                    )}
                </View>
                <View style={styles.notificationInfoWrapper}>
                    <Text style={styles.textInfo}>{`app: ${app}`}</Text>
                    <Text style={styles.textInfo}>{`title: ${title}`}</Text>
                    <Text style={styles.textInfo}>{`text: ${text}`}</Text>
                    {!!time && (
                        <Text style={styles.textInfo}>{`time: ${time}`}</Text>
                    )}
                    {!!titleBig && (
                        <Text
                            style={
                                styles.textInfo
                            }>{`titleBig: ${titleBig}`}</Text>
                    )}
                    {!!subText && (
                        <Text
                            style={
                                styles.textInfo
                            }>{`subText: ${subText}`}</Text>
                    )}
                    {!!summaryText && (
                        <Text
                            style={
                                styles.textInfo
                            }>{`summaryText: ${summaryText}`}</Text>
                    )}
                    {!!bigText && (
                        <Text
                            style={
                                styles.textInfo
                            }>{`bigText: ${bigText}`}</Text>
                    )}
                    {!!audioContentsURI && (
                        <Text
                            style={
                                styles.textInfo
                            }>{`audioContentsURI: ${audioContentsURI}`}</Text>
                    )}
                    {!!imageBackgroundURI && (
                        <Text
                            style={
                                styles.textInfo
                            }>{`imageBackgroundURI: ${imageBackgroundURI}`}</Text>
                    )}
                    {!!extraInfoText && (
                        <Text
                            style={
                                styles.textInfo
                            }>{`extraInfoText: ${extraInfoText}`}</Text>
                    )}
                </View>
            </View>
        </View>
    )
}

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

    const handleCheckNotificationInterval = async () => {
        const lastStoredNotification = await AsyncStorage.getItem(
            '@lastNotification'
        )

        if (lastStoredNotification) {
            /**
             * As the notification is a JSON string,
             * here I just parse it
             */
            setLastNotification(JSON.parse(lastStoredNotification))
        }
    }

    useEffect(() => {
        clearInterval(interval)

        /**
         * Just setting a interval to check if
         * there is a notification in AsyncStorage
         * so I can show it in the application
         */
        interval = setInterval(handleCheckNotificationInterval, 3000)

        const listener = AppState.addEventListener(
            'change',
            handleAppStateChange
        )

        handleAppStateChange('', true)

        return () => {
            clearInterval(interval)
            listener.remove()
        }
    }, [])

    const hasGroupedMessages =
        lastNotification &&
        lastNotification.groupedMessages &&
        lastNotification.groupedMessages.length > 0

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonWrapper}>
                <Text
                    style={[
                        styles.permissionStatus,
                        { color: hasPermission ? 'green' : 'red' },
                    ]}>
                    {hasPermission
                        ? 'Allowed to handle notifications'
                        : 'NOT allowed to handle notifications'}
                </Text>
                <Button
                    title='Open Configuration'
                    onPress={handleOnPressPermissionButton}
                    disabled={hasPermission}
                />
            </View>
            <View style={styles.notificationsWrapper}>
                {lastNotification && !hasGroupedMessages && (
                    <ScrollView style={styles.scrollView}>
                        <Notification {...lastNotification} />
                    </ScrollView>
                )}
                {lastNotification && hasGroupedMessages && (
                    <FlatList
                        data={lastNotification.groupedMessages}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Notification
                                app={lastNotification.app}
                                {...item}
                            />
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default App
