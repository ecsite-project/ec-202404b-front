FROM almalinux:9
WORKDIR /app
RUN dnf update -y
RUN dnf groupinstall "Development tools" -y

RUN dnf module install nodejs:20 -y
RUN dnf -y install git

EXPOSE 4321

RUN cd /app &&\
    git clone https://github.com/ecsite-project/ec-202404b-front &&\
    cd ec-202404b-front &&\
    git switch docker &&\
    npm install &&\
    npm install @rollup/rollup-linux-x64-gnu --save-optional &&\
    npm run init &&\
    npm run build

WORKDIR /app/ec-202404b-front

CMD ["npm", "run", "start"]

