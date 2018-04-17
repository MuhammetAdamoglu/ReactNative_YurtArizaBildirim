

import React, { Component } from 'react';



import {
    View,
    Text,
    ScrollView

} from 'react-native';


import Button from 'react-native-button';

import style from '../../css/style'
import {ajax} from '../Start'

import {serializeKey} from "../../scripts/serializeKey";
import Links from "../../scripts/Links";

let list;

type Props = {};
export default class getMalfunctions extends Component<Props> {


    constructor(){
        super();

        //Çekilen arızalar list dizisine kaydedilir
        list=props.malfunctions;
        list.reverse();//dizi ters çevrilir

        //dizi boş değil ise
        if(Object.values(list).length>0)
            id=list[0]["id"];//en büyük id
        else
            id=0;

        //Güncel veri sorgusu için arızalardaki son id method'a gönderilir
        this.controlMalfunctions(this,id);

    }

    update(){
        //stateyi çalıştırarak sayfanın yenilenmesini sağlar
        this.setState({update:""});
    }

    static getlist(){
        //diziyi döndürür
        return list
    }

    isComplatedForText(val){
        //Arızanin tamamlanmışlığına göre text seçilir
        if(val==="hayir")//tamamlanmamış ise
            return "Tamamlanmadı";
        else
            return val+" Tamamladı";
    }

    isComplatedForButton(val){
        //Arızanin tamamlanmışlığına göre button seçilir
        if(val==="hayir")//tamamlanmış ise
            return "Tamamla";
        else
            return "Geri Al";
    }

    isComplatedForBacground(val){
        //Arızanin tamamlanmışlığına göre card rengi seçilir
        if(val==="hayir")//tamamlanmış ise
            return "#FFFFFF";
        else
            return "#50606060";
    }

    Complate(i){
        //gelen index numarasındaki arızayı tamamlar

        let status = "";
        if(list[i]["complated"]==="hayir")//tamamlanmamış ise
            status="admin";
        else
            status="hayir";

        //verileri ajaxa gönderir
        ajax.complate(this,list[i]["id"],list[i]["malfunctions"],status,i,"admin");

    }

    Delete(i,table){
        //gerekli veriler ajaxa gönderilip veri siliniyor
        ajax.deleteData(this,list[i]["id"],list[i]["malfunctions"],table,i);
    }



    malfunctionItem(data,i){
        //Card ları tasarlar
        return(
            <View key={list[i]["id"]} style={style.malfunctionsCardView}>
                <View style={{flex:1,backgroundColor:this.isComplatedForBacground(list[i]["complated"])}}>
                    <Text style={{fontSize:22, fontWeight:"bold", color:"#607D8B", marginLeft:20, marginTop:12}}>{list[i]["name"]}</Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:"#607D8B", marginLeft:22, marginTop:12}}>{list[i]["tcNo"]}</Text>
                    <Text style={{fontSize:16, fontWeight:"normal", color:"#607D8B", marginLeft:22, marginTop:12}}>{list[i]["tel"]}</Text>
                    <Text style={{fontSize:16, fontWeight:"normal", color:"#607D8B", marginLeft:22, marginTop:12}}>{list[i]["email"]}</Text>
                    <Text style={{fontSize:17, fontWeight:"bold", color:"#607D8B", marginLeft:22, marginTop:12}}>{list[i]["location"]}</Text>
                    <View style={{borderBottomColor: '#10202020', borderBottomWidth: 1, marginTop:10}}/>
                    <Text style={{fontSize:16, fontWeight:"normal", color:"#607D8B", marginLeft:22, marginTop:15}}>{list[i]["complaint"]}</Text>
                    <View style={{flex:1,justifyContent: 'flex-end'}}>
                        <Text style={{fontSize:16, fontWeight:"normal", color:"#607D8B", marginLeft:22, marginTop:15}}>{this.isComplatedForText(list[i]["complated"])}</Text>
                        <View style={{borderBottomColor: '#10202020', borderBottomWidth: 1, marginBottom:18,marginTop:15}}/>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:17, fontWeight:"normal", color:"black",marginLeft:22,marginBottom:18}}>{list[i]["malfunctions"]}</Text>
                            <Button onPress={this.Complate.bind(this,i)} style={{fontSize:17, fontWeight:"normal", color:"#1E88E5",marginLeft:26,marginBottom:18}}>{this.isComplatedForButton(list[i]["complated"])}</Button>
                            <Button onPress={this.Delete.bind(this,i,"Arizalar")} style={{fontSize:17, fontWeight:"normal", color:"red",marginLeft:26,marginBottom:18}}>SİL</Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    render() {

        return (
            <ScrollView>
                {list.map((data,i)=> this.malfunctionItem(data,i))}
            </ScrollView>
        );
    }

    controlMalfunctions(this_,lastid){
        //Her 5 saniyede sunucuyu kontrol eder
        //Eğer Şuanki en büyük id den daha büyük id var ise veriyi çeker
        fetch(Links.GetData,{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:serializeKey({
                jop:"admin",
                lastid:lastid,
                bildiri:props.userData["bildiri"],
                id:props.userData["id"]
            })
        })
            .then((res)=>res.json())
            .then((res)=>{


                if(res==="EMPTY"){//Eğer hiç veri yok ise
                    //dizi boşaltılıp ekran güncellenir
                    list=[];
                    this.update();

                    //5 sn sonra tekrar kontrol edilir
                    setTimeout(function(){
                        this_.controlMalfunctions(this_,0)
                    }, 5000);
                }
                else if(res[0]==="false" && res[2]){//Eger veri var ise
                    //ilk iki kontrol verisi siliniyor
                    res.splice(0,1);
                    res.splice(0,1);

                    //diziyi ters çevirip yeni diziyle birleştirip tekrar ters çevriliyor. Böylece yeni veriler en üstte gelmiş olur
                    list.reverse();
                    list=list.concat(res);
                    list.reverse();

                    this.update();//Ekran güncelleniyor

                    //5 saniye sonra bu metod tekrar çağrılıyor, ancak budefa last id olarak gelen dizideki son id gönderiliyor.
                    setTimeout(function(){
                        this_.controlMalfunctions(this_,res[Object.values(res).length-1]["id"])
                    }, 5000);

                }else if(res[0]==="true"){//eğer bildiri varsa

                    props.userData["bildiri"]=res[1];//kullanıcı bildirisi gelen bildiri ile güncelleniyor
                    list=[];//Dizi boşaltılıyor
                    this_.controlMalfunctions(this_,0)//Veriler tekrar çekiliyor

                }else {//Eğer hiç birşey yoksa
                    //5 saniye sonra bu metod tekrar çağrılıyor
                    setTimeout(function(){
                        this_.controlMalfunctions(this_,lastid)
                    }, 5000);
                }

            }).catch((err) => {
                //Bi hata var ise kontrol sona ermiyor ve tekrar deneniyor
            setTimeout(function(){
                this_.controlMalfunctions(this_,lastid)
            }, 5000);
        });
    }
}



