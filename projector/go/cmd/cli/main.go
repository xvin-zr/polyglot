package main

import (
	projector "fem/projector/pkg/cli"
	"fmt"
	"log"
)

func main() {
	opts, err := projector.GetOpts()
	if err != nil {
		log.Fatalf("unable to get options %v\n", err)
	}

	config, err := projector.NewConfig(opts)
	if err != nil {
		log.Fatalf("unable to get config %v\n", err)
	}

	fmt.Printf("opts: %+v\n", config)

}
