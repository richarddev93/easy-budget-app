import { DatabaseConnection } from './conn';


const db = DatabaseConnection.getConnection();



/*data client [
    {
        field : 'name',
        value : 'richard'
    },
    {
        field : 'alias',
        value : 'ricard'
    },
    {
        field : 'phone',
        value : '11981743885'
    },
    {
        field : 'email',
        value : 'richardmachado.93@gmail.com'
    },
    {
        field : 'desc',
        value : 'richardmachado.93@gmail.com'
    },
]
    

}*/ 
export async function addData(table,data) {

    
    let fields = data.map( (item) =>  item.field ); 
    let valuesData = data.map( (item) => item.value ); 
     
    //retorna '?'
    let aux = prepareQuery(valuesData.length,"VALUES");
    
    let query = `insert into ${table} ( ${fields} )  values (${aux});`;

    const result = await new Promise((resolve, reject) => db.transaction(  tx  =>  {
          tx.executeSql(
            query,
            valuesData,
            (_, { rowsAffected })  => {
                if ( rowsAffected > 0) {
                    resolve( true );
                }else {
                    resolve( false);
                }
            }), (sqlError) => {
                console.log("error INSERT",sqlError);
            }}, (txError) => {
                console.log(txError);
            }
    ));
    return result;
}

export async function deleteById(table,id) {
    console.log("deleteid -",id)
    const result = await new Promise ((resolve,reject) => db.transaction(
        tx => {
            tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rowsAffected }) => {
                console.log(rowsAffected)
                if (rowsAffected >0){
                   resolve(true);
                }else {
                   resolve(false) 
                }
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        })
    );

    return result;
}

export async function updateById(table,data,id) {

    let fields = data.map( (item) => item.field  ); 
    let valuesData = data.map( (item) => item.value ); 


    let auxFields = prepareQuery(fields.length,"FIELDS",fields);
    let query = `update ${table} set ${auxFields} where id = ${id};`;
    
    const result = await new Promise((resolve, reject) =>db.transaction(tx => {
            tx.executeSql(query, valuesData, (_,{rowsAffected}) => {
                console.log(rowsAffected)
                if (rowsAffected > 0 ) {
                    resolve(true);
                }else {
                    resolve(false);
                }

            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));

    return result;
}

export async function findById  (id) {
    return  await new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
            resolve(rows)
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);

    }));
}

export async function  findAll(table) {
    return  await new Promise((resolve, reject) =>  db.transaction(tx => {
        tx.executeSql(`select * from ${table}`, [], (_, { rows :{ _array}}) => {
            resolve( _array);
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
         })
    )   
}

function prepareQuery(cont,key,data){
    let aux =[];
    
    switch (key) {
        case 'FIELDS':
            let fields = data.map(  (item) => {
                return item + " = ?" ;
            }); 

            aux.push(fields);
            
            break;
    
        default:
            for (let i = 0; i < cont; i++) {
                aux.push('?');
            }
            
            break;
    }
    

    return aux.toString();
}