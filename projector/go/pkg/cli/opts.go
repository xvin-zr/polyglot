package projector

import "github.com/hellflame/argparse"

type ProjectorOpts struct {
	Args   []string
	Config string
	Pwd    string
}

func GetOpts() (*ProjectorOpts, error) {
	parser := argparse.NewParser("projector", "gets all the values", &argparse.ParserConfig{
		DisableDefaultShowHelp: true,
	})

	args := parser.Strings("a", "args", &argparse.Option{
		Positional: true,
		Required:   false,
		Default:    "",
	})

	config := parser.String("c", "config", &argparse.Option{
		Required: false,
		Default:  "",
	})

	pwd := parser.String("p", "pwd", &argparse.Option{
		Required: false,
		Default:  "",
	})

	err := parser.Parse(nil)
	if err != nil {
		return nil, err
	}

	return &ProjectorOpts{
		Args:   *args,
		Config: *config,
		Pwd:    *pwd,
	}, err
}
