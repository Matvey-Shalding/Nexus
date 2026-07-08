import pytest


async def test_login_valid_user_returns_200(setup_database, http_client):

    register_data = {
        "name": "mathew",
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    login_data = {
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    await http_client.post(
        url="/auth/register",
        json=register_data,
    )

    response = await http_client.post(
        url="/auth/login",
        json=login_data,
    )

    response_data = response.json()

    assert response.status_code == 200

    assert "access_token" in response_data
    assert response_data["token_type"] == "Bearer"

    assert "refresh_token" in response.cookies


async def test_login_invalid_password_returns_401(setup_database, http_client):

    register_data = {
        "name": "mathew",
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    login_data = {
        "email": "mathew@gmail.com",
        "password": "123456",
    }

    await http_client.post(
        url="/auth/register",
        json=register_data,
    )

    response = await http_client.post(
        url="/auth/login",
        json=login_data,
    )

    assert response.status_code == 401

    assert response.json() == {"detail": "Could not validate user."}

async def test_login_nonexisting_email_returns_401(setup_database, http_client):

    login_data = {
        "email": "mathew@gmail.com",
        "password": "1234567",
    }

    response = await http_client.post(
        url="/auth/login",
        json=login_data,
    )

    assert response.status_code == 401

    assert response.json() == {"detail": "Could not validate user."}