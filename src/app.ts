import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import exphbs from 'express-handlebars';
import path from 'path';

// Import Routes
import authRoutesV1 from './routes/api/v1/auth-routes';
import indexWeb from './routes/web/index';
import usersWeb from './routes/web/users';

// Import SchemaGraphql
import { schema } from './schema/index';
import { isAuth } from './middlewares/auth';

// Initialize express
const app: Application = express();

// Configure express
declare global {
    namespace Express {
        export interface Request {
            user_id: any;
        }
    }
}


// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // Use the views folder
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); // Use the .hbs extension

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/graphql', [isAuth, graphqlHTTP((req, res) => ({ // Auth middleware () => { },
    schema: schema,
    graphiql: true,
    //rootValue: {
    // session: req.session,
    // myapi: axios.create({
    //     baseURL: 'https://myapi.net/api/',
    //     timeout: 1000,
    //     headers: { 'Authorization': req.session.access_token }å
    // })
    //}
    rootValue: {
        user_id: req.headers.user_id,
    }
}))]); // Use the graphql endpoint
app.use("/api/v1/auth", authRoutesV1);
app.use("/", indexWeb);
app.use("/users", usersWeb);


// Static files
app.use(express.static(path.join(__dirname, 'public'))); // Use the public folder


export default app;