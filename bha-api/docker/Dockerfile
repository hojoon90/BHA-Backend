FROM openjdk:17-alpine

# app 사용자 생성
RUN adduser -D app
RUN mkdir -p /apps/bjs
RUN chown app:app /apps

# app 사용자로 디렉토리 생성
USER app

# bha-api.jar 파일을 /apps/bjs에 추가
ADD ./bha-api.jar /apps/bjs/

# root 사용자로 돌아가서 필요한 패키지 설치
USER root
RUN apk add --no-cache fontconfig freetype bash

# Java 환경 설정 (필요하면 주석을 제거하고 사용)
# ENV JAVA_HOME /apps/jdk/17.0.2
# ENV PATH $PATH:$JAVA_HOME/bin

# Java 애플리케이션 실행
CMD ["bash", "-c", "source /etc/profile && java -Dfile.encoding=UTF-8 -jar -Dserver.port=8080 /apps/bjs/bha-api.jar"]