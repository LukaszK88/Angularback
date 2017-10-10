#!/bin/bash

# 'what do you want?'
#echo $HOME --- home path

#pwd -- current working dir

#echo "value of pwd is $(pwd)"

#output=$(pwd)
#echo "${output}"

#echo "I saw $@ on comand line " #-- option for entering string

#echo "enter something : "
#read userInput  #---user input
#echo "you have entered ${userInput}"

#if [ -d /var/www/whitecompany ]; then
#    echo "file is there"
#else
#    echo "not there"
#fi

#echo "Do you love your boyfriend : "
#read userInput  #---user input
#if [ $userInput == "yes" ]; then
#    echo "are you sure?"
#else
#    echo "stop being difficult"
#fi

#for i in $(ls -1)
#do
#    echo "is $i"
#done
 echo -n Enter User Id:
    read userid
    echo -n "Enter Password for remote user:"
    read -s password
    hostname=`hostname`

    expect -c '
    enter code here
    spawn ssh ${userid}@'"$hostname"'
    expect "Password: "
    send '99999'
    expect "$ "
    send "pbrun su - tibco\r"
    expect "$ "
    send "exit\r"
    expect "$ "
    send "pbrun bash\r"
    expect "$ "
    send "ps -ef |grep apache\r"
    expect "$ "
    send "exit\r"