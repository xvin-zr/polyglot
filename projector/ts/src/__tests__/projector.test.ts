import { Operation } from '../config';
import { Projector } from '../projector';

function getData() {
    return {
        projector: {
            '/': {
                foo: 'bar1',
                fem: 'is_great',
            },
            '/foo': {
                foo: 'bar2',
            },
            '/foo/bar': {
                foo: 'bar3',
            },
        },
    };
}

function getProjector(pwd: string, data = getData()): Projector {
    return new Projector(
        {
            args: [],
            operation: Operation.Print,
            pwd,
            config: 'Hello',
        },
        data
    );
}

test('get all value', function () {
    const proj = getProjector('/foo/bar');
    expect(proj.getAllValue()).toEqual({
        foo: 'bar3',
        fem: 'is_great',
    });
});

test('get value', function () {
    let proj = getProjector('/foo/bar');
    expect(proj.getValue('foo')).toEqual('bar3');

    proj = getProjector('/foo');
    expect(proj.getValue('foo')).toEqual('bar2');
    expect(proj.getValue('fem')).toEqual('is_great');
});

test('set value', function () {
    let proj = getProjector('/foo/bar');

    proj.setValue('foo', 'baz');
    expect(proj.getValue('foo')).toEqual('baz');

    proj.setValue('fem', 'is_better_than_great');
    expect(proj.getValue('fem')).toEqual('is_better_than_great');

    proj = getProjector('/');
    expect(proj.getValue('fem')).toEqual('is_great');
});

test('remove value', function () {
    const proj = getProjector('/foo/bar');

    proj.removeValue('fem');
    expect(proj.getValue('fem')).toEqual('is_great');

    proj.removeValue('foo');
    expect(proj.getValue('foo')).toEqual('bar2');
});
