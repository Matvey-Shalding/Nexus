from pydantic import BaseModel


class LinkResponse(BaseModel):
    link: str