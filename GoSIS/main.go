package main

import (
	"fmt"

	configs "GoSIS/config" // Import the models package
	"GoSIS/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	// Run database (assuming MongoDB)
	configs.ConnectMongoDB()

	// Run database (assuming SqlServer)
	configs.ConnectSqlServerDB()

	// Routes
	routes.GetRoute(app)

	fmt.Println("Hello world")
	app.Listen(":8080")
}
