async def test_logout_valid_returns_200(setup_database, http_client):

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

    response = await http_client.post(
        url="/auth/logout"
    )

    assert response.status_code == 200

    assert "refresh_token" not in http_client.cookies