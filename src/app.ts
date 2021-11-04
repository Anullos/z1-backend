import express, {Application} from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

// Initialize express
const app: Application = express();

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
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes


// Static files
app.use(express.static(path.join(__dirname, 'public'))); // Use the public folder


export default app;