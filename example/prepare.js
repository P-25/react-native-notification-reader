const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')
const PACKAGE_PATH = path.resolve(__dirname, '../package')
const ANDROID_PATH = path.resolve(__dirname, '../package/android')
const NODE_MODULES_DEST_PATH = path.resolve(__dirname, 'node_modules')
const PACKAGE_DEST_PATH = path.resolve(__dirname, 'node_modules/react-native-android-notification-listener')
const ANDROID_DEST_PATH = path.resolve(__dirname, 'node_modules/react-native-android-notification-listener')

console.log('Preparing react-native-android-notification-listener...')
console.log(PACKAGE_PATH, PACKAGE_DEST_PATH)

function createPathIfNotExists(path) {
    return new Promise(resolve => {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }

        resolve()
    })
}

function executeAsync(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(err)
                reject()
                return
            }
        
            console.log(stdout)
            console.log(stderr)

            resolve()
        })
    })
}

;(async () => {
    try {
        await executeAsync(`rm -rf ${PACKAGE_DEST_PATH}`)
        await createPathIfNotExists(NODE_MODULES_DEST_PATH)
        await createPathIfNotExists(PACKAGE_DEST_PATH)
        await createPathIfNotExists(ANDROID_DEST_PATH)

        await executeAsync(`cp -r ${ANDROID_PATH} ${PACKAGE_DEST_PATH}`)
        await executeAsync(`cp -f ${PACKAGE_PATH}/index.js ${PACKAGE_DEST_PATH}/index.js`)
        await executeAsync(`cp -f ${PACKAGE_PATH}/index.d.ts ${PACKAGE_DEST_PATH}/index.d.ts`)
        await executeAsync(`cp -f ${PACKAGE_PATH}/package.json ${PACKAGE_DEST_PATH}/package.json`)
        await executeAsync(`cp -f ${PACKAGE_PATH}/yarn.lock ${PACKAGE_DEST_PATH}/yarn.lock`)
    } catch (err) {
        console.error(err)
    }
})()