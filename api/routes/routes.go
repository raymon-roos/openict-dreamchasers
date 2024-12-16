package routes

import (
	"fmt"
	"net/http"
	"reflect"
	"regexp"
	"strings"

	"dreamchasers/routes/handlers"
)

type Route struct {
	Path     string
	FuncName string
	Func     func(http.ResponseWriter, *http.Request)
}

func ListHandlerMethods() []string {
	instance := handlers.Handler{}
	t := reflect.TypeOf(instance)

	var handlers []string
	for i := 0; i < t.NumMethod(); i++ {
		method := t.Method(i)
		handlers = append(handlers, method.Name)
	}

	return handlers
}

func ExecuteRouteHandler(routeList []Route, path string, w http.ResponseWriter, r *http.Request) {
	for _, route := range routeList {
		if route.Path != path || route.Func == nil || !strings.EqualFold(route.FuncName, r.Method+path) {
			continue
		}
		fmt.Print(r.Method + path + " | Execute\n")
		route.Func(w, r)

		return
	}
	w.WriteHeader(http.StatusNotFound)
}

// With handlers from "GetHandlers"
// Create a Router path: {Method}/{functionName}/{OptionalParameter?}
func GenerateRoutesFromHandlers(list []string) []Route {
	var routeList []Route

	re := regexp.MustCompile("([A-Z][a-z]*)")

	for _, handler := range list {
		route := Route{}
		parts := re.FindAllString(handler, -1)
		if len(parts) > 1 {
			route.Path = strings.ToLower(strings.Join(parts[1:], ""))
		} else {
			route.Path = handler
		}

		//      | 	--- Added this for my own sanity --- 	 |
		// 			| Objects that points to new instance of & | Returns reflect value as interface | Converts interface to * |
		route.Func = reflect.ValueOf(&handlers.Handler{}).MethodByName(handler).Interface().(func(http.ResponseWriter, *http.Request))
		route.FuncName = handler
		routeList = append(routeList, route)
	}

	return routeList
}
