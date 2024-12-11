package https

import (
	"net/http"
	"reflect"
	"regexp"
	"strings"

	"dreamchasers/internal/https/handlers"
)

type Route struct {
	Path string
	Func func(http.ResponseWriter, *http.Request)
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
		if route.Path != path || route.Func == nil {
			continue
		} else {
			route.Func(w, r)

			// Not sure if this part is needed.
			w.WriteHeader(http.StatusOK)

			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
	return
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
			route.Path = parts[0] + "/" + strings.Join(parts[1:], "")
		} else {
			route.Path = handler
		}

		//      | 	--- Added this for my own sanity --- 	 |
		// 			| Objects that points to new instance of & | Returns reflect value as interface | Converts interface to * |
		route.Func = reflect.ValueOf(&handlers.Handler{}).MethodByName(handler).Interface().(func(http.ResponseWriter, *http.Request))
		routeList = append(routeList, route)
	}

	return routeList
}
