#!/bin/sh

a=0

while [ $a -lt 1000 ]
do
	
	a=`expr $a + 1`
	#OUTPUT="$(dd if=/dev/urandom of=/s3/bucket-test/random$a.txt count=1024 bs=1)" 
	dd if=/dev/urandom of=/s3/bucket-test/random$a.txt count=1024 bs=5
done
