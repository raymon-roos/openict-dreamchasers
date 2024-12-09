// Don't forget to remove all concept comments when done <(＿　＿)>
package https

import (
	"fmt"
	"reflect"
)

// ==== Structs ==== \\
type Handler struct{}

// ==== Functions ==== \\
func GetHandlers() {
	// Should get all functions from "https/handlers" | FOLDER not file

	// Filter out all non valid functions
	// - Name Format: {Method}+{WhatItDoes/Name}

	instance := Handler{}
	t := reflect.TypeOf(instance)
	fmt.Printf("%s | Hi this works I think?", t)
	//
	// -- list of all valid handlers
	// return handlers
}

func PathFromHandler() {
	// With handlers from "GetHandlers"
	// Create a Router path: {Method}/{functionName}/{OptionalParameter}

	// return path
}
