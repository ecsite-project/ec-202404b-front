FROM almalinux:9
WORKDIR /app
RUN dnf update -y
RUN dnf groupinstall "Development tools" -y

RUN curl -O https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz &&\
    tar -xzvf jdk-17_linux-x64_bin.tar.gz &&\
    export PATH=$PATH:/app/jdk-17.0.11/bin
ENV JAVA_HOME /app/jdk-17.0.11

RUN dnf module install nodejs:20 -y
RUN dnf -y install git

RUN cd /app &&\
    git clone https://github.com/ecsite-project/ec-202404b-back.git &&\
    cd ec-202404b-back &&\
    git switch docker

WORKDIR /app/ec-202404b-back

CMD ["./gradlew", "bootRun"]

