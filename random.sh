#!/bin/bash

##############################
# 这是一个产生随机数的小脚本。
#
# 格式：
#
#     ./randome.sh [loop|l] [[[range|r] n1 n2] | [ -- 序列]]
#
# 如：
#
#     ./random.sh loop range 1 100
#     # 将不断地产生不小于1小于100的随机数
#
#     ./random.sh loop -- 1 1 2 3 4 5 6
#     # 随机产生1~6，但1的概率是其他的两倍
#
#     ./random.sh loop
#     # 从标准输入流读入若干行，随机出现某行
#
#     cat file | ./random.sh
#     # 随机输出file文件中的一行
##############################

work="run_once"

declare -i n ;

f_read=true ;

function print_array(){
    for(( i=0; i< n; i=i+1))
    do
        echo ${array[i]}
    done
}

function read_array(){
    for(( n=0; $? == 0 ; n=n+1 ))
    do
        read array[n]
    done
    n=$(($n-1));
}

function arg_to_array(){
    for(( n=0; $# >0 ; n=n+1))
    do
        array[n]=$1
        shift
    done
}

function range_array(){
    n=0
    for(( i=$2; i< $3; i=i+1))
    do
        array[$n]=$i
        n=$(($n+1))
    done
}

function load_config(){
    work="run_once"
    if [ "$1" == 'loop' ] || [ "$1" == 'l' ]; then
        work="run_loop"
        shift
    fi
    if [ "$1" == 'range' ] || [ "$1" == 'r' ]; then
        range_array $@
        return
    fi
    if [ "$1" == '--' ]; then
        shift
        arg_to_array $@
        return
    fi
    read_array
}

function run_once(){
    echo -n ${array[$(($RANDOM % $n))]}
}

function run_loop(){
    while [ true ]
    do
        run_once
        read
        if [ $? != '0' ]; then
            break
        fi
    done
}

load_config $@

$work
