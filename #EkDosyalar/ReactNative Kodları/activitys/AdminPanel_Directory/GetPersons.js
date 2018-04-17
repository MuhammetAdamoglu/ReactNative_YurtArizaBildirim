

import React, { Component } from 'react';



import {
    View,
    Text,
    ScrollView

} from 'react-native';


import style from '../../css/style'
import {ajax} from '../Start'

import {serializeKey} from "../../scripts/serializeKey";
import Links from "../../scripts/Links";


let list=[];

type Props = {};
export default class GetPersons extends Component<Props> {


    constructor(){
        super();

        //Çekilen arızalar list dizisine kaydedilir
        list=props.persons;
        list.reverse();//dizi ters çevrilir

    }

    static update(){
        //Tüm üyeler yeniden çekilir
        this.getPersons()
    }

    static getlist(){
        //diziyi döndürür
        return list
    }

    Delete(i,table){
        //gerekli veriler ajaxa gönderilip veri siliniyor
        ajax.deleteData(this,list[i]["id"],list[i]["malfunctions"],table,i);
    }

    personItem(data,i){
        //Cartların tasarımı
        return(
            <View key={list[i]["id"]} style={style.personsCardView}>
                <View style={{flex:1,backgroundColor:"white"}}>
                    <Text style={{fontSize:22, fontWeight:"bold", color:"#607D8B", marginLeft:20, marginTop:12}}>{list[i]["username"]}</Text>
                    <Text style={{fontSize:16, fontWeight:"bold", color:"#607D8B", marginLeft:22, marginTop:12}}>{list[i]["name"]+" "+list[i]["surname"]}</Text>
                    <Text style={{fontSize:16, fontWeight:"normal", color:"#607D8B", marginLeft:22, marginTop:12}}>{list[i]["email"]}</Text>
                    <Text style={{fontSize:16, fontWeight:"normal", color:"#607D8B", marginLeft:22, marginTop:12}}>{list[i]["telefon"]}</Text>
                    <View style={{borderBottomColor: '#10202020', borderBottomWidth: 1, marginTop:10}}/>

                    <View style={{flex:1,justifyContent: 'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:17, fontWeight:"bold", color:"#607D8B", marginLeft:22, marginBottom:10}}>{list[i]["jop"]}</Text>
                            <Text onPress={this.Delete.bind(this,i,"Uyeler")}  style={{fontSize:17, fontWeight:"normal", color:"red",marginLeft:22,marginBottom:10}}>SİL</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    {list.map((data,i)=> this.personItem(data,i))}
                </ScrollView>
            </View>
        );
    }


    static getPersons(){
        // üyeleri sunucudan çeker

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

                if(res[0]){//eger dizinin 0. indexinde veri var ise
                    //dizi kaydedilir ve ters çevrilir. Böylece yeni veriler en üstte olur
                    props.persons=res;
                    list=res;
                    list.reverse();

                }else {//yok ise
                    //dizi boşaltılır ve kaydedilir
                    list=[];
                    props.persons=[];
                }


            }).catch((err) => {

        });
    }

}



