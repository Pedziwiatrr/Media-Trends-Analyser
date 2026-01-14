# Media-Trends-Analyser
Tool with Web App interface for scrapping media entries, analysing trends and evaluating it's impact on public opinion 

## Services dependencies managment

- agent-service
    ```sh
    cd services/agent-service
    export PYTHONPATH="$PWD:$PYTHONPATH"
    uv venv
    source .venv/bin/activate
    uv sync
    
    ```
