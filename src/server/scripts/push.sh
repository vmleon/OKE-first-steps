#!/bin/bash
echo "Push Docker image"
if [ $# -ne 3 ]
  then
    echo "Usage push <ocir-code> <tenancy-name> <x.y.z>"
    echo "<ocir-code>:       lhr, fra, zrh, iad, phx, ..."
    echo "<tenancy-name>:    OCI tenancy name"
    echo "<x.y.z>:           semver code"
fi
docker tag oke/server $1.ocir.io/$2/oke/server:$3
docker push $1.ocir.io/$2/oke/server:$3
