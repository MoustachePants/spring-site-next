export const env = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/flowresources',
  },
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;

export function validateEnv() {
  const required = ['MONGODB_URI'] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your .env file and make sure all required variables are set.'
    );
  }
}
