#!/bin/bash

#
# https://www.instamobile.io/android-development/generate-react-native-release-build-android/
#

# 
#   [DEV] release
# 
#   keystore password: password123
#   
# 

keytool -genkey -v -keystore android/app/dev_release.keystore -alias develop -keyalg RSA -keysize 2048 -validity 10000
