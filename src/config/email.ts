import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

export default {
  transport: {
    host: 'smtp.163.com',
    port: '465',
    auth: {
      user: 'doniaskima344@gmail.com',
      pass: 'PWFJMLSQVOBMQCQJ',
    },
  },
  from: 'doniaskima344@gmail.com',
  template: {
    dir: join(__dirname, '../templates/email/'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
