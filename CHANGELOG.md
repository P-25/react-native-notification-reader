# Changelog

## v5.0.1

### Fixes

* Error on install dependencies using NPM
* Closes https://github.com/leandrosimoes/react-native-android-notification-listener/issues/47

## v5.0.0

### Fixes

* Error on build in RN 0.69+
* Closes https://github.com/leandrosimoes/react-native-android-notification-listener/issues/44

### Enhancements

* Example project now uses RN 0.69.0

## v4.1.0

### Fixes

* New RN version compiling exceptions
    - Closes https://github.com/leandrosimoes/react-native-android-notification-listener/issues/42

### Changes

* Example project RN dependency updated to 0.68.1

### Breaking changes

* RN peer dependency updated to 0.68.1
* Gradle version must be greater than or equal 7.0.0

## v4.0.2

### Fixes

* Fix Gradle 7.0 breaking changes

## v4.0.1

### Fixes

* Fixed missing README on npm

### Enhancements

* Linting improvements
* Now example project also is written in typescript

## v4.0.0

### Enhancements

* Improved project folders structure
* Now the example project has a prepare.js file used to set up the project for testing. Just follow [this](https://github.com/leandrosimoes/react-native-android-notification-listener/blob/master/example/README.md) instructions

### Breaking Changes

* RN peer dependency updated to 0.65.1
* Also updated example project RN's version

## v3.1.2

### Fixes

* The extra key `EXTRA_SMALL_ICON` is deprecated and because of that was unable to build the project so this key was removed.

### Enhancements

* Added support for large icon
    - This feature closes https://github.com/leandrosimoes/react-native-android-notification-listener/issues/21

### Thanks for helping

@arunahuja94

## v3.1.1

### Fixes

* Fixed `groupedMessages` being passed always empty to the notification listener

### Thanks for helping

@arunahuja94

## v3.1.0

### Enhancements

* Add `time`, `icon`, and `image` properties to the notification payload
    - NOTE 1: The `image` may not work for some apps such as Telegram and WhatsApp
    - NOTE 2: The `icon` and `image` is passed as base64 string

## v3.0.0

### Enhancements

* Add more properties to the notification payload. You can see all of them in the documentation [here](https://github.com/leandrosimoes/react-native-android-notification-listener).

### Breaking Changes

Now the notification received by the handler function was changed to a JSON string payload so before using you must do `JSON.parse`. You can see more in the documentation [here](https://github.com/leandrosimoes/react-native-android-notification-listener).

### Thanks for helping

@arunahuja94

## v2.0.0

### Enhancements

* Add Headless JS service to avoid the notification listener to be killed by Android
* Add Boot Up Receiver to restart the service in case the user reboots the device as soon the OS restart
* Add index.d.ts to provide some typings

### Breaking changes

* Removed the method `onNotificationReceived` because now the handle must be made using the `AppRegistry`. (See the documentation [here](https://github.com/leandrosimoes/react-native-android-notification-listener))

### Thanks for helping

@jehartzog

## v1.0.4

### Fixes

* Fixed some java syntax error about missing comma
* Fixed crashing application on Android 8+
    - Closes https://github.com/leandrosimoes/react-native-android-notification-listener/issues/1

### Thanks for helping

@qsdamar

## v1.0.3

### Fixes

* Fix crashing application on receiving notification

## v1.0.2

### Enhancements

* Add publishing with GitHub Actions

## v1.0.0

* First version
