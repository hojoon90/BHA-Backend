FROM pkg.mtar.co.kr/base/java.app.env17:latest

USER app
RUN mkdir /pgms/calendar
ADD ./api.jar /pgms/calendar/

# Java 환경 설정
ENV JAVA_HOME /apps/jdk/17.0.2
ENV PATH $PATH:$JAVA_HOME/bin

USER root

RUN yum install -y fontconfig libfreetype6

CMD ["sh", "-c", "source /etc/profile &&  java -Dfile.encoding=UTF-8 -jar -Dserver.port=7101 /pgms/calendar/api.jar"]
#CMD ["sh", "-c", "source /etc/profile && cd /apps/scouter/2.15.0/agent.host && ./host.sh && java -javaagent:$JAVA_AGENT -Dscouter.config=$SCOUTER_CONF -Dobj_name=$SCOUTER_NAME -Dfile.encoding=UTF-8 --add-opens=java.base/java.lang=ALL-UNNAMED -Djdk.attach.allowAttachSelf=true -jar -Dserver.port=7101 /pgms/calendar/api.jar"]
