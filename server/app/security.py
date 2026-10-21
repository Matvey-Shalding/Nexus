from fastapi.security import HTTPBearer
from passlib.context import CryptContext

# password hasher

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# security handler(jwt token)

# oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login")

http_bearer = HTTPBearer()
