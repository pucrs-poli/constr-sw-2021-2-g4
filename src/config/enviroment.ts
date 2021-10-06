import * as dotenv from 'dotenv';

dotenv.config();

export const ENVIROMENT_VARIABLES = {
    APPLICATION: {
        PORT: process.env.APPLICATION_PORT,
    },
    KEYCLOAK: {
        HOST: process.env.KEYCLOAK_HOST,
        STANDARD_REALM: process.env.KEYCLOACK_STANDARD_REALM,
        PORT: process.env.KEYCLOAK_PORT

    }
}