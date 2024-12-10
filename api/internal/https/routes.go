// Don't forget to remove all concept comments when done <(＿　＿)>
package https

import (
	"fmt"
	"net/http"
	"reflect"
	"regexp"
	"strings"

	"dreamchasers/internal/https/handlers"
)

type Route struct {
	Path     string
	FuncName string
	Func     func(http.ResponseWriter, *http.Request)
}

func GetHandlers() []string {
	instance := handlers.Handler{}
	t := reflect.TypeOf(instance)

	var handlers []string
	for i := 0; i < t.NumMethod(); i++ {
		method := t.Method(i)
		handlers = append(handlers, method.Name)
	}

	return handlers
}

func CallHandler(routeList []Route, path string, w http.ResponseWriter, r *http.Request) {
	for _, route := range routeList {
		if route.Path == path {
			if route.Func != nil {
				route.Func(w, r)
			} else {
				fmt.Printf("No function found for path: %s\n", path)
			}
			return
		}
	}
	fmt.Printf("Route not found for path: %s\n", path)
}

// With handlers from "GetHandlers"
// Create a Router path: {Method}/{functionName}/{OptionalParameter?}
func PathFromHandler(list []string) []Route {
	var routeList []Route
	re := regexp.MustCompile("([A-Z][a-z]*)")

	for _, handler := range list {
		route := Route{}
		parts := re.FindAllString(handler, -1)
		if len(parts) > 1 {
			route.Path = parts[0] + "/" + strings.Join(parts[1:], "")
		} else {
			route.Path = handler
		}

		route.FuncName = handler
		//      | 	--- Added this for my own sanity --- 	 |
		// 			| Objects that points to new instance of & | Returns reflect value as interface | Converts interface to * |
		route.Func = reflect.ValueOf(&handlers.Handler{}).MethodByName(handler).Interface().(func(http.ResponseWriter, *http.Request))
		routeList = append(routeList, route)
	}

	fmt.Print(routeList)
	return routeList
}
