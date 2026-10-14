from dotenv import load_dotenv

import os

class Config:
    load_dotenv()

    BOT_TOKEN = str(os.getenv("BOT_TOKEN"))

    BOT_ID = str(os.getenv("BOT_ID"))

    API_URL = str(os.getenv("API_URL"))

    BASE_URL = str(os.getenv("BASE_URL"))