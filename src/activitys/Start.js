
import React, { Component } from 'react';


import NavigationExperimental from 'react-native-deprecated-custom-components';


import Informations from "./informations";
import Ajaxs from "../scripts/Ajaxs";
import TcQuery from "./TcQuery";
import Form from "./Form";
import AdminPanel from "./AdminPanel_Directory/AdminPanel";
import Panel from "./Panel_Directory/Panel";
import {View} from "react-native";
import {ProgresDialog} from "../components/progresDialog";
import AddPerson from "./AdminPanel_Directory/AddPerson";

let ajax;
export {ajax};

type Props = {};
export default class Start extends Component<Props> {

    constructor(props){
        super(props);
        ajax = new Ajaxs(this);


        this.state={
            progressVisible:false,
            progressTitle:"",
            progressMessage:""
        };

    }

    static renderScene (route, navigator) {
        //Navigatör için sayfalar belirleniyor

        const routeId = route.id;

        if (routeId === 'Informations') {
            return (
                <Informations
                    navigator={navigator}
                />
            );
        }

        if (routeId === 'TcQuery') {
            return (
                <TcQuery
                    navigator={navigator}
                />
            );
        }

        if (routeId === 'Form') {
            return (
                <Form
                    navigator={navigator}
                />
            );
        }

        if (routeId === 'AdminPanel') {
            return (
                <AdminPanel
                    navigator={navigator}
                />
            );
        }


        if (routeId === 'AddPerson') {
            return (
                <AddPerson
                    navigator={navigator}
                />
            );
        }

        if (routeId === 'Panel') {
            return (
                <Panel
                    navigator={navigator}
                />
            );
        }

    }


    render() {

        return (

            <View style={{flex:1}}>
                <NavigationExperimental.Navigator
                    style={{flex:1}}
                    initialRoute={{
                        id: 'Informations'
                    }}
                    renderScene={
                        Start.renderScene.bind(this)
                    }
                    configureScene={ (route, routeStack) => { return NavigationExperimental.Navigator.SceneConfigs.FadeAndroid; } }

                />
                <ProgresDialog/>
            </View>


        );
    }
};
