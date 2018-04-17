import React,{Component} from 'react'
import {ScrollView, View} from "react-native";
import Input from "../../components/input";
import Button from "react-native-button";
import informations from "../../scripts/informations";
import CustomPicker from "../../components/picker";
import style from "../../css/style";
import {ajax} from '../../activitys/Start'



export default class AddPerson extends Component{


    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            password_again:"",
            name:"",
            surname:"",
            email:"",
            phone:"",
            jop:""

        }
    }

    static reset(this_){
        //İnputları boşaltır
        this_.setState({
            username:"",
            password:"",
            password_again:"",
            name:"",
            surname:"",
            email:"",
            phone:"",
            jop:""})
    }

    addPerson(){
        //Eğer inputlarda sorun yok ise
        if(props.errUsername_add && props.errPassword_add && props.errPasswordAgain_add && props.errName_add && props.errSurname_add && props.errEmail_add && props.errPhone_add && props.errJop){
            ajax.addPerson(this,this.state.password,this.state.username,this.state.name,this.state.surname,this.state.email,this.state.jop,this.state.phone);
        }

    }

    render(){

        return(

            <ScrollView style={{flex:1}}
                        keyboardShouldPersistTaps='always'
                        enableAutoAutomaticScroll={false}>
                <Input
                    maxLength={30}
                    minLength={3}
                    label='Kullanıcı Adı'
                    value={this.state.username}
                    onChangeText={(data)=>{[this.setState({username:data}),props.errUsername_add=props.InputError]}}
                />

                <Input
                    maxLength={30}
                    minLength={5}
                    label='Şifre'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(data)=>{[this.setState({password:data}),props.password_c=data,props.errPassword_add=props.InputError]}}
                />

                <Input
                    maxLength={30}
                    minLength={5}
                    label='Şifre Tekrar'
                    secureTextEntry={true}
                    value={this.state.password_again}
                    onChangeText={(data)=>{[this.setState({password_again:data}),props.errPasswordAgain_add=props.InputError]}}
                    textType={"re_password"}
                />

                <Input
                    maxLength={30}
                    minLength={2}
                    label='İsim'
                    value={this.state.name}
                    onChangeText={(data)=>{[this.setState({name:data}),props.errName_add=props.InputError]}}
                />

                <Input
                    maxLength={30}
                    minLength={2}
                    label='Soyisim'
                    value={this.state.surname}
                    onChangeText={(data)=>{[this.setState({surname:data}),props.errSurname_add=props.InputError]}}
                />

                <Input
                    maxLength={40}
                    minLength={2}
                    keyboardType='email-address'
                    label='E-mail'
                    textType={"email"}
                    value={this.state.email}
                    onChangeText={(data)=>{[this.setState({email:data}),props.errEmail_add=props.InputError]}}
                />

                <Input
                    maxLength={10}
                    minLength={10}
                    keyboardType='phone-pad'
                    label='Telefon(5XXXXXXXXX)'
                    textType={"phone"}
                    value={this.state.phone}
                    onChangeText={(data)=>{[this.setState({phone:data}),props.errPhone_add=props.InputError]}}
                />


                <CustomPicker
                    selectedValue={this.state.jop}
                    label={'Meslek Seçiniz'}
                    options={informations.getJop()}
                    marginLeft={30}
                    marginRight={30}
                    flex={1}
                    onValueChange={(itemValue) => [this.setState({jop: itemValue}),props.errJop=true]}/>

                <View style={{flex:0.6,alignItems:'flex-end',marginBottom:10}}>
                    <Button style={[style.button,{fontSize:18}]} onPress={this.addPerson.bind(this)} >Üye Ekle</Button>
                </View>
            </ScrollView>

        )
    }

}
