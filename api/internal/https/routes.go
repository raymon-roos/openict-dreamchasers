// Don't forget to remove all concept comments when done <(＿　＿)>
package https

import (
	"fmt"
	"reflect"

	"dreamchasers/internal/https/handlers"
)

// ==== Structs ==== \\

// ==== Functions ==== \\
func GetHandlers() []string {
	// Should get all functions from "https/handlers" | FOLDER not file

	// Filter out all non valid functions
	// - Name Format: {Method}+{WhatItDoes/Name}

	instance := handlers.Handler{}
	t := reflect.TypeOf(instance)

	var handlers []string
	for i := 0; i < t.NumMethod(); i++ {
		method := t.Method(i)
		handlers = append(handlers, method.Name)
		fmt.Printf("%s \n", handlers)
	}

	return handlers

	//
	// -- list of all valid handlers
	// return handlers
}

func PathFromHandler() {
	// With handlers from "GetHandlers"
	// Create a Router path: {Method}/{functionName}/{OptionalParameter}

	// return path
}
