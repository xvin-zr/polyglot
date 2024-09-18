import getConfig, { Operation } from './config';
import getOpts from './opts';
import { Projector } from './projector';

const opts = getOpts();
const config = getConfig(opts);
const proj = Projector.fromConfig(config);

if (config.operation === Operation.Print) {
    if (config.args.length === 0) {
        console.log(JSON.stringify(proj.getAllValue(), null, 2));
    } else {
        const value = proj.getValue(config.args[0]);
        if (value) {
            console.log(value);
        }
    }
}

if (config.operation === Operation.Add) {
    const [key, value] = config.args;
    proj.setValue(key, value);
    proj.save();
}

if (config.operation === Operation.Remove) {
    proj.removeValue(config.args[0]);
    proj.save();
}
