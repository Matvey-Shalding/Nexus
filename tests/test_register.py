import json


async def test_register(setup_database, http_client):

    data = {"name": "mathew", "email": "mathew@gmail.com", "password": "1234567"}

    request = json.dumps(data)

    response = await http_client.post(url="/auth/register", json=data)

    print(response.json())

    assert response.status_code == 201
