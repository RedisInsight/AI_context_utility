import { createClient } from 'redis';
import { getIndexContext } from '../RedisInsight/redisinsight/api/src/modules/ai/query/utils/context.util';
import { isNumber } from 'lodash';
import * as process from "node:process";
import { resolve } from 'path';
import { writeFileSync } from 'fs';

(async () => {
  try {
    const url = process.argv[2];
    const index = process.argv[3];
    const out = resolve(process.argv[4]);

    console.log(`
      Database: ${url}
      Index: ${index}
      Output: ${out}
    `)

    const nativeClient = createClient({url});
    nativeClient.on('error', err => console.log('Redis Client Error', err));
    await nativeClient.connect();

    const client = {
      sendCommand: async (args: string[], opts = {}) => {
        const strArgs = args.map((arg) => (isNumber(arg) ? arg.toString() : arg)) as string[];
        const command = [...strArgs.shift().split(' '), ...strArgs];
        return nativeClient.sendCommand(command, {returnBuffers: false})
      }
    }

    const context = await getIndexContext(client, index);

    writeFileSync(out, JSON.stringify(context))
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();