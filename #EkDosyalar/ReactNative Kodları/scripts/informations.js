
export default class informations{
    //Sunucudan çekilen bilgiler dizilere kaydedilir
    static jop=[];//meslekler
    static blok=[];//bloklar
    static room=[];//odalar
    static setData(res){
        let jop,blok,room;
        jop=res["jop"];
        blok=res["blok"];
        room=res["room"];

        informations.changeData(jop,this.jop);
        informations.changeData(blok,this.blok);
        informations.changeData(room,this.room);
    }

    static changeData(res,array){
        for (let i=0; i<res.length; i++){
            array[res[i]]=res[i];
        }

    }

    static getJop(){
        return this.jop
    }
    static getBlok(){
        return this.blok
    }
    static getRoom(){
        return this.room
    }


}