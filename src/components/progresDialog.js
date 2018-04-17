

import { ProgressDialog } from 'react-native-simple-dialogs';

import React from 'react';

const ProgresDialog=()=>{

    return (

        <ProgressDialog
            visible={props.state.progressVisible}
            title={props.state.progressTitle}
            message={props.state.progressMessage}
        />

    );
};


export {ProgresDialog};
