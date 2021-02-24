#!/bin/bash

for file in ./src/migrations/* 
    do babel-node $file 
done