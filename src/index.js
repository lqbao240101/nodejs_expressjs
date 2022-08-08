const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const slugify = require('slugify');
const path = require('path');
const morgan = require('morgan');
const date = require('date-and-time')

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3000;

const routes = require('./routes'); //index.js
const db = require('./config/db');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(methodOverride('_method'));

//HTTP logger
app.use(morgan('combined'));

//Custom middlewares
app.use(SortMiddleware);

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            formatDate: (time) => {
                const format = date.format(time, 'YYYY/MM/DD HH:mm:ss');
                return format;
            },
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa fa-sort',
                    asc: 'fa fa-sort-asc',
                    desc: 'fa fa-sort-desc',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}" aria-hidden="true"></i>
            </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
routes(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
