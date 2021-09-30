import KcAdminClient from "@keycloak/keycloak-admin-client";

require('dotenv').config()

export const keycloak = new KcAdminClient({
    baseUrl: `http://${process.env.KEYCLOAK_HOST}:${process.env.KEYCLOAK_PORT}/auth`,
    realmName: `${process.env.KEYCLOACK_STANDARD_REALM}`

});