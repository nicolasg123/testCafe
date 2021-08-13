FROM debian:latest
ARG packageId

RUN echo "Installing Visual Interface (XVFB)"
RUN apt-get update > /dev/null && \
      apt-get -y install sudo > /dev/null

RUN apt-get -qq --assume-yes install procps > /dev/null
RUN apt-get -qq --assume-yes install wget > /dev/null
RUN apt-get -qq --assume-yes install xvfb xfonts-100dpi xfonts-75dpi xfonts-cyrillic xorg dbus-x11 > /dev/null
RUN apt-get -qq --assume-yes install curl > /dev/null
RUN apt-get -qq --assume-yes install fluxbox > /dev/null
RUN apt-get remove iceweasel > /dev/null
RUN apt-get --assume-yes install libgtk-3-0 libdbus-glib-1-2 libasound2 libgtk2.0-0 apt-utils > /dev/null



#RUN apk add --no-cache py-pip git openssh bash

RUN apt-get --assume-yes remove nodejs > /dev/null

RUN echo "Installing NODEJS"

RUN wget -qO- https://deb.nodesource.com/setup_10.x | bash - > /dev/null

RUN apt-get install -y nodejs build-essential  xvfb > /dev/null

RUN echo "Installing Chrome"

RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get -q --assume-yes install ./google-chrome-stable_current_amd64.deb > /dev/null

RUN apt-get --assume-yes install screen > /dev/null

RUN apt-get install unzip > /dev/null

RUN apt-get  -qq --assume-yes install default-jdk

ARG CACHEBUST=1

RUN rm -rf screenshots
RUN rm -rf logs
RUN rm -rf videos
RUN rm -rf logs
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN mkdir /tmp/.X11-unix
RUN chmod 1777 /tmp/.X11-unix
RUN chown root /tmp/.X11-unix/

ENV GID 1000
ENV UID 1000

RUN groupadd -r jenkins -g ${GID} \
 && useradd --create-home --shell /bin/bash -r -c "Jenklins service user" -u ${UID} -g jenkins jenkins

USER jenkins

WORKDIR /home/jenkins

RUN cd /home
RUN ls -la
RUN cd /home/jenkins
RUN ls -la

RUN mkdir screenshots
RUN chmod 777 screenshots