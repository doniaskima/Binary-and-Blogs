import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

export default {
  transport: {
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
      user: 'doniaskima202@gmail.com',
      pass: 'zbauywkttvdwasui',
    },
  },
  from: 'binaryandblogs@gmail.com',
  template: {
    dir: join(__dirname, '../templates/email/'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
