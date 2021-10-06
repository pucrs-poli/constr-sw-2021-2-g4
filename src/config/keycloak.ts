import KcAdminClient from "@keycloak/keycloak-admin-client";
import { ENVIROMENT_VARIABLES } from './enviroment';

export const keycloak = new KcAdminClient({
    baseUrl: `http://${ENVIROMENT_VARIABLES.KEYCLOAK.HOST}:${ENVIROMENT_VARIABLES.KEYCLOAK.PORT}/auth`,
    realmName: `${ENVIROMENT_VARIABLES.KEYCLOAK.STANDARD_REALM}`

});