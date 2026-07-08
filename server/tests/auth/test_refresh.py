async def test_refresh_valid_token_returns_200(setup_database, http_client):

    register_data = {
        "name": "mathew",
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    await http_client.post(
        url="/auth/register",
        json=register_data,
    )

    login_data = {
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    login_response = await http_client.post(
        url="/auth/login",
        json=login_data,
    )

    refresh_response = await http_client.post(
        url="/auth/refresh"
    )

    assert refresh_response.status_code == 200

    assert refresh_response.json()["token_type"] == "Bearer"

    assert "access_token" in refresh_response.json()


async def test_refresh_no_login_returns_401(setup_database, http_client):

    refresh_response = await http_client.post(
        url="/auth/refresh"
    )

    assert refresh_response.status_code == 401

    assert refresh_response.json() == {"detail": "User is not logged in."}


async def test_refresh_invalid_token_returns_401(setup_database, http_client):

    http_client.cookies.set("refresh_token", "invalid_token")

    refresh_response = await http_client.post(
        url="/auth/refresh"
    )

    assert refresh_response.status_code == 401


async def test_refresh_after_logout_returns_401(setup_database, http_client):

    register_data = {
        "name": "mathew",
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    await http_client.post(
        url="/auth/register",
        json=register_data,
    )

    login_data = {
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    await http_client.post(
        url="/auth/login",
        json=login_data,
    )

    await http_client.post(
        url="/auth/logout"
    )

    refresh_response = await http_client.post(
        url="/auth/refresh"
    )

    assert refresh_response.status_code == 401

async def test_logout_clears_refresh_token(setup_database, http_client):

    register_data = {
        "name": "mathew",
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    await http_client.post(
        url="/auth/register",
        json=register_data,
    )

    login_data = {
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    await http_client.post(
        url="/auth/login",
        json=login_data,
    )

    await http_client.post(
        url="/auth/logout"
    )

    assert "refresh_token" not in http_client.cookies


