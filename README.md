# MTL Test

## How to setup
1. Start with docker compose
   ```sh
   docker-compose up -d
   ```

2. Connect to mtl-backend docker
   ```sh
   docker exec -it mtl-backend /bin/sh
   ```

3. Migration database (inside mtl-backend container)
   ```sh
   node ace migration:run --force
   ```

4. Seed database (inside mtl-backend container)
   ```sh
   node ace db:seed
   ```

## Start
Open http://localhost:3001.

## Test user
- email: admin1@example.com / password: admin1
- email: admin2@example.com / password: admin2
- email: admin3@example.com / password: admin3
- email: admin4@example.com / password: admin4
- email: admin5@example.com / password: admin5

## How to run unit tests
1. Connect to mtl-backend docker
   ```sh
   docker exec -it mtl-backend /bin/sh
   ```

2. Run unit tests
   ```sh
   node ace test
   ```

## Postman
```javascript
{
	"info": {
		"_postman_id": "06a98ed1-6b36-46d9-a036-357423e687c9",
		"name": "MTL Test",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "264562"
	},
	"item": [
		{
			"name": "Auth",
			"item": [
				{
					"name": "Login",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"var jsonData = JSON.parse(responseBody);",
									"pm.collectionVariables.set(\"token\", jsonData.token);"
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "email",
									"value": "admin1@example.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "admin1",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{base_url}}/auth/login",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"auth",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "Logout",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/auth/logout",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"auth",
								"logout"
							]
						}
					},
					"response": []
				},
				{
					"name": "Me",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{base_url}}/auth/me",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"auth",
								"me"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Vote Items",
			"item": [
				{
					"name": "List",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{base_url}}/vote-items?page=1&limit=10",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"vote-items"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "10"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Detail",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{base_url}}/vote-items/1",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"vote-items",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "name",
									"value": "name",
									"type": "text"
								},
								{
									"key": "description",
									"value": "description",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{base_url}}/vote-items",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"vote-items"
							]
						}
					},
					"response": []
				},
				{
					"name": "Update",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "name",
									"value": "name1",
									"type": "text"
								},
								{
									"key": "description",
									"value": "description1",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "{{base_url}}/vote-items/1",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"vote-items",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{base_url}}/vote-items/1",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"vote-items",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "Clear",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/vote-items/clear",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"vote-items",
								"clear"
							]
						}
					},
					"response": []
				},
				{
					"name": "Vote",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/vote-items/1/vote",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"vote-items",
								"1",
								"vote"
							]
						}
					},
					"response": []
				}
			]
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": [
			{
				"key": "token",
				"value": "{{token}}",
				"type": "string"
			}
		]
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "base_url",
			"value": "http://localhost:3333/api/v1",
			"type": "string"
		},
		{
			"key": "token",
			"value": ""
		}
	]
}
```