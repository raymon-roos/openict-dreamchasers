// Don't forget to remove all concept comments when done <(＿　＿)>
package https

import (
	"fmt"
	"reflect"
	"regexp"
	"strings"

	"dreamchasers/internal/https/handlers"
)

// ==== Structs ==== \\
type Route struct {
	FuncName string
	Path     string
}

// ==== Functions ==== \\
func GetHandlers() []string {
	instance := handlers.Handler{}
	t := reflect.TypeOf(instance)

	var handlers []string
	for i := 0; i < t.NumMethod(); i++ {
		method := t.Method(i)
		handlers = append(handlers, method.Name)
	}

	// fmt.Printf("%s \n", handlers)
	return handlers
}

func CallHandler() {
	//
}

// With handlers from "GetHandlers"
// Create a Router path: {Method}/{functionName}/{OptionalParameter?}
func PathFromHandler(list []string) []Route {
	var routeList []Route

	// - Not going to lie, this is stolen from Stack Overflow...
	for _, handler := range list {
		route := Route{}
		re := regexp.MustCompile("([A-Z][a-z]*)")
		parts := re.FindAllString(handler, -1)
		if len(parts) > 1 {
			route.Path = parts[0] + "/" + strings.Join(parts[1:], "")
		} else {
			route.Path = handler
		}

		route.FuncName = handler

		routeList = append(routeList, route)
	}

	fmt.Print(routeList)
	return routeList
}
