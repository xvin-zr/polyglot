import { type ProjectorOptions } from './opts';
import path from 'path';

export enum Operation {
    Print = 'PRINT',
    Add = 'ADD',
    Remove = 'REMOVE',
}

export type Config = {
    args: string[];
    operation: Operation;
    config: string;
    pwd: string;
};

function getPwd(opts: ProjectorOptions): string {
    if (opts.pwd) {
        return opts.pwd;
    }
    return process.cwd();
}

function getConfig(opts: ProjectorOptions): string {
    if (opts.config) {
        return opts.config;
    }

    const home = process.env['HOME'];
    const loc = process.env['XDG_CONFIG_HOME'] ?? home;
    if (!loc) {
        throw new Error('unable to determine config location');
    }

    if (loc === home) {
        return path.join(loc, 'projector.json');
    }

    return path.join(loc, 'projector', 'projector.json');
}

function getOperation(opts: ProjectorOptions): Operation {
    if (!opts.args || opts.args.length === 0) {
        return Operation.Print;
    }

    if (opts[0] === 'add') {
        return Operation.Add;
    }

    if (opts[0] === 'remove') {
        return Operation.Remove;
    }

    return Operation.Print;
}

function getArgs(opts: ProjectorOptions): string[] {
    if (!opts.args || opts.args.length === 0) {
        return [];
    }

    const operation = getOperation(opts);
    if (operation === Operation.Print) {
        if (opts.args.length > 1) {
            throw new Error(
                `expected 0 or 1 argument but got ${opts.args.length}`
            );
        }
        return opts.args;
    }

    if (operation === Operation.Add) {
        if (opts.args.length !== 3) {
            throw new Error(
                `expected 2 arguments but got ${opts.args.length - 1}`
            );
        }
        return opts.args.slice(1);
    }

    if (opts.args.length !== 2) {
        throw new Error(`expected 1 arguments but got ${opts.args.length}`);
    }
    return opts.args.slice(1);
}

export default function config(opts: ProjectorOptions): Config {
    return {
        pwd: getPwd(opts),
        config: getConfig(opts),
        args: getArgs(opts),
        operation: getOperation(opts),
    };
}
