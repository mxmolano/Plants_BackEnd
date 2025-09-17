import app from './infraestructure/web/app';
import { ServerBostrap } from './infraestructure/boostrap/server-boostrap';
import {connectDB} from './infraestructure/config/data-base';

const serverBoostrap = new ServerBostrap(app);//serverBoostrap nombre de la declaracion de la variable
//server.init();
//Autoinvocacion para iniciar el servidor
(async () => {
    try {
        await connectDB();
        const instances = [serverBoostrap.init()];
        await Promise.all(instances);
    }catch(error){
        console.error("Error during server initialization", error);
        process.exit(1);
    }
}
)();