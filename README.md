# Back-End

AT CONTINUOUS INTEGRATION

[![Build Status](https://travis-ci.com/hafey1/nodeBackEnd.svg?branch=main)](https://travis-ci.com/hafey1/nodeBackEnd)
[![Coverage Status](https://coveralls.io/repos/github/hafey1/nodeBackEnd/badge.svg?branch=main)](https://coveralls.io/github/hafey1/nodeBackEnd?branch=main)
[![Maintainability](https://api.codeclimate.com/v1/badges/64b2ba3ff1fc556b083b/maintainability)](https://codeclimate.com/github/hafey1/nodeBackEnd/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/64b2ba3ff1fc556b083b/test_coverage)](https://codeclimate.com/github/hafey1/nodeBackEnd/test_coverage)
[![Build status](https://ci.appveyor.com/api/projects/status/n5e8vaja3j051dg4?svg=true)](https://ci.appveyor.com/project/hafey1/nodebackend)

## Continuous Integration Tools

[travis-ci](https://travis-ci.com/) is used for the base CI tool.
[coveralls](https://coveralls.io/) is used for tracking code coverage.
[AppVeyor](https://ci.appveyor.com/) is used for Windows versioning of CI.
[codeclimate](https://api.codeclimate.com/)

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