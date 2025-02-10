FROM openjdk:17-alpine

USER app
RUN mkdir /apps/bjs
ADD ./bha-api.jar /apps/bjs/

# Java 환경 설정
ENV JAVA_HOME /apps/jdk/17.0.2
ENV PATH $PATH:$JAVA_HOME/bin

USER root

RUN yum install -y fontconfig libfreetype6

CMD ["sh", "-c", "source /etc/profile &&  java -Dfile.encoding=UTF-8 -jar -Dserver.port=7101 /apps/bjs/bha-api.jar"]