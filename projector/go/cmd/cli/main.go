package main

import (
	"encoding/json"
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

	proj, err := projector.NewProjector(config)
	if err != nil {
		log.Fatalf("unable to read config file %v\n", err)
	}

	if config.Operation == projector.Print {
		if len(config.Args) == 0 {
			data := proj.GetAllValue()
			jsonStr, err := json.Marshal(data)
			if err != nil {
				log.Fatalf("this line should never be reached %v", err)
			}

			fmt.Printf("%v\n", string(jsonStr))
		} else if value, ok := proj.GetValue(config.Args[0]); ok {
			fmt.Printf("%v\n", value)
		}
	} else if config.Operation == projector.Add {
		proj.SetValue(config.Args[0], config.Args[1])
		proj.Save()
	} else if config.Operation == projector.Remove {
		proj.RemoveValue(config.Args[0])
		proj.Save()
	}

}
