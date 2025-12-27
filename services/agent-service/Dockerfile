FROM python:3.11

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

ADD https://astral.sh/uv/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh
ENV PATH="/root/.local/bin/:$PATH"

WORKDIR /src

COPY pyproject.toml uv.lock .env ./

RUN uv sync

COPY app ./app

WORKDIR /src/app

ENV PATH="/src/.venv/bin:${PATH}"

ENV PYTHONPATH="/src/app"

EXPOSE $PORT

CMD [ "uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8083", "--reload" ]