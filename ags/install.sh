#!/usr/bin/bash

cd types/@girs

for dir in ./*/
do
  cd "$dir"
  # Replace 'your-command' with the command you want to execute
  sudo npm -g i 
   
  cd ..
done
