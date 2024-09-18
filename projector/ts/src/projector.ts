import fs from 'fs';
import { Config } from './config';
import path from 'path';

export type Data = {
    projector: {
        // pwd
        [key: string]: // key -> value
        Record<string, string>;
    };
};

const defaultData = {
    projector: {},
} satisfies Data;

export class Projector {
    constructor(private config: Config, private data: Data) {}

    getAllValue(): Record<string, string> {
        let curr = this.config.pwd;
        let prev = '';

        const paths: string[] = [];
        do {
            prev = curr;
            paths.push(curr);
            curr = path.dirname(curr);

            /**
             * dirname / => /
             * dirname /qwe/asd => /qwe
             */
        } while (curr !== prev);
        return paths.reverse().reduce((acc, path) => {
            const value = this.data.projector[path];
            if (value) {
                Object.assign(acc, value);
            }
            return acc;
        }, {});
    }
    getValue(key: string): string | undefined {
        let curr = this.config.pwd;
        let prev = '';
        let out: string = undefined;
        do {
            const value = this.data.projector[curr]?.[key];
            if (value) {
                out = value;
                break;
            }

            prev = curr;
            curr = path.dirname(curr);

            /**
             * dirname / => /
             * dirname /qwe/asd => /qwe
             */
        } while (curr !== prev);

        return out;
    }
    setValue(key: string, value: string): void {
        let dir = this.data.projector[this.config.pwd];
        if (!dir) {
            this.data.projector[this.config.pwd] = {};
            dir = this.data.projector[this.config.pwd];
        }

        dir[key] = value;
    }
    removeValue(key: string): void {
        const dir = this.data.projector[this.config.pwd];
        if (dir) {
            delete dir[key];
        }
    }

    static fromConfig(config: Config): Projector {
        if (fs.existsSync(config.config)) {
            let data: Data;
            try {
                data = JSON.parse(fs.readFileSync(config.config).toString());
            } catch {
                data = defaultData;
            }
            return new Projector(config, data);
        }

        return new Projector(config, defaultData);
    }
}
