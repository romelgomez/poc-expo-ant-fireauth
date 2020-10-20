#!/bin/bash

# 
# Script to build and deploy in firebase hosting
# 
# ..:: https://firebase.google.com/docs/hosting/deploying?hl=es
# 

expo build:web

firebase deploy
