package projector_test

import (
	projector "fem/projector/pkg/cli"
	"reflect"
	"testing"
)

func getOpts(args []string) *projector.ProjectorOpts {
	opts := projector.ProjectorOpts{
		Args:   args,
		Config: "",
		Pwd:    "",
	}
	return &opts
}

func testConfig(t *testing.T, args []string, expectedArgs []string, operation projector.Operation) {
	opts := getOpts(args)
	config, err := projector.NewConfig(opts)
	if err != nil {
		t.Errorf("expected to get no error %v", err)
	}

	if !reflect.DeepEqual(expectedArgs, config.Args) {
		t.Errorf("expected args to be %v but got %v", expectedArgs, config.Args)
	}

	if config.Operation != operation {
		t.Errorf("operation expected was %v but got %v", operation, config.Operation)
	}
}

func TestConfigPrint(t *testing.T) {
	testConfig(t, []string{}, []string{}, projector.Print)
}

func TestConfigPrintKey(t *testing.T) {
	testConfig(t, []string{"foo"}, []string{"foo"}, projector.Print)
}

func TestConfigAddKeyValue(t *testing.T) {
	testConfig(t, []string{"add", "foo", "bar"}, []string{"foo", "bar"}, projector.Add)
}

func TestConfigRemove(t *testing.T) {
	testConfig(t, []string{"remove", "foo"}, []string{"foo"}, projector.Remove)
}
