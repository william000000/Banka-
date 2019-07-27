import db from "../db/table";

const result = {

    async create(req, res){
        const text = `insert into users values($1,$2,$3,$4) returning *`;

        const data = [
            req.body.firstName,
            req.body.lastName,
            req.body.password
        ];

        try{
            const {rows} = await db.query(text, data);
             return res.status(201).send(rows[0]);
             console.log(rows[0]);

        }catch(error){
            return res.status(400).send(error);
            console.log(error);
        }
    }
}

export default result;