package main

import (
	projector "fem/projector/pkg/cli"
	"fmt"
	"log"
)

func main() {
	opts, err := projector.GetOpts()
	if err != nil {
		log.Fatalf("unable to get options %v", err)
	}

	fmt.Printf("opts: %+v\n", opts)

}
