#!/bin/sh

a=0

while [ $a -lt 3 ]
do
	
	a=`expr $a + 1`
	dd if=/dev/urandom of=/s3/bucket-test/random$a.txt count=1048576 bs=1000
done
