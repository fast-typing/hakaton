FROM python:3.9

RUN mkdir /hakaton_app

WORKDIR /hakaton_app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN chmod a+x docker/*.sh


