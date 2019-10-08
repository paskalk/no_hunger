class Helper {

    
    constructor () {
        this.conn       = require ( '../../conn' );
    }


    async runSelect (query){
        conn.connect().then(function () {

            //var req = new sql.Request(conn);
            conn.query(query).then(function (recordset) {
                
                conn.close();
                
                response.header("Access-Control-Allow-Origin", "*");
                return response.json(recordset.recordsets[0]);
            })
                .catch(function (err) {
                    console.log(err);
                    conn.close();
                });
        })
        .catch(function (err) {
            console.log(err);
        });
    }



    encryptPin ( pan ="", pin="" ) {

        let encryptedPin = "";

        try {
            let pinToBase64  = this.toBase64 ( pan + pin );
            let encryptedPin = this.toShah512 ( pinToBase64, 'secret');
            return encryptedPin;
        } 
        catch ( e ) {
            
            return false;
        }
    }

     /**
     * toBase64 converts a string to base64
     * @param { string } payload 
     */
    toBase64 ( payload ) {
        let payloadToBase64 = new Buffer(payload).toString('base64');
        return payloadToBase64 ;
    }

    /**
     * 
     * @param {string} payload 
     */
    fromBase64 ( payload ) {
        let payloadFromBase64 = new Buffer( payload, 'base64').toString();
        return payloadFromBase64 ;
    }

    /**
     * toShah512 converts a string to shah512
     * @param { string } payload 
     */
    toShah512 ( payload, key ) {

        var hash = this.crypto.createHmac('sha512', key ) ;
        hash.update ( payload );
        var value = hash.digest( 'hex' );
        return value;

    }




}

module.exports = Helper;