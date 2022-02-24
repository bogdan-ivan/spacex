import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import cors from 'cors'
import path from 'path'
const app = express();

// Allow cross origin
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname__,'public','index.html'));
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})