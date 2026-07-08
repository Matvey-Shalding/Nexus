import pytest

from tests.helpers import register_user, login_user


@pytest.mark.parametrize(
    "updated_data",
    [
        {"name": "mathew1"},
        {"email": "mathew1@gmail.com"},
        {"name": "mathew1", "email": "mathew1@gmail.com"},
    ],
)
async def test_update_user_valid_data_returns_200(
    setup_database,
    http_client,
    updated_data,
):

    await register_user(http_client)

    access_token = await login_user(http_client)

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = await http_client.patch(
        "/users/me",
        headers=headers,
        json=updated_data,
    )

    assert response.status_code == 200

    response_data = response.json()

    assert response_data["id"]
    assert response_data["name"]
    assert response_data["email"]

    for key, value in updated_data.items():
        assert response_data[key] == value


async def test_update_user_duplicate_email_returns_409(
    setup_database,
    http_client,
):

    await register_user(
        http_client,
        email="andrew@gmail.com",
    )

    await register_user(
        http_client,
        email="mathew@gmail.com",
    )

    access_token = await login_user(
        http_client,
        email="mathew@gmail.com",
    )

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = await http_client.patch(
        "/users/me",
        headers=headers,
        json={
            "email": "andrew@gmail.com"
        },
    )

    assert response.status_code == 409

    assert response.json() == {
        "detail": "Such email already exists."
    }


@pytest.mark.parametrize(
    "name",
    [
        "v",
        "1234567890123456789045333",
    ],
)
async def test_update_user_invalid_name_returns_400(
    setup_database,
    http_client,
    name,
):

    await register_user(http_client)

    access_token = await login_user(http_client)

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = await http_client.patch(
        "/users/me",
        headers=headers,
        json={
            "name": name
        },
    )

    assert response.status_code == 400

    assert response.json() == {
        "detail": "Name length must be between 2 and 20 characters."
    }


@pytest.mark.parametrize(
    "email",
    [
        "mathew",
        "mathew@",
        "@gmail.com",
        "mathew@gmail",
    ],
)
async def test_update_user_invalid_email_returns_400(
    setup_database,
    http_client,
    email,
):

    await register_user(http_client)

    access_token = await login_user(http_client)

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = await http_client.patch(
        "/users/me",
        headers=headers,
        json={
            "email": email
        },
    )

    assert response.status_code == 400

    assert response.json() == {
        "detail": "Email address is invalid."
    }


async def test_update_user_no_token_returns_401(
    setup_database,
    http_client,
):

    response = await http_client.patch(
        "/users/me",
        json={
            "name": "mathew1"
        },
    )

    assert response.status_code == 401


async def test_update_user_invalid_token_returns_401(
    setup_database,
    http_client,
):

    response = await http_client.patch(
        "/users/me",
        headers={
            "Authorization": "Bearer invalid_token"
        },
        json={
            "name": "mathew1"
        },
    )

    assert response.status_code == 401