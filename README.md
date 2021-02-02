# Back-End

AT CONTINUOUS INTEGRATION

[![Build Status](https://travis-ci.com/hafey1/nodeBackEnd.svg?branch=main)](https://travis-ci.com/hafey1/nodeBackEnd)

## Scripts
Build and spin up server. Prestart script is automatically ran before.
```
    yarn start
```
Monitor files for changes during dev using nodemon.json config obj.
```
    yarn startdev
```
Style code using .prettierrc config file. Postpretty script (linting) is automatically called directly after.
```
    yarn pretty 
```
Testing
```
    yarn test
```