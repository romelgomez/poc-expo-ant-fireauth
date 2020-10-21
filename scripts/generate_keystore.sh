#!/bin/bash

# 
# To avoid Error: Missing keystore
# 
# ref: 
#  - https://stackoverflow.com/a/63064024/2513972
#  - https://github.com/jbreed/apkwash/blob/07f3fc4f50bb8207e77c2e792ceb15c6eacd2da5/apkwash#L295
#  - https://github.com/react-native-google-signin/google-signin/issues/706#issuecomment-527659860
# 

# It's already generate in the project
keytool -list -v -alias androiddebugkey -keystore android/app/debug.keystore -storepass android -keypass android


### Signing the package ###
# echo -e "\033[34m [-] \x1B[0m Checking for ~/.android/debug.keystore for signing"
# if [ ! -f android/app/debug.keystore ]; then
    # echo -e "\033[33m [-] \x1B[0m Debug key not found. Generating one now."
    # keytool -genkey -v -keystore ~/.android/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
# fi
