# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10.0a6-alpine3.13


# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#adds files from your Docker client’s current directory.
COPY . .

# RUN apt-get update && apt install sudo
USER root

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

COPY ./entrypoint.sh .

RUN pip3 install --upgrade pip 
RUN pip3 install pipenv
# Install project dependencies
RUN pipenv install --skip-lock --system --dev
# RUN pip3 install psycopg2 --dev

# CMD waitress-serve --listen=*:${PORT} workoutorganizer.wsgi:application
# CMD gunicorn workoutorganizer.wsgi:application --bind 0.0.0.0:${PORT}
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]




