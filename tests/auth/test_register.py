import json

import pytest


async def test_register_valid_user_returns_201(setup_database, http_client):

    data = {"name": "mathew", "email": "mathew@gmail.com", "password": "1234567"}

    request = json.dumps(data)

    response = await http_client.post(url="/auth/register", json=data)

    print("response", response.json())

    assert response.status_code == 201

    # create user doesn't return anything

    assert response.json() == None


async def test_register_duplicate_email_returns_409(setup_database, http_client):

    data = {"name": "mathew", "email": "mathew@gmail.com", "password": "1234567"}

    request = json.dumps(data)

    await http_client.post(url="/auth/register", json=data)

    response = await http_client.post(url="/auth/register", json=data)

    assert response.status_code == 409

    assert response.json() == {"detail": "Such email already exists."}

@pytest.mark.parametrize("email",["mathew","mathew@","@gmail.com","mathew@gmail"])
async def test_register_invalid_email_returns_400(setup_database, http_client,email):

    data = {"name": "mathew", "email": email, "password": "1234567"}

    request = json.dumps(data)

    response = await http_client.post(url="/auth/register", json=data)

    assert response.status_code == 400

    assert response.json() == {"detail": "Email address is invalid."}


@pytest.mark.parametrize("password", ["12345", "1234567890123456789045333"])
async def test_register_invalid_password_returns_400(
    setup_database, http_client, password
):

    data = {"name": "mathew", "email": "mathew@gmail.com", "password": password}

    request = json.dumps(data)

    response = await http_client.post(url="/auth/register", json=data)

    assert response.status_code == 400

    assert response.json() == {
        "detail": "Password length must be between 6 and 20 characters."
    }


@pytest.mark.parametrize("name", ["", "1234567890123456789045333"])
async def test_register_invalid_name_returns_400(setup_database, http_client, name):

    data = {"name": name, "email": "mathew@gmail.com", "password": "1234567"}

    request = json.dumps(data)

    response = await http_client.post(url="/auth/register", json=data)

    assert response.status_code == 400

    assert response.json() == {
        "detail": "Name length must be between 2 and 20 characters."
    }
