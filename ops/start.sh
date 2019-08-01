#!/bin/bash

kubectl create -f redis.yaml

pod_name=$(kubectl get po -l app=node-redis | grep app-with-redis | awk '{print $1}')

# check whether redis server is ready or not
while true; do
  pong=$(kubectl exec -it $pod_name -c redis redis-cli ping)
  if [[ "$pong" == *"PONG"* ]]; then
    echo ok;
    break
  fi
done

kubectl create -f server.yaml