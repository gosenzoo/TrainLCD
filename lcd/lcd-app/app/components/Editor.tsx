"use client"

import React, { useState } from 'react'
import EditorHead from "./EditorHead"
import StationList from "./StationList"
import LineList from "./LineList"
import IconList from './IconList'
import "../type"

const Editor = () => {
    const [setting, setSetting] = useState<settingType>({
        stationList: [],
        lineDict: {},
        iconDict: {}
    })

    return(
        <div>
            <EditorHead setting={setting} setSetting={setSetting}/>
            <br></br>
            <StationList setting={setting} setSetting={setSetting}/>
            <br></br>
            <LineList setting={setting} setSetting={setSetting}/>
            <br></br>
            <IconList setting={setting} setSetting={setSetting}/>
        </div>
    )
}

export default Editor