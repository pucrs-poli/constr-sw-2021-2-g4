
import server from "./server";
import { ENVIROMENT_VARIABLES } from './config/enviroment';


server.listen(ENVIROMENT_VARIABLES.APPLICATION.PORT, undefined);