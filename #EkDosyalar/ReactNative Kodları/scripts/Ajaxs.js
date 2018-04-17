
import {serializeKey} from "./serializeKey";
import informations from "./informations";
import {AsyncStorage} from "react-native";
import AdminPanel from "../activitys/AdminPanel_Directory/AdminPanel";
import GetMalfunction from "../activitys/AdminPanel_Directory/GetMalfunctions";
import GetMalfunction_Panel from "../activitys/Panel_Directory/GetMalfunctions_Panel";
import GetPersons from "../activitys/AdminPanel_Directory/GetPersons";
import ChangePassword from "../activitys/AdminPanel_Directory/ChangePassword";
import ChangePassword_Panel from "../activitys/Panel_Directory/ChangePassword_Panel";
import AddPerson from "../activitys/AdminPanel_Directory/AddPerson";
import Links from "./Links"

const progressTime = 1000;

export default class Ajaxs{


    constructor(p){
        props=p;
    }


    static startProgres(title, message){//ProgressDialogu açar
        props.setState({progressVisible:true,progressTitle:title,progressMessage:message});
    }
    static stopProgres(){//ProgressDialogu kapatır
        props.setState({progressVisible:false,progressTitle:"",progressMessage:""});
    }
    static updateProgres(title, message){//ProgressDialogu günceller
        props.setState({progressTitle:title,progressMessage:message});
    }


    static Error(err){
        //Bi hata var ise hata mesajı verir
        Ajaxs.updateProgres("Bir Sorun Oluştu\n"+err,"Tekrar Deneyin...");
        console.warn("Bir Sorun Oluştu\n"+err,"Tekrar Deneyin...");
        setTimeout(function(){
            Ajaxs.stopProgres();
        }, progressTime);
    }

    tcquery(tcNo,year,name,surname){//kimlik sorgulama

        Ajaxs.startProgres("Kimlik Sorgulama","Lütfen Bekleyin...");

        fetch(Links.TcQuery,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                tc:tcNo.trim(),
                year:year.trim(),
                name:name.trim(),
                lastname:surname.trim()
            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                if(res==="D"){//kimlik bilgileri doğru ise
                    Ajaxs.updateProgres("Kimlik Sorgulama","Yönlendiriliyor...");
                    setTimeout(function(){

                        //Bilgiler kaydedilir
                        AsyncStorage.setItem("tcno", tcNo.trim());
                        AsyncStorage.setItem("year", year.trim());
                        AsyncStorage.setItem("name", name.trim());
                        AsyncStorage.setItem("surname", surname.trim());

                        props.tcNo=tcNo.trim();
                        props.name=name.trim().toUpperCase();
                        props.surname=surname.trim().toUpperCase();

                        Ajaxs.stopProgres();
                        //Forma yönlendirilir
                        props.this_.props.navigator.push({
                            id:"Form"
                        });
                    }, progressTime);
                }else {//Yanlış ise
                    Ajaxs.updateProgres("Kimlik Sorgulama","Kimlik Bilgilerinde Hata Var");
                    setTimeout(function(){
                        Ajaxs.stopProgres()
                    }, progressTime);
                }

            }).catch((err) => {
                Ajaxs.Error(err);
        });
    }

    panelquery(isStartup,username,password){//giriş sorgulama

        Ajaxs.startProgres("Kullanıcı Adı Ve Şifre Kontrol","Lütfen Bekleyin...");

        this_=props.this_;

        fetch(Links.EnterPanel,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                username:username,
                password:password,
            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                let where;

                if(res["id"]!=="H"){//kullanıcı var ise
                    props.userData=res;//kullanıcı bilgileri kaydedilir

                    //kullanıcı adı ve parola kaydedilir
                    AsyncStorage.setItem("username", username.trim());
                    AsyncStorage.setItem("password", password.trim());

                    if(res["meslek"]==="admin"){//kullanıcı admin ise
                        Ajaxs.updateProgres("Kullanıcı Adı Ve Şifre Kontrol","Admin Girişi Yapılıyor...");
                        where="AdminPanel"//admin paneline git
                    }else {//değil ise
                        Ajaxs.updateProgres("Kullanıcı Adı Ve Şifre Kontrol","Usta Girişi Yapılıyor...");
                        where="Panel"//panele git
                    }
                    //Arızalar çekilir
                    this.getMalfunctions(where,this_)

                }else {//yok ise

                    if(isStartup){//eğer otomatik giriş yapılıyorsa
                        //bilgiler silinir
                        AsyncStorage.removeItem("username");
                        AsyncStorage.removeItem("password");

                        props.username="";
                        props.password="";

                        setTimeout(function(){
                            Ajaxs.stopProgres();
                            //Anasayfaya yönlendirilir
                            this_.props.navigator.push({
                                id:"TcQuery"
                            });
                        }, progressTime);

                    }else {
                        Ajaxs.updateProgres("Kullanıcı Adı Ve Şifre Kontrol","Hatalı Şifre Veya Parola");
                        setTimeout(function(){
                            Ajaxs.stopProgres()

                        }, progressTime);
                    }
                }

            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }

    sendform(tcNo,year,name,surname,email,phone,complaint,blok,room,jop){//arza formu gönderir

        Ajaxs.startProgres("Form Gönderiliyor","Lütfen Bekleyin...");

        fetch(Links.SendForm,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                tc:tcNo,
                year:year,
                name:name,
                lastname:surname,
                email:email,
                phone:phone,
                complaint:complaint,
                blok:blok,
                room:room,
                jop:jop
            })
        })
            .then((res)=>res.json())
            .then((res)=>{


                if(res==="E"){//Gönderme başarılı ise
                   
                    Ajaxs.updateProgres("Form Gönderildi","Yönlendiriliyor...");
                    setTimeout(function(){
                        //Anasayfaya yönlendirilir
                        Ajaxs.stopProgres();
                        props.this_.props.navigator.push({
                            id:"TcQuery"
                        });
                    }, progressTime);
                }else {//değil ise
                    //hata verir
                    Ajaxs.updateProgres("Form Gönderilemedi","Hata...");
                    setTimeout(function(){
                        Ajaxs.stopProgres()
                    }, progressTime);
                }

            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }

    getinformations(this_,props){//Bilgileri çeker

        fetch(Links.Information,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                post:"",
            })
        })
            .then((res)=>res.json())
            .then((res)=>{
                informations.setData(res);

                AsyncStorage.getItem('tcno')
                    .then(value => props.tcNo=value);
                AsyncStorage.getItem('year')
                    .then(value => props.year=value);
                AsyncStorage.getItem('name')
                    .then(value => props.name=value);
                AsyncStorage.getItem('surname')
                    .then(value => props.surname=value);

                AsyncStorage.getItem('username')
                    .then(value => props.username=value);
                AsyncStorage.getItem('password')
                    .then(value => props.password=value);

                const this_2 = this;
                setTimeout(function(){

                    if(props.username && props.password){//Eğer kullanıcı adı ve parola var ise
                        //kullanıcı adı ve parola sorgulanır
                        this_2.panelquery(true,props.username,props.password);
                    }else {//yok ise
                        //Anasayfaya yönlendirilir
                        this_.props.navigator.push({
                            id:"TcQuery"
                        });
                    }

                }, progressTime);
            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }

    getMalfunctions(where,this_){//Arızaları çeker

        fetch(Links.GetData,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                jop:props.userData["meslek"],
                lastid:0,
            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                if(res[0]==="false" && res[2]){//Arızalar çekildiyse
                    //dizideki ilk iki kontrol indexi silinir
                    res.splice(0,1);
                    res.splice(0,1);

                    props.malfunctions=res;//arızalar kaydedilir
                }else {//arızalar çekilemediyse
                    //veriler boşaltılır
                    props.malfunctions=[];
                }

                if(where==="Panel")//Eğer panele gidiyorsa
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                        //Panele yönlendirilir
                        this_.props.navigator.push({
                            id:"Panel"
                        });
                    }, progressTime);
                else//Panele gitmiyorsa üyeler çekilir
                    this.getPersons(where,this_);

            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }

    getPersons(where,this_){//Üyeleri çeker

        fetch(Links.GetPerson,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                post:"",
            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                if(res[0]){//Eğer veri var ise

                    props.persons=res;//veriler kaydedilir
                }else {
                    props.persons=[];
                }

                setTimeout(function(){
                    Ajaxs.stopProgres();
                    //Admin paneline yönlendirilir
                    this_.props.navigator.push({
                        id:"AdminPanel"
                    });
                }, progressTime);

            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }

    complate(this_,id,jop,status,i,who){//Arıza tamamlar

        if(status!=="hayir")//Tamamlanacak ise
            Ajaxs.startProgres("Tamamlanıyor","Lütfen Bekleyin...");
        else//geri alınacak ise
            Ajaxs.startProgres("Geri Alınıyor","Lütfen Bekleyin...");

        fetch(Links.Complate,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                changeID:id,
                status:status,
                jop:jop
            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                if(res==="E"){//İşlem başarılı ise
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                        if(who==="admin")//admin ise
                            GetMalfunction.getlist()[i]["complated"]=status;//admin dizisi güncellenir
                        else//admin değil ise panel dizisi güncellenir
                            GetMalfunction_Panel.getlist()[i]["complated"]=status;
                        this_.setState({update:""});//sayfa güncellenir
                    }, progressTime);
                }
                else if(res==="H"){//Başarılı değil ise
                    Ajaxs.updateProgres("Bir Sorun Oluştu","Tekrar Deneyin...");
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                    }, progressTime);
                }
                else{//Zaten tamamlanmış ise
                    Ajaxs.startProgres("Zaten Tamamlanmış","Lütfen Bekleyin...");

                    if(who==="admin")//admin ise
                        GetMalfunction.getlist()[i]["complated"]=res;//admin dizisi güncellenir
                    else//admin değil ise panel dizisi güncellenir
                        GetMalfunction_Panel.getlist()[i]["complated"]=res;
                    this_.setState({update:""});//sayfa güncellenir
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                    }, progressTime);
                }

            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }

    deleteData(this_,id,jop,table,i){//Veri siler
        Ajaxs.startProgres("Siliniyor","Lütfen Bekleyin...");

        fetch(Links.Delete,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                deleteID:id,
                table:table,
                jop:jop
            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                if(res==="E"){//silme başarılı ise
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                        if(table==="Arizalar")//Arıza silindiyse
                            GetMalfunction.getlist().splice(i,1);//arıza listesi güncellenir
                        else if(table==="Uyeler")//Üye silindiyse
                            GetPersons.getlist().splice(i,1);//Üye dizisi güncellenir

                        this_.setState({update:""});//Ekran güncellenir
                    }, progressTime);
                }else {//silinemediyse
                    //hata verir
                    Ajaxs.updateProgres("Bir Sorun Oluştu","Tekrar Deneyin...");
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                    }, progressTime);
                }

            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }


    addPerson(this_,password,username,name,surname,email,jop,phone){//Üye ekleme
        Ajaxs.startProgres("Üye Ekleniyor","Lütfen Bekleyin...");

        fetch(Links.AddPerson,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                password:password,
                username:username,
                name:name,
                lastname:surname,
                email:email,
                jop:jop,
                tel:phone
            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                if(res==="E"){//eklendiyse
                    setTimeout(function(){
                        GetPersons.update();//üyeler güncellenir
                        Ajaxs.stopProgres();
                        AddPerson.reset(this_)//inputlar boşaltılır
                    }, progressTime);

                }else if(res==="Z"){//zaten var ise
                    //Uyarı verilir
                    Ajaxs.updateProgres("Bu E-Posta veya KullanıcıAdı zaten kullanılmakta","Tekrar Deneyin...");
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                    }, progressTime);
                }else{//üye eklenemediyse
                    //hata verir
                    Ajaxs.updateProgres("Bir Sorun Oluştu","Tekrar Deneyin...");
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                    }, progressTime);
                }

            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }

    changePassword(this_,password_change,password_new,who){//parola değiştirir
        Ajaxs.startProgres("Güncelleniyor","Lütfen Bekleyin...");

        fetch(Links.Password,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                id:props.userData["id"],
                password:password_change,
                password_new:password_new

            })
        })
            .then((res)=>res.json())
            .then((res)=>{

                if(res==="E"){//değiştirildiyse
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                        if(who==="admin")//admin ise
                            ChangePassword.reset(this_);//admindeki inputlar boşaltılır
                        else//admin değilse
                            ChangePassword_Panel.reset(this_);//paneldeki inputlar boşaltılır
                    }, progressTime);

                }else if(res==="C_H"){//parola yanış ise
                    //uyarı verir
                    Ajaxs.updateProgres("Parola Hatalı","Tekrar Deneyin...");
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                    }, progressTime);
                }else{//değiştirilemediyse
                    //hata verir
                    Ajaxs.updateProgres("Bir Sorun Oluştu","Tekrar Deneyin...");
                    setTimeout(function(){
                        Ajaxs.stopProgres();
                    }, progressTime);
                }


            }).catch((err) => {
            Ajaxs.Error(err);
        });
    }
}

