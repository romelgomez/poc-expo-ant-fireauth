#!/bin/bash
# 
# The debug signing certificate is optional to use Firebase with your app, 
# but is required for Dynamic Links, Invites and Phone Authentication. 
# To generate a certificate run cd android && ./gradlew signingReport and 
# copy the SHA1 from the debug key. This generates two variant keys.
#  You can copy the 'SHA1' that belongs to the debugAndroidTest variant key option.
# 
# 
# ref: https://rnfirebase.io/#generating-android-credentials
# 
# 
#   It'll Required: Android SDK
# 
# - https://developer.android.com/studio
# - https://developer.android.com/studio/install
# 

if [ -z "$ANDROID_SDK_ROOT" ]; then

  echo "Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir "\
    "path in your project's local properties file at '/poc-expo-ant-fireauth/android/local.properties'"

else

  echo "ANDROID_SDK_ROOT="$ANDROID_SDK_ROOT

  (cd android && ./gradlew signingReport)

fi
