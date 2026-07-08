from tests.helpers import register_user, login_user


async def test_user_valid_token_returns_200(setup_database, http_client):

    await register_user(http_client)

    access_token = await login_user(http_client)

    headers = {"Authorization": f"Bearer {access_token}"}

    response = await http_client.get(
        "/users/me",
        headers=headers,
    )

    assert response.status_code == 200

    response_data = response.json()

    assert "id" in response_data
    assert "name" in response_data
    assert "email" in response_data

    assert response_data["name"] == "mathew"
    assert response_data["email"] == "mathew@gmail.com"


async def test_user_no_token_returns_401(setup_database, http_client):

    response = await http_client.get("/users/me")

    assert response.status_code == 401


async def test_user_invalid_token_returns_401(setup_database, http_client):

    response = await http_client.get(
        "/users/me",
        headers={"Authorization": "Bearer invalid_token"},
    )

    assert response.status_code == 401
