

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer

# password hasher

bcrypt_context = CryptContext(schemes=['bcrypt'],deprecated="auto")
 
# security handler(jwt token) 

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login")
