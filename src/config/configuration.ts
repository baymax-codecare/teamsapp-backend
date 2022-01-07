import { getMetadataArgsStorage } from 'typeorm';

export default () => {
  const isProd = process.env.NODE_ENV === 'production';
  const isDev = process.env.NODE_ENV === 'development';
  const isStaging = process.env.NODE_ENV === 'staging';

  return {
    isProd,
    isDev,
    isStaging,
    port: parseInt(process.env.APP_PORT, 10) || 3100,
    domain: process.env.APP_DOMAIN,
    webAppDomain: process.env.WEB_APP_DOMAIN,
    auth: {
      secret: process.env.AUTH_SECRET,
      expiresIn: +process.env.AUTH_EXPIRES_IN || 30 * 24 * 60 * 60, // 30 days
      azure: {
        clientId: process.env.AZURE_CLIENT_ID,
        tenantId: process.env.TEAMS_APP_TENANT_ID,
      },
    },
    typeorm: {
      type: 'postgres',
      host: process.env.TYPEORM_HOST || 'localhost',
      port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      logging: isDev ? ['query', 'error'] : ['error'],
      logger: 'advanced-console',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: false,
      autoLoadEntities: true,
    },
  };
};
