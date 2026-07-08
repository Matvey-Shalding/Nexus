async def register_user(http_client, email="mathew@gmail.com"):
    data = {
        "name": "mathew",
        "email": email,
        "password": "1234567",
    }

    await http_client.post(
        url="/auth/register",
        json=data,
    )


async def login_user(http_client, email="mathew@gmail.com"):
    data = {
        "email": email,
        "password": "1234567",
    }

    response = await http_client.post(
        url="/auth/login",
        json=data,
    )

    return response.json()["access_token"]