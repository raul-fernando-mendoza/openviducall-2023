#to build first clone 
git clone https://github.com/raul-fernando-mendoza/openviducall-2023.git

cd openviducall-2023
#from the openviducall-2023 folder build the image mke sure is a one line ends with .
docker build -f ./docker/Dockerfile.node -t raxacademy:call --build-arg RELEASE_VERSION=1.0 .

#modify the file /opt/openvidu docker-compose.override.yaml to run the image generated: raxacademy:call
docker-compose.override.yaml

#restart the openvidu 
cd /opt/openvidu
./openvidu restart

########################## some useful commands

#to run a docker compose yaml
to run use
sudo docker-compose up


##this was a checkout from
git clone https://github.com/OpenVidu/openvidu-call.git

#use this version as is the last that compiles
git checkout a2438adc1baee1fdb2c97a5298071fe4c8a5724f



[![License badge](https://img.shields.io/badge/license-Apache2-orange.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![OpenVidu Tests](https://github.com/OpenVidu/openvidu/actions/workflows/openvidu-ce-test.yml/badge.svg)](https://github.com/OpenVidu/openvidu/actions/workflows/openvidu-ce-test.yml)
[![OpenVidu Tests](https://github.com/OpenVidu/openvidu/actions/workflows/openvidu-components-angular-E2E.yml/badge.svg)](https://github.com/OpenVidu/openvidu/actions/workflows/openvidu-components-angular-E2E.yml)
[![OpenVidu Tests](https://github.com/OpenVidu/openvidu-call/actions/workflows/openvidu-call-e2e-test.yml/badge.svg)](https://github.com/OpenVidu/openvidu-call/actions/workflows/openvidu-call-e2e-test.yml)

[![Documentation Status](https://readthedocs.org/projects/openvidu/badge/?version=stable)](https://docs.openvidu.io/en/stable/?badge=stable)
[![Docker badge](https://img.shields.io/docker/pulls/fiware/orion.svg)](https://hub.docker.com/r/openvidu/openvidu-call/)
[![Support badge](https://img.shields.io/badge/support-sof-yellowgreen.svg)](https://openvidu.discourse.group/)

[![][openvidulogo]](http://openvidu.io)

# openvidu-call

[openvidulogo]: https://secure.gravatar.com/avatar/5daba1d43042f2e4e85849733c8e5702?s=120

Visit [OpenVidu Call Documentation](https://openvidu.io/openvidu-call)
